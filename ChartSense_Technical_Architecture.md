# ChartSense Technical Architecture

## System Architecture Diagram

```mermaid
graph TB
    subgraph "Data Layer"
        A1[Market Data APIs<br/>Alpha Vantage/Polygon/EODHD]
        A2[Data Ingestion Service]
        A3[OHLCV Data Store<br/>Time-Series DB]
    end
    
    subgraph "Feature Engineering Layer"
        B1[Feature Builder Engine]
        B2[Technical Indicators<br/>VWAP, EMA, RSI]
        B3[Structure Detector<br/>HH/HL, LH/LL]
        B4[Volume Analyzer]
        B5[Time-of-Day Classifier]
    end
    
    subgraph "AI Reasoning Layer"
        C1{Input Mode Router}
        C2[Narrative Generator]
        C3[Chart Image Generator<br/>Optional]
        C4[LLM API Gateway<br/>Claude/GPT/Gemini]
        C5[Prompt Manager]
        C6[Response Parser]
    end
    
    subgraph "Decision Engine Layer"
        D1[Scoring Aggregator]
        D2[Bias Decision Logic<br/>Deterministic]
        D3[Confidence Calculator]
        D4[Zone Generator<br/>Entry/Target/Stop]
    end
    
    subgraph "User Interface Layer"
        E1[Web Dashboard]
        E2[Chart Display]
        E3[Bias Output Panel]
        E4[Feedback Widget]
        E5[Trade Logger]
    end
    
    subgraph "Storage & Analytics"
        F1[Analysis History DB<br/>PostgreSQL]
        F2[User Feedback DB]
        F3[Analytics Engine]
        F4[Bias Audit System]
    end
    
    subgraph "Cost Management"
        G1[Rate Limiter]
        G2[Response Cache<br/>5-min TTL]
        G3[Model Router<br/>Cost Optimization]
    end

    A1 -->|Real-time OHLCV| A2
    A2 -->|Store| A3
    A3 -->|Query| B1
    
    B1 --> B2
    B1 --> B3
    B1 --> B4
    B1 --> B5
    
    B2 -->|Features| C1
    B3 -->|Features| C1
    B4 -->|Features| C1
    B5 -->|Features| C1
    
    C1 -->|Mode A| C2
    C1 -->|Mode B| C3
    C2 -->|Narrative| C5
    C3 -->|Image| C5
    
    C5 -->|Prompt| G1
    G1 -->|Check Cache| G2
    G2 -->|Cache Miss| G3
    G3 -->|Route to Model| C4
    C4 -->|LLM Response| C6
    
    C6 -->|Scores| D1
    D1 -->|Aggregate| D2
    D2 -->|Bias| D3
    D3 -->|Confidence| D4
    D4 -->|Output| E3
    
    E1 --> E2
    E1 --> E3
    E1 --> E4
    E1 --> E5
    
    E3 -->|Log| F1
    E4 -->|Feedback| F2
    F1 --> F3
    F2 --> F4
    
    F3 -.->|Insights| E1
    F4 -.->|Bias Metrics| C5

    style A1 fill:#e1f5ff
    style B1 fill:#fff4e1
    style C4 fill:#ffe1f5
    style D2 fill:#e1ffe1
    style E1 fill:#f5e1ff
    style F1 fill:#ffe1e1
```

---

## Component Deep Dive

### 1. Data Layer

**Purpose:** Acquire and store market data

#### Components:

**Market Data APIs**
- Primary: EODHD.com or Alpha Vantage
- Latency target: <10 seconds
- Data format: OHLCV per 5-min intervals

**Data Ingestion Service**
- Technology: Python with `requests` or `aiohttp`
- Schedule: Real-time WebSocket (Polygon) or REST polling every 5 min
- Error handling: Retry logic, fallback providers

**OHLCV Data Store**
- Technology: **InfluxDB** (time-series) or **TimescaleDB** (PostgreSQL extension)
- Retention: 90 days live, 2 years archived
- Indexing: By symbol, timeframe, timestamp

---

### 2. Feature Engineering Layer

**Purpose:** Transform raw data into trading insights

#### Feature Builder Engine
```python
class FeatureBuilder:
    def build(self, ohlcv_data):
        return {
            'trend': self.detect_trend(),
            'structure': self.detect_structure(),
            'volume': self.analyze_volume(),
            'vwap_relation': self.calc_vwap_relation(),
            'time_context': self.classify_time()
        }
```

**Key Algorithms:**
- **Trend Detection:** EMA crossovers, slope analysis
- **Structure Detection:** Swing high/low tracking, fractal patterns
- **Volume Analysis:** Volume ratio vs. 20-period average
- **VWAP Calculation:** Cumulative (Price × Volume) / Cumulative Volume

---

### 3. AI Reasoning Layer

**Purpose:** LLM-based contextual analysis

#### Prompt Template Example

```
You are an expert day trader analyzing a 5-minute chart.

MARKET CONTEXT:
- Symbol: {REDACTED}  # Prevents symbol bias
- Timeframe: 5-minute
- Session: {session_type}

TECHNICAL FEATURES:
{feature_narrative}

TASK:
Score the following factors from -2 to +2:
1. Trend (directional strength)
2. Structure (clean vs choppy)
3. Volume (confirming vs divergent)
4. Control (VWAP acceptance)
5. Momentum (expanding vs exhausting)
6. Time_Risk (session quality)

CRITICAL:
- Do NOT predict prices
- Do NOT recommend trades
- ONLY provide numerical scores
- Include brief reasoning (1 sentence per factor)

FORMAT:
{
  "Trend_Score": <int>,
  "Structure_Score": <int>,
  ...
  "Reasoning": {
    "Trend": "<explanation>",
    ...
  }
}
```

#### LLM API Gateway
- **Primary:** Anthropic Claude 4.5 Sonnet
- **Fallback:** Google Gemini 2.0 Flash
- **Vision (Optional):** OpenAI GPT-4o
- **Timeout:** 20 seconds max
- **Retries:** 2 attempts with exponential backoff

---

### 4. Decision Engine Layer

**Purpose:** Deterministic bias calculation

#### Bias Decision Logic

```python
def calculate_bias(scores: dict) -> dict:
    total = sum(scores.values())
    
    if total >= 3:
        bias = "BUY"
    elif total <= -3:
        bias = "SELL"
    else:
        bias = "NO TRADE"
    
    # Confidence based on score alignment
    aligned_factors = sum(1 for s in scores.values() if abs(s) >= 1)
    
    if aligned_factors >= 4:
        confidence = "HIGH"
    elif aligned_factors >= 2:
        confidence = "MEDIUM"
    else:
        confidence = "LOW"
    
    return {
        "bias": bias,
        "confidence": confidence,
        "total_score": total,
        "aligned_factors": aligned_factors
    }
```

#### Zone Generator
- **Entry Zone:** Price ± 0.3% ATR buffer around key level
- **Target Zone:** Next resistance/support ± 0.5% ATR
- **Invalidation:** Recent swing low (BUY) or high (SELL)

---

### 5. User Interface Layer

**Technology Stack:**
- **Frontend:** React + TailwindCSS
- **Charting:** TradingView Lightweight Charts
- **State Management:** React Context or Zustand
- **API Client:** Axios with interceptors

**Key Features:**
1. **Live Chart Display** with VWAP overlay
2. **Bias Panel** showing color-coded output (green/red/gray)
3. **Score Breakdown** visual (bar chart)
4. **Feedback Widget** (thumbs up/down)
5. **Trade Journal** table

---

### 6. Storage & Analytics

#### Databases

**Analysis History (PostgreSQL)**
```sql
CREATE TABLE analyses (
    id UUID PRIMARY KEY,
    timestamp TIMESTAMP,
    symbol VARCHAR(10),
    timeframe VARCHAR(5),
    features JSONB,
    llm_scores JSONB,
    bias VARCHAR(10),
    confidence VARCHAR(10),
    entry_zone NUMRANGE,
    target_zone NUMRANGE,
    invalidation_price DECIMAL
);
```

**User Feedback (PostgreSQL)**
```sql
CREATE TABLE feedback (
    id UUID PRIMARY KEY,
    analysis_id UUID REFERENCES analyses(id),
    user_id UUID,
    helpful BOOLEAN,
    took_trade BOOLEAN,
    outcome VARCHAR(20), -- WIN/LOSS/BREAKEVEN/DIDNT_ENTER
    comments TEXT,
    timestamp TIMESTAMP
);
```

#### Analytics Engine

**Weekly Reports:**
- Bias distribution (BUY/SELL/NO TRADE %)
- Win rate by bias type
- Average score by factor
- Sector preference detection (bias audit)

---

### 7. Cost Management Layer

#### Rate Limiter
- **Free Tier:** 10 analyses/day per user
- **Paid Tier:** 100 analyses/day per user
- Implementation: Redis with sliding window

#### Response Cache
- **Key:** `hash(features + model_version)`
- **TTL:** 5 minutes
- **Hit Ratio Target:** 40%+
- Technology: Redis

#### Model Router
```python
def select_model(user_tier, cache_miss):
    if user_tier == "FREE":
        return "gemini-2.0-flash"  # Cheapest
    elif user_tier == "BASIC":
        return "gpt-4o-mini"
    else:  # PREMIUM
        return "claude-4.5-sonnet"
```

---

## Data Flow Sequence

### Typical Analysis Request

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant API as Backend API
    participant FB as Feature Builder
    participant Cache as Redis Cache
    participant LLM as LLM Gateway
    participant DE as Decision Engine
    participant DB as PostgreSQL

    U->>FE: Request analysis for AAPL 5-min
    FE->>API: POST /api/analyze {symbol, timeframe}
    
    API->>FB: Get features(AAPL, 5-min)
    FB->>FB: Calculate indicators
    FB-->>API: Return feature_dict
    
    API->>Cache: Check cache(hash(features))
    alt Cache Hit
        Cache-->>API: Return cached scores
    else Cache Miss
        API->>LLM: Send prompt(features)
        LLM->>LLM: Generate scores
        LLM-->>API: Return LLM scores
        API->>Cache: Store scores (5 min TTL)
    end
    
    API->>DE: Calculate bias(scores)
    DE->>DE: Apply decision logic
    DE->>DE: Generate zones
    DE-->>API: Return bias + zones
    
    API->>DB: Log analysis
    API-->>FE: Return analysis result
    FE-->>U: Display bias + zones
    
    U->>FE: Submit feedback (👍)
    FE->>API: POST /api/feedback
    API->>DB: Store feedback
```

---

## Technology Stack Summary

### Backend
- **Language:** Python 3.11+
- **Framework:** FastAPI
- **Task Queue:** Celery + Redis (for async data fetching)
- **ORM:** SQLAlchemy

### Frontend
- **Framework:** React 18
- **UI Library:** TailwindCSS + shadcn/ui
- **Charts:** TradingView Lightweight Charts
- **Build Tool:** Vite

### Infrastructure
- **Hosting:** AWS or Google Cloud
- **Compute:** Docker containers on ECS/Cloud Run
- **Databases:** 
  - TimescaleDB (time-series)
  - PostgreSQL (relational)
  - Redis (cache + rate limiting)
- **Monitoring:** Datadog or Grafana + Prometheus

### APIs
- **Market Data:** Alpha Vantage (dev) → EODHD (prod)
- **LLM:** Anthropic Claude API (primary)
- **Authentication:** Auth0 or Firebase Auth

---

## Security Considerations

1. **API Key Management:** Store in environment variables, never in code
2. **User Data:** Encrypt PII at rest, HTTPS in transit
3. **Rate Limiting:** Per-user token bucket algorithm
4. **Input Validation:** Sanitize all symbol inputs to prevent injection
5. **LLM Output Validation:** Parse and validate JSON schema before processing

---

## Scalability Plan

### Current Design (MVP)
- **Capacity:** 1,000 concurrent users
- **Latency:** <3 seconds per analysis
- **Cost:** ~$2,000/month (LLM + infrastructure)

### Scale to 10,000 users
- **LLM Caching:** Increase hit ratio to 60% (saves $1,200/month)
- **Read Replicas:** For PostgreSQL
- **CDN:** For static frontend assets
- **Background Jobs:** Move heavy feature computation to queues
- **Auto-scaling:** Horizontal scaling for API servers

---

## Deployment Architecture

```mermaid
graph LR
    Internet[Internet Users]
    CDN[CloudFlare CDN]
    LB[Load Balancer]
    API1[API Server 1]
    API2[API Server 2]
    Worker[Celery Workers]
    
    Redis[(Redis Cache)]
    Postgres[(PostgreSQL)]
    Timescale[(TimescaleDB)]
    
    Internet --> CDN
    CDN --> LB
    LB --> API1
    LB --> API2
    
    API1 --> Redis
    API2 --> Redis
    API1 --> Postgres
    API2 --> Postgres
    API1 -.->|Queue Jobs| Worker
    Worker --> Timescale
    
    style Internet fill:#e1f5ff
    style Redis fill:#ffe1e1
    style Postgres fill:#e1ffe1
    style Timescale fill:#fff4e1
```

---

## Error Handling & Resilience

### LLM API Failures
1. **Retry Logic:** 2 retries with exponential backoff (1s, 3s)
2. **Fallback Model:** Switch to Gemini Flash if Claude fails
3. **Circuit Breaker:** Pause after 5 consecutive failures
4. **User Notification:** "Analysis temporarily unavailable, try again in 1 min"

### Data Provider Failures
1. **Multi-Provider Setup:** Alpha Vantage primary, Polygon backup
2. **Stale Data Handling:** Show warning if data >10 min old
3. **Graceful Degradation:** Use cached features if fresh data unavailable

---

## Monitoring & Alerts

### Key Metrics
- **API Latency:** P50, P95, P99
- **LLM Response Time:** Average per model
- **Cache Hit Ratio:** Target >50%
- **Error Rate:** <1% of requests
- **Cost per Analysis:** Daily tracking

### Alerts
- LLM API error rate >5% (15 min window) → PagerDuty
- PostgreSQL connection pool >80% → Email
- Daily LLM cost >$200 → Slack notification

---

## Appendix: Example API Endpoints

```
POST   /api/v1/analyze
GET    /api/v1/history
POST   /api/v1/feedback
GET    /api/v1/analytics/weekly
GET    /api/v1/user/usage
```

**Example Request:**
```json
POST /api/v1/analyze
{
  "symbol": "SPY",
  "timeframe": "5min"
}
```

**Example Response:**
```json
{
  "analysis_id": "uuid-here",
  "timestamp": "2025-12-19T13:45:00Z",
  "bias": "BUY",
  "confidence": "MEDIUM",
  "scores": {
    "trend": 2,
    "structure": 1,
    "volume": 0,
    "control": 1,
    "momentum": -1,
    "time_risk": 0
  },
  "zones": {
    "entry": [580.50, 581.00],
    "target": [583.00, 584.00],
    "invalidation": 579.20
  },
  "risk_notes": [
    "Volume not confirming — wait for expansion",
    "Mid-session, reduced edge"
  ]
}
```
