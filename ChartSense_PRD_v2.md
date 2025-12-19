# 📄 PRODUCT REQUIREMENTS DOCUMENT (PRD)

## Product Name (Working)

**ChartSense**  
*(Human-Style Market Reasoning Engine)*

**Version:** 2.0  
**Last Updated:** December 19, 2025  
**Status:** Enhanced & Ready for Development

---

## 1. PRODUCT VISION

ChartSense is a **probabilistic market reasoning system** that analyzes price charts the way experienced human traders do.

It does **NOT**:
- Predict prices
- Guarantee profits
- Blindly trade

Instead, it answers one core question:

> **"Given the current chart context, what is the highest-probability bias a disciplined trader would adopt — or should they stay out?"**

The system is instrument-agnostic and works for:
- **Equity traders**
- **Futures traders**
- **Options traders** (CALL / PUT bias)
- **Crypto traders**
- **Intraday & short-term swing traders**

---

## 2. TARGET USERS

### Primary Users
- **Beginner traders** (need structure, safety, discipline)
- **Intermediate traders** (need confirmation, context)
- **Systematic discretionary traders**

### Secondary Users
- Trading educators
- Prop-desk trainees
- Retail traders transitioning to rule-based systems

---

## 3. NON-GOALS (IMPORTANT)

The system will **NOT**:
- Predict future prices or exact levels
- Promise profitability
- Perform high-frequency trading (HFT)
- Trade autonomously without guardrails
- Replace risk management
- Execute 1-minute scalping strategies

---

## 4. CORE DESIGN PHILOSOPHY

### Key Principle

> **The LLM is the Judge, not the Witness.**

- **Math & indicators** witness the data
- **The LLM** judges context, quality, and risk
- **Deterministic code** makes final decisions

**This is ChartSense's unique differentiator** — LLM judges, but code decides. Most competitors let the LLM make final trading decisions; we add a deterministic safety layer.

---

## 5. HIGH-LEVEL SYSTEM ARCHITECTURE

```
Market Data (OHLCV)
        ↓
Feature Builder (Deterministic)
        ↓
Narrative Facts OR Chart Image
        ↓
LLM Reasoning Engine (Scoring only)
        ↓
Deterministic Scoring Engine
        ↓
Bias Output (BUY / SELL / NO TRADE)
        ↓
Entry & Invalidation Zones
        ↓
Paper Trade / Assisted Live Use
        ↓
Logging & Review
```

---

## 6. DATA INPUT STRATEGY (UPDATED & CORRECTED)

### ❌ Disallowed Input
- Raw OHLCV arrays sent directly to LLM
- Numeric JSON candle dumps

### ✅ Allowed Inputs (Two Modes)

#### Mode A: Feature-Narrative Input (Primary)
The **Feature Builder** converts charts into human-readable facts.

**Example:**

```
Price is above VWAP by 0.7%
VWAP slope is positive
Higher High (HH) formed at 10:45
Last pullback held above prior low
Volume expanded on impulse, contracted on pullback
Nearest resistance at 19880
Time of day: Mid-session
```

#### Mode B: Vision Input (Optional / Advanced)
- Chart screenshot passed to Vision-capable LLM
- Used for:
  - Pattern recognition
  - Structure validation
  - Wick / overlap detection

**Acceptance Criteria for Vision Mode:**
- Correctly identifies double-tops/bottoms in 80%+ of test cases
- Detects trendlines with 75%+ accuracy
- Identifies key support/resistance zones

---

## 7. FEATURE BUILDER (CRITICAL MODULE)

### Responsibilities
- Compute indicators & structure
- Detect trend / range
- Identify key levels
- Quantify volatility
- Detect volume behavior

### Example Features
- Trend direction & slope
- **HH/HL** (Higher High/Higher Low) or **LH/LL** (Lower High/Lower Low) detection
- **VWAP** (Volume Weighted Average Price) relationship
- Range compression / expansion
- Momentum exhaustion
- Time-of-day classification

📌 **This layer is deterministic and testable.**

---

## 8. LLM REASONING ENGINE

### Role
- Acts as a human discretionary trader
- Scores market conditions
- Highlights risk & uncertainty
- **NEVER executes trades**

### Output Restrictions
- No price prediction
- No guarantees
- No position sizing
- No final bias decision

---

## 9. SCORING FRAMEWORK (MANDATORY)

Each factor scored independently (**-2 to +2**)

| Factor | Description |
|--------|-------------|
| **Trend** | Directional strength |
| **Structure** | Clean vs overlapping |
| **Volume** | Confirmation vs divergence |
| **Control (VWAP / Value)** | Acceptance or rejection |
| **Momentum** | Expansion vs exhaustion |
| **Time Risk** | Session quality |

### Example Output from LLM

```json
{
  "Trend_Score": +2,
  "Structure_Score": +1,
  "Volume_Score": -1,
  "Control_Score": +1,
  "Momentum_Score": 0,
  "Time_Risk_Score": -1
}
```

---

## 10. DETERMINISTIC DECISION ENGINE

### Bias Logic (Code, Not LLM)

```
Total Score ≥ +3  → BUY / CALL bias
Total Score ≤ -3  → SELL / PUT bias
Else              → NO TRADE
```

### Confidence Levels
- **High:** 4+ aligned factors
- **Medium:** 2–3 aligned
- **Low:** Conflicting signals

---

## 11. ENTRY, TARGET & INVALIDATION (BEGINNER-SAFE)

### Output Format

```
Bias: BUY
Confidence: Medium

Entry Zone:
- Preferred above: 19710–19725

Target Zone:
- First objective: 19760–19790

Invalidation:
- Bias invalid below: 19685

Risk Notes:
- Avoid entry without volume expansion
- Skip trade if price re-enters VWAP
```

📌 **Zones, not exact prices.**

---

## 12. TIMEFRAME & LATENCY CONSTRAINTS

### Supported Timeframes
- **5-minute** (minimum)
- **15-minute** (preferred)

### Explicitly Unsupported
- 1-minute scalping
- HFT logic
- News-reaction trading

---

## 13. EXECUTION MODEL

### Phase 1
- **Paper trading only**
- Human confirmation required

### Phase 2 (Optional)
- Assisted live trading
- Strict risk caps
- Manual override mandatory

---

## 14. LOGGING & REVIEW (VERY IMPORTANT)

Every evaluation logs:
- Feature snapshot
- Individual scores
- Final bias
- Entry/exit zones
- Outcome
- LLM reasoning summary

**Purpose:**
- Debug system psychology
- Improve feature engineering
- Avoid overfitting

---

## 15. BACKTESTING STRATEGY

### ❌ Traditional Backtesting
Not practical due to:
- LLM API cost
- Non-deterministic outputs

### ✅ Approved Method
- **Forward paper-trading**
- Weekly performance reviews
- Slow iterative improvement

---

## 16. SAFETY & ETHICS

Mandatory safeguards:
- "Educational use" disclaimer
- Explicit risk warnings
- **NO TRADE** bias encouraged
- No leverage encouragement
- No automation without confirmation

---

## 17. SUCCESS METRICS (REALISTIC)

- Reduced overtrading
- Improved discipline
- Higher quality trade selection
- Lower drawdowns
- Clear post-trade accountability

📌 **Profit is a by-product, not a metric.**

---

## 18. FINAL POSITIONING

> ChartSense is **not a signal provider**.  
> It is a **decision-support system** that teaches traders to think like professionals.
>
> It doesn't tell you what **will happen**.  
> It tells you what is **worth risking capital on**.

---

## 19. DATA SOURCE REQUIREMENTS

### Supported Data Providers

| Provider | Best For | Pricing | Latency |
|----------|----------|---------|---------|
| **Alpha Vantage** | Free tier, broad coverage | Free tier available, $49-149/mo paid | ~5-10 sec |
| **Polygon.io** | US equities, low latency | $29-199/mo | <1 sec (paid) |
| **EODHD.com** | Global coverage, historical depth | $0-99/mo | ~10 sec |
| **Finnhub** | Fundamental + technical data | Free tier, paid from $0 | ~5 sec |
| **Alpaca** | Combined data + execution | Free tier, $99/mo premium | <5 sec |

### Minimum Data Requirements
- **Format:** OHLCV (Open, High, Low, Close, Volume)
- **Frequency:** 5-minute bars minimum
- **Historical Depth:** Minimum 30 days for feature calibration
- **Maximum Acceptable Latency:** <10 seconds for intraday (5-min charts)

### Recommended Starting Stack
- **Development/Testing:** Alpha Vantage (free tier)
- **Production (Retail):** EODHD or Polygon.io

---

## 20. LLM PROVIDER REQUIREMENTS

### LLM Model Selection

| Provider | Model | Use Case | Cost (per 1M tokens) |
|----------|-------|----------|----------------------|
| **OpenAI** | GPT-4o Mini | High-volume, cost-sensitive | $0.60 in / $2.40 out |
| **OpenAI** | GPT-4o | Balanced performance | $5.00 in / $15.00 out |
| **Anthropic** | Claude 4.5 Sonnet | Complex reasoning | $3.00 in / $15.00 out |
| **Google** | Gemini 2.0 Flash | Budget-friendly | $0.10 in / $0.40 out |

### Recommended LLM Strategy
- **Primary:** Claude 4.5 Sonnet (best context understanding)
- **Fallback/Cost Optimization:** Gemini 2.0 Flash or GPT-4o Mini
- **Vision Mode:** GPT-4o or Claude with vision capabilities

### Average Token Usage Estimate
- **Per Analysis:** ~1,500 input tokens + 500 output tokens
- **Cost per Analysis:**
  - Claude 4.5 Sonnet: ~$0.012
  - GPT-4o Mini: ~$0.002
  - Gemini Flash: ~$0.0004

---

## 21. LLM BIAS MITIGATION

### Identified Risks
1. **Confirmation Bias:** LLM clings to initial judgment despite counter-evidence
2. **Sector Preference Bias:** May favor tech stocks or large-cap companies
3. **Overconfidence in Familiar Patterns:** Known chart patterns scored higher
4. **Recency Bias:** Recent market conditions weighted too heavily

### Mitigation Strategies
- **Ensemble Prompting:** Run 2-3 parallel LLM calls, average scores
- **Temperature Tuning:** Use temperature 0.3-0.5 to reduce randomness
- **Bias Audits:** Weekly review of sector/cap distribution in analysis
- **Blinded Analysis:** Don't reveal ticker symbol to LLM (prevents symbol bias)
- **Counter-Evidence Forcing:** Prompt must include "What argues against this bias?"

---

## 22. USER FEEDBACK MECHANISM

### In-App Feedback Loop
After each bias output, users can rate:
- **Was this analysis helpful?** (👍/👎)
- **Did you take the trade?** (Yes/No)
- **What was the outcome?** (Win/Loss/Breakeven/Didn't Enter)

### Error Reporting
- "Report Pattern Misidentification"
- Free-text feedback box
- Screenshot attachment support

### Data Usage
- All feedback stored with:
  - Timestamp
  - Feature snapshot
  - LLM scores
  - User rating
- Monthly analysis to identify systematic errors
- Periodic model fine-tuning based on feedback

---

## 23. COST MANAGEMENT & SCALABILITY

### API Cost Guardrails
- **Rate Limit:** Maximum 20 LLM calls per user session
- **Batch Processing:** Group multi-timeframe analysis into single call
- **Caching Layer:** Cache identical feature inputs for 5 minutes
- **Tiered Access:**
  - Free Tier: 10 analyses/day (Gemini Flash)
  - Paid Tier: Unlimited (Claude Sonnet)

### Cost Projections (1000 users/day)
Assuming average 5 analyses per user:

| Tier | Model | Daily Cost | Monthly Cost |
|------|-------|------------|--------------|
| Free | Gemini Flash | $2 | $60 |
| Paid | Claude Sonnet | $60 | $1,800 |

---

## 24. TECHNICAL GLOSSARY

For beginner traders:

- **VWAP** (Volume Weighted Average Price): Average price weighted by volume
- **HH/HL** (Higher High/Higher Low): Uptrend pattern
- **LH/LL** (Lower High/Lower Low): Downtrend pattern
- **OHLCV**: Open, High, Low, Close, Volume data
- **Bias**: Directional tendency (bullish/bearish/neutral)
- **Invalidation**: Price level where the analysis becomes wrong

---

## 25. COMPETITIVE POSITIONING

### Existing Similar Products

| Product | Approach | ChartSense Advantage |
|---------|----------|----------------------|
| **TrendSpider Sidekick** | AI chatbot for charts | Structured scoring vs. freeform chat |
| **Chart Analyst AI** | LLM analyzes chart images | Deterministic decision layer |
| **LLM-Trader** | Chain-of-thought crypto trading | Multi-asset, beginner-friendly |
| **QuantConnect** | Code-based algo trading | Natural language reasoning |

### ChartSense Unique Value Proposition

> **"The only trading assistant where AI judges, but code decides — keeping beginners safe while teaching professional thinking."**

1. **Deterministic Safety Layer** - Unlike pure LLM systems
2. **NO TRADE Encouraged** - Unlike signal services
3. **Transparent Scoring** - Unlike black-box algos
4. **Beginner-Safe Zones** - Unlike professional platforms

---

## 26. DEVELOPMENT PHASES

### Phase 1: MVP (3 months)
- Feature Builder for 5-min equity charts
- Single LLM scoring (Claude Sonnet)
- Deterministic bias engine
- Paper trading only
- Manual logging

### Phase 2: Scale (3-6 months)
- Multi-asset support (futures, options)
- Vision Mode for pattern recognition
- Automated logging & analytics dashboard
- User feedback loop integration
- Cost optimization (model switching)

### Phase 3: Advanced (6-12 months)
- Real-time alerts
- Portfolio-level analysis
- Backtesting visualization
- API for third-party integrations
- Mobile app

---

## 27. COMPLIANCE & DISCLAIMERS

### Required Disclosures
```
IMPORTANT NOTICE:
ChartSense is an EDUCATIONAL TOOL, not financial advice.
- Past performance does not guarantee future results
- Trading involves substantial risk of loss
- Users are solely responsible for trading decisions
- No guarantee of profitability
- Consult a licensed financial advisor before trading
```

### Data Usage Policy
- NO user trading data sold to third parties
- Aggregated analytics only (anonymized)
- GDPR/CCPA compliant data handling

---

## 28. SUCCESS CRITERIA (GO/NO-GO)

After 90 days of paper trading with 100+ users:

| Metric | Target | Go/No-Go Threshold |
|--------|--------|-------------------|
| **User Overtrading Reduction** | 30%+ decrease in trade frequency | >20% = GO |
| **NO TRADE Adherence** | Users respect 40%+ NO TRADE signals | >30% = GO |
| **Win Rate on Taken Trades** | 50%+ (breakeven or better) | >45% = GO |
| **User Retention (D30)** | 60%+ | >50% = GO |
| **NPS Score** | 40+ | >30 = GO |

---

## APPENDIX A: Acronyms & Abbreviations

- **API:** Application Programming Interface
- **CALL:** Options contract to buy
- **HFT:** High-Frequency Trading
- **LLM:** Large Language Model
- **OHLCV:** Open, High, Low, Close, Volume
- **PRD:** Product Requirements Document
- **PUT:** Options contract to sell
- **VWAP:** Volume Weighted Average Price

---

## APPENDIX B: Open Questions (For Team Discussion)

1. Should we support multiple LLM providers simultaneously for comparison?
2. What's the ideal refresh rate for 5-min chart analysis? (Every bar vs. on-demand)
3. Should we offer a "training mode" with simulated capital?
4. Integration with brokerage APIs (read-only or execution)?
5. Pricing model: Subscription vs. per-analysis credits?

---

**Document Control:**
- **Author:** Product Team
- **Reviewers:** Engineering, Trading SME, Compliance
- **Next Review Date:** Post-MVP Launch
- **Status:** ✅ APPROVED FOR DEVELOPMENT
