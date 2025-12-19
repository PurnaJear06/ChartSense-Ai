# ChartSense — Zero Budget Implementation Plan

## 🎯 Goal: Build ChartSense with $0 Monthly Cost

**Strategy:** Use free tiers from all providers until you get paying users

---

## 💰 Complete Free Tier Stack

### 1. Market Data API (Free)

**Primary: Alpha Vantage**
- **Free Tier:** 25 API calls/day (500/month with free key)
- **What you get:** Real-time stocks, forex, crypto, technical indicators
- **Limitation:** 15-min delayed data on free tier
- **Cost:** **$0/month**
- **Sign up:** https://www.alphavantage.co/support/#api-key

**Backup: Finnhub**
- **Free Tier:** 60 API calls/minute
- **What you get:** Real-time stock data, fundamentals
- **Cost:** **$0/month**
- **Sign up:** https://finnhub.io/register

---

### 2. LLM Provider (Free)

**Primary: Google Gemini**
- **Free Tier:** 1,500 requests/day (Gemini 2.0 Flash)
- **What you get:** Fast inference, structured output
- **Limitation:** Lower rate limits, community support only
- **Cost:** **$0/month**
- **Sign up:** https://ai.google.dev/

**Backup: Groq (Open Source LLMs)**
- **Free Tier:** 14,400 requests/day (Llama models)
- **What you get:** Ultra-fast inference, free hosting
- **Cost:** **$0/month**
- **Sign up:** https://console.groq.com/

---

### 3. Backend Hosting (Free)

**Option A: Vercel (Recommended)**
- **Free Tier:** 
  - 100 GB bandwidth/month
  - Serverless functions
  - Automatic HTTPS
- **Perfect for:** Next.js fullstack app
- **Cost:** **$0/month**
- **Sign up:** https://vercel.com/

**Option B: Railway**
- **Free Tier:** $5 free credit/month (renews)
- **What you get:** Deploy from GitHub, 500 MB RAM
- **Cost:** **$0/month** (within free credits)

**Option C: Render**
- **Free Tier:** Static sites + Web services
- **Limitation:** Sleeps after 15 min inactivity
- **Cost:** **$0/month**

---

### 4. Database (Free)

**PostgreSQL: Neon**
- **Free Tier:** 
  - 3 GB storage
  - 1 database
  - Auto-pause after inactivity
- **Perfect for:** User data, analysis logs
- **Cost:** **$0/month**
- **Sign up:** https://neon.tech/

**Alternative: Supabase**
- **Free Tier:**
  - 500 MB database
  - 2 GB file storage
  - Built-in auth
- **Cost:** **$0/month**

---

### 5. Caching (Free)

**Redis: Upstash**
- **Free Tier:**
  - 10,000 requests/day
  - 256 MB storage
- **Perfect for:** Response caching, rate limiting
- **Cost:** **$0/month**
- **Sign up:** https://upstash.com/

---

### 6. Authentication (Free)

**Clerk**
- **Free Tier:** 10,000 monthly active users
- **What you get:** Email/social login, user management
- **Cost:** **$0/month**
- **Sign up:** https://clerk.com/

**Alternative: Supabase Auth**
- Included with Supabase free tier
- Email + OAuth providers

---

### 7. Frontend Framework (Free)

**Next.js + Vercel**
- **Framework:** Free and open source
- **Hosting:** Vercel free tier
- **Components:** shadcn/ui (free)
- **Charts:** Lightweight Charts (free)
- **Cost:** **$0/month**

---

## 📊 Free Tier Capacity Analysis

### What You Can Support (Free)

| Resource | Free Limit | User Capacity |
|----------|------------|---------------|
| **Alpha Vantage** | 25 calls/day | ~5 users × 5 analyses/day |
| **Gemini API** | 1,500 calls/day | 300 users × 5 analyses/day |
| **Vercel Bandwidth** | 100 GB/month | ~5,000 monthly users |
| **Neon DB** | 3 GB storage | ~50,000 analysis logs |
| **Upstash Redis** | 10,000 req/day | ~2,000 cache hits/day |

**Bottleneck:** Alpha Vantage (25 calls/day)

**Solution:** Use multiple free API keys or switch to Finnhub (60 calls/min)

---

## 🚀 Zero Budget Architecture

```
User Browser
    ↓
Vercel (Free) — Next.js App
    ↓
├── Alpha Vantage (Free) — Market Data
├── Gemini API (Free) — AI Analysis
├── Neon (Free) — PostgreSQL Database
└── Upstash (Free) — Redis Cache
```

---

## 🎯 Implementation Phases (Zero Cost)

### Phase 0: Setup (Week 1)
- [x] Sign up for all free tier accounts
- [ ] Create Next.js app
- [ ] Deploy to Vercel
- [ ] Connect Neon database
- [ ] Integrate Clerk auth

### Phase 1: Core Features (Weeks 2-3)
- [ ] Alpha Vantage integration
- [ ] Gemini API integration
- [ ] Feature Builder (indicators)
- [ ] Simple BUY/SELL/NO TRADE output
- [ ] User settings (Beginner/Pro mode)

### Phase 2: UX Enhancement (Week 4)
- [ ] Pre-market stock screener
- [ ] Watchlist feature
- [ ] Analysis history (last 10)
- [ ] Feedback buttons

### Phase 3: Polish (Week 5-6)
- [ ] Responsive design
- [ ] Error handling
- [ ] Rate limiting
- [ ] Onboarding flow

---

## 🆓 Free Stock Screening (Pre-Market)

### How to Build with Free APIs

**Daily Pre-Market Workflow:**

```python
# 1. Get top gainers/losers (Free with Alpha Vantage)
GET https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=KEY

# 2. Filter for liquid stocks (volume > 1M)
# 3. Run analysis on top 5 candidates
# 4. Cache results in Neon DB
# 5. Display to users when they open app
```

**Alternative Free Screener Data:**
- **Yahoo Finance (unofficial API):** Free, no key needed
- **Financial Modeling Prep:** 250 calls/day free
- **Polygon.io:** Free tier for delayed EOD data

---

## 📱 Adaptive UI (Beginner vs Pro)

### Beginner Mode Output
```
🟢 BUY SIGNAL
Confidence: High

Entry: Wait for price above $155.50
Target: $158.00
Stop: Below $154.20

⚠️ Risk: Don't enter without volume
```

### Pro Mode Output
```
Bias: BUY | Confidence: HIGH

Scores:
  Trend:     +2 ███████████ Strong uptrend
  Structure: +1 █████░░░░░░ Clean HH/HL
  Volume:    +1 █████░░░░░░ Confirming
  VWAP:       0 ░░░░░░░░░░░ Neutral
  Momentum:  +2 ███████████ Expanding
  Time:      -1 ███░░░░░░░░ Late session

Total Score: +5

Entry Zone: 155.50 - 156.00
Target: 158.00 - 159.00
Invalidation: 154.20
```

**Implementation:**
```javascript
// User settings stored in DB
const userMode = user.settings.mode; // 'beginner' | 'pro'

if (userMode === 'beginner') {
  return <SimpleBiasCard bias={bias} />;
} else {
  return <DetailedScoreCard scores={scores} />;
}
```

---

## 🌅 Pre-Market Stock Recommendations

### Feature Spec

**What it does:**
- Scans top 50 liquid stocks before market open
- Runs quick analysis on each
- Recommends top 3-5 with strongest bias
- Updates daily at 8:00 AM (1 hour before market)

**Free Implementation:**

**Option 1: Scheduled Vercel Function**
```javascript
// api/cron/daily-scan.js
export default async function handler(req, res) {
  if (req.headers['vercel-cron-key'] !== process.env.CRON_SECRET) {
    return res.status(401).end();
  }
  
  // 1. Fetch top movers from Alpha Vantage
  const topStocks = await fetchTopMovers();
  
  // 2. Analyze each (uses Gemini free tier)
  const analyses = await Promise.all(
    topStocks.map(stock => analyzeStock(stock))
  );
  
  // 3. Filter for high-confidence BUY/SELL only
  const recommendations = analyses
    .filter(a => a.confidence === 'HIGH')
    .slice(0, 5);
  
  // 4. Store in DB
  await db.dailyRecommendations.create({
    date: new Date(),
    stocks: recommendations
  });
  
  res.status(200).json({ success: true });
}
```

**Option 2: GitHub Actions (Completely Free)**
```yaml
# .github/workflows/daily-scan.yml
name: Daily Stock Scan
on:
  schedule:
    - cron: '30 2 * * 1-5'  # 8:00 AM IST, Mon-Fri

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run stock scanner
        run: |
          python scripts/daily_scan.py
        env:
          ALPHA_VANTAGE_KEY: ${{ secrets.ALPHA_VANTAGE_KEY }}
          GEMINI_KEY: ${{ secrets.GEMINI_KEY }}
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

---

## 🎨 User Flow (Beginner)

```
1. User opens app (9:00 AM)
   ↓
2. See banner: "📈 5 stocks worth watching today"
   ↓
3. Click to view recommendations
   ↓
4. See simple cards:
   
   [AAPL] 🟢 BUY Setup
   Price: $155.20
   Entry above: $155.50
   Target: $158.00
   
   [View Analysis] button
   ↓
5. Click [View Analysis]
   ↓
6. Full analysis loads (uses 1 API call if not cached)
   ↓
7. Simple output (if Beginner mode):
   "BUY above $155.50, aim for $158, cut below $154.20"
```

---

## ⚙️ Settings Page

### User Preferences (Stored in DB)

```javascript
{
  userId: "user_123",
  settings: {
    mode: "beginner", // or "pro"
    notifications: {
      preMarket: true,  // Daily stock recommendations
      newSignals: false // Real-time alerts (future)
    },
    preferences: {
      riskTolerance: "low", // low/medium/high
      timeframe: "5min",
      instruments: ["stocks", "etfs"] // what to scan
    }
  }
}
```

### Settings UI (React)
```jsx
<SettingsPage>
  <Section title="Experience Level">
    <Toggle 
      options={['Beginner', 'Pro Trader']}
      value={mode}
      onChange={updateMode}
    />
    <p className="text-sm text-gray-500">
      Beginner: Simple BUY/SELL/NO TRADE signals<br/>
      Pro: Detailed scores and reasoning
    </p>
  </Section>
  
  <Section title="Daily Recommendations">
    <Switch 
      checked={settings.notifications.preMarket}
      label="Get 5 stocks to watch before market opens"
    />
  </Section>
</SettingsPage>
```

---

## 📊 Capacity on Free Tier

### Daily Limits

| Feature | API Calls | Max Users |
|---------|-----------|-----------|
| **User Analysis** | Gemini: 1500/day | 300 users × 5 analyses |
| **Market Data** | Alpha Vantage: 25/day | 25 stocks (shared) |
| **Pre-Market Scan** | 5 stocks × 1 call = 5/day | All users see same 5 |
| **Caching** | Upstash: 10K/day | Reduces API usage by 40% |

**Smart Strategy:**
- Pre-market scan runs ONCE per day (5 API calls)
- All users see same recommendations (cached)
- Individual analysis on-demand (uses Gemini, 1500/day limit)
- Cache popular stocks (AAPL, SPY, etc.) for 5 minutes

---

## 💡 Free Tier Optimization Tips

### 1. Aggressive Caching
```javascript
// Cache popular stock analyses for 5 minutes
const cacheKey = `analysis:${symbol}:${timeframe}:${date}`;
const cached = await redis.get(cacheKey);

if (cached) {
  return JSON.parse(cached); // No API calls!
}

// Only call API if cache miss
const result = await analyzeStock(symbol);
await redis.set(cacheKey, JSON.stringify(result), 'EX', 300); // 5 min TTL
```

### 2. Rate Limit User Actions
```javascript
// Max 5 analyses per user per day (beginner)
// Max 20 analyses per user per day (pro)
const userLimit = user.mode === 'beginner' ? 5 : 20;
const todayCount = await db.analyses.count({
  where: {
    userId: user.id,
    createdAt: { gte: startOfDay }
  }
});

if (todayCount >= userLimit) {
  throw new Error('Daily limit reached. Upgrade to Pro for more.');
}
```

### 3. Pre-Compute Popular Stocks
```javascript
// Run every hour for SPY, QQQ, AAPL (most requested)
const popularStocks = ['SPY', 'QQQ', 'AAPL', 'TSLA', 'NVDA'];

for (const symbol of popularStocks) {
  const analysis = await analyzeStock(symbol);
  await cache.set(`precomputed:${symbol}`, analysis, 3600); // 1 hour
}
```

---

## 🚦 Migration Path (When You Get Users)

### Free Tier Limits Hit
- **At 100 users:** Upgrade Alpha Vantage to $49/mo OR switch to EODHD
- **At 500 users:** Upgrade Gemini OR add Claude for premium users
- **At 1000 users:** Upgrade databases (Neon $20/mo)

### Revenue Triggers
| User Count | Monthly Revenue (10% paid @$9.99) | Action |
|------------|-----------------------------------|--------|
| 100 | $99 | Upgrade data API |
| 500 | $499 | Add premium LLM tier |
| 1000 | $999 | Upgrade infrastructure |

---

## ✅ Zero Budget Checklist

- [ ] Sign up for Alpha Vantage free key
- [ ] Sign up for Google AI Studio (Gemini)
- [ ] Create Vercel account
- [ ] Set up Neon PostgreSQL
- [ ] Set up Upstash Redis
- [ ] Set up Clerk auth
- [ ] Deploy Next.js starter
- [ ] Test end-to-end flow
- [ ] Add rate limiting (manual per-user)
- [ ] Launch with "Beta" label

---

## 📝 Disclaimer for Free Tier

Add to your landing page:
```
⚡ ChartSense Beta — Free While in Testing

During beta, we're using free-tier APIs:
- Limited to 5 analyses per day
- Market data may be delayed 15 minutes
- Pre-market recommendations for liquid stocks only

Premium features coming soon!
```

---

## 🎯 Launch Strategy (Zero Cost)

1. **Week 1:** Build MVP on free stack
2. **Week 2:** Test with 10 friends
3. **Week 3:** Launch on Twitter/Reddit (free marketing)
4. **Week 4:** Gather feedback, iterate
5. **Month 2:** Add payment ($9.99/mo) when you hit 100 users
6. **Month 3:** Invest first $500 revenue into paid APIs

---

## 🔗 Free Resource Links

| Service | Free Tier Limit | Sign Up Link |
|---------|-----------------|--------------|
| Alpha Vantage | 25/day | https://www.alphavantage.co/support/#api-key |
| Google Gemini | 1500/day | https://ai.google.dev/ |
| Groq (backup) | 14,400/day | https://console.groq.com/ |
| Vercel | 100GB/mo | https://vercel.com/signup |
| Neon DB | 3GB | https://neon.tech/ |
| Upstash Redis | 10K/day | https://upstash.com/ |
| Clerk Auth | 10K MAU | https://clerk.com/ |

---

**Total Monthly Cost:** **$0** ✅

**Max Capacity:** ~100-200 active users before hitting limits

**Revenue Needed to Scale:** $100/month (10 paid users @ $9.99)
