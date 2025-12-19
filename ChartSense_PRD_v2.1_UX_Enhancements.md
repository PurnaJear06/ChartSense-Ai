# ChartSense PRD — User Experience Enhancements (Addendum)

**Version:** 2.1  
**Date:** December 19, 2025  
**Purpose:** Add Beginner/Pro modes, Pre-Market Recommendations, and Settings

---

## NEW SECTION 7A: USER EXPERIENCE LEVELS

### Problem Statement
Beginners get overwhelmed by technical scores, while pro traders want detailed breakdowns. One-size-fits-all approach reduces usability for both groups.

### Solution: Adaptive UI Based on Experience Level

---

### 1. Experience Mode Selection

**On First Login (Onboarding):**

```
Welcome to ChartSense! 🎯

How much trading experience do you have?

┌─────────────────────────────────────┐
│  🌱 BEGINNER MODE                   │
│  • Simple BUY/SELL/NO TRADE signals │
│  • No jargon, clear instructions    │
│  • Perfect for learning             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  📊 PRO TRADER MODE                 │
│  • Detailed factor scores           │
│  • Full technical context           │
│  • Advanced risk analysis           │
└─────────────────────────────────────┘

You can change this anytime in Settings.

[Continue]
```

**Stored in Database:**
```javascript
{
  userId: "user_123",
  settings: {
    experienceMode: "beginner", // or "pro"
    createdAt: "2025-12-19T08:00:00Z"
  }
}
```

---

### 2. Beginner Mode Output

**Characteristics:**
- ✅ **Clear visual signal:** Green (BUY), Red (SELL), Gray (NO TRADE)
- ✅ **Simple language:** No "VWAP", "HH/HL" etc.
- ✅ **Actionable zones:** Clear entry/exit prices
- ✅ **One-line risk warning:** No complex multi-factor explanation
- ❌ **NO scores shown:** Hides -2 to +2 scoring system

**Example Output:**

```
┌──────────────────────────────┐
│  🟢 BUY SIGNAL               │
│  Confidence: MEDIUM          │
└──────────────────────────────┘

WHAT TO DO:
✓ Entry: Wait for price above $155.50
🎯 Target: Sell around $158.00
❌ Stop Loss: Exit if below $154.20

⚠️ RISK WARNING:
Wait for good volume before entering.
If price falls back below $154, the setup is broken.

[ 👍 Helpful ] [ 👎 Not Helpful ]
```

---

### 3. Pro Trader Mode Output

**Characteristics:**
- ✅ **Full score breakdown:** All 6 factors with values
- ✅ **Technical terms:** VWAP, structure, HH/HL
- ✅ **Visual score bars:** See at a glance which factors are strong/weak
- ✅ **Detailed reasoning:** LLM explanation for each score
- ✅ **Extended risk notes:** Multiple context-specific warnings

**Example Output:**

```
┌────────────────────────────────────┐
│ BIAS: BUY  │  CONFIDENCE: MEDIUM   │
│ Total Score: +3                    │
└────────────────────────────────────┘

FACTOR BREAKDOWN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Trend:      +2  ██████████ Strong uptrend, EMA aligned
Structure:  +1  █████░░░░░ Clean HH/HL, minimal overlap
Volume:      0  ░░░░░░░░░░ Neutral, not confirming yet
Control:    +1  █████░░░░░ Price above VWAP by 0.7%
Momentum:   +1  █████░░░░░ Building, RSI at 58
Time Risk:  -2  ████░░░░░░ Last hour of session, reduced edge

ENTRY & EXIT:
Entry Zone:  $155.50 - $156.00 (above VWAP)
Target Zone: $158.00 - $159.00 (next resistance)
Invalidation: Below $154.20 (recent swing low)

RISK NOTES:
• Volume not confirming uptrend — wait for expansion
• Late session (3:00 PM) reduces statistical edge
• Consider smaller position size than usual
• Watch for rejection at $158 resistance

LLM REASONING:
"Trend and structure favor bullish continuation, but 
lack of volume confirmation and late session timing 
reduce confidence. Entry only if volume picks up."

[ 👍 Helpful ] [ 👎 Not Helpful ] [ 💬 Feedback ]
```

---

### 4. Mode Switching

**Location:** Settings page (see Section 7C)

**Instant Effect:**
- Changes bias output format immediately
- No re-analysis needed (same underlying data)
- User can toggle between modes anytime

**Implementation:**
```javascript
// Single analysis stored, two rendering modes
const analysis = {
  bias: "BUY",
  confidence: "MEDIUM",
  scores: {...},
  zones: {...},
  reasoning: {...}
};

// Render based on user mode
if (user.settings.experienceMode === "beginner") {
  return <SimpleBiasCard data={analysis} />;
} else {
  return <ProBiasCard data={analysis} />;
}
```

---

## NEW SECTION 7B: PRE-MARKET STOCK RECOMMENDATIONS

### Problem Statement
Users waste time scanning random stocks. They need a **daily starting point** — stocks worth watching BEFORE the market opens.

### Solution: Automated Daily Watchlist

---

### 1. How It Works (System Flow)

**Daily at 8:00 AM (1 hour before market open):**

```
1. System scans 50 pre-selected liquid stocks
   (AAPL, SPY, QQQ, NVDA, TSLA, etc.)
   
2. Runs quick analysis on each (using feature builder + LLM)
   
3. Filters for HIGH confidence setups only
   (Score ≥ +4 or ≤ -4)
   
4. Selects top 5 strongest setups
   
5. Stores in database as "Daily Watchlist"
   
6. Users see this when they open the app
```

**User Experience:**

When user opens ChartSense at 9:00 AM:

```
┌────────────────────────────────────────────┐
│ 📊 TODAY'S WATCHLIST — Friday, Dec 19     │
│ 5 Stocks Worth Watching Today             │
└────────────────────────────────────────────┘

1. AAPL   🟢 BUY SETUP              [View Analysis]
   Current: $155.20  →  Target: $158.00
   
2. SPY    🔴 SELL SETUP             [View Analysis]
   Current: $580.50  →  Target: $575.00
   
3. NVDA   ⚪ NO CLEAR SETUP         
   Choppy range, wait for clarity
   
4. TSLA   🟢 BUY SETUP              [View Analysis]
   Current: $385.00  →  Target: $392.00
   
5. META   🟢 BUY SETUP              [View Analysis]
   Current: $720.50  →  Target: $735.00

Updated: 8:05 AM | Market opens in 55 minutes

💡 TIP: Review these before market open to plan your day
```

---

### 2. Stock Selection Logic (Zero Budget)

**Curated Universe (No API cost):**
```javascript
const WATCHLIST_UNIVERSE = [
  // Top liquidity, most-traded
  'SPY', 'QQQ', 'IWM', 'DIA',          // Indices
  'AAPL', 'MSFT', 'GOOGL', 'AMZN',    // Mega-cap tech
  'NVDA', 'TSLA', 'META', 'NFLX',     // Growth tech
  'JPM', 'BAC', 'WFC', 'GS',          // Finance
  'XLE', 'XLF', 'XLK', 'XLV',         // Sector ETFs
  // ... total 50 stocks
];
```

**Why Curated List?**
- Free tier APIs have rate limits (25/day for Alpha Vantage)
- Scanning 50 stocks uses 50 API calls
- Pre-selecting high-liquidity stocks ensures quality

**Filtering Criteria:**
1. Average volume > 2 million shares/day
2. Price $20 - $500 (exclude penny stocks and ultra-high)
3. Clear trend or range structure (no random chop)
4. HIGH confidence bias only (score ≥ +4 or ≤ -4)
5. Sector diversity (max 2 from same sector)

---

### 3. Implementation (Free Tier)

**Option A: GitHub Actions (Completely Free)**

```yaml
# .github/workflows/daily-watchlist.yml
name: Daily Pre-Market Scan

on:
  schedule:
    - cron: '30 2 * * 1-5'  # 8:00 AM IST Mon-Fri

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Run daily scan
        run: |
          pip install -r requirements.txt
          python scripts/daily_premarket_scan.py
        env:
          ALPHA_VANTAGE_KEY: ${{ secrets.ALPHA_VANTAGE_KEY }}
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
      
      - name: Store results
        run: |
          # Results automatically saved to Neon PostgreSQL
```

**Option B: Vercel Cron (Hobby Plan Free)**

```javascript
// pages/api/cron/daily-scan.js
export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  // Verify cron secret
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  // Scan top stocks
  const results = await scanDailyWatchlist();
  
  // Store top 5 in database
  await db.dailyWatchlist.create({
    date: new Date().toISOString().split('T')[0],
    stocks: results.slice(0, 5)
  });
  
  return Response.json({ success: true, count: results.length });
}
```

**Vercel Cron UI Setup:**
```
Dashboard → Project → Settings → Cron Jobs
Add New: daily-scan
Schedule: 0 2 * * 1-5 (8:00 AM IST, Mon-Fri)
Path: /api/cron/daily-scan
```

---

### 4. User Settings for Watchlist

**Customization Options:**

```
⚙️ WATCHLIST PREFERENCES

Daily Recommendations:
☑ Show me 5 stocks to watch before market open
  (Runs every weekday at 8:00 AM)

Watchlist Size:
○ 3 stocks
● 5 stocks (recommended)
○ 10 stocks

Focus on Sectors:
☑ Technology
☑ Finance
☐ Healthcare
☑ Energy
☐ Consumer

Exclude Symbols:
[ Add symbols to never show ]
Current: TSLA, GME

Minimum Confidence:
● HIGH only
○ HIGH or MEDIUM
```

---

### 5. Click-Through Experience

**User clicks [View Analysis] on a recommended stock:**

```
User sees: Same bias output as regular on-demand analysis
- Uses cached result from morning scan
- NO additional API call
- Respects Beginner/Pro mode setting
```

**Benefit:** Pre-market scan does all the API work once, users consume cached results all day.

---

## NEW SECTION 7C: SETTINGS & CUSTOMIZATION

### Settings Page Structure

```
┌─────────────────────────────────────┐
│  ⚙️ CHARTSENSE SETTINGS             │
└─────────────────────────────────────┘

1. Experience Level
2. Notifications
3. Watchlist Preferences  
4. Risk Settings
5. Display Preferences
6. Account & Privacy
```

---

### 1. Experience Level

```
EXPERIENCE MODE

How much detail do you want to see in analysis?

○ Beginner Mode
  Simple BUY/SELL/NO TRADE signals
  Perfect for learning traders
  
● Pro Trader Mode
  Detailed factor scores and reasoning
  Full technical context

[Save Changes]
```

---

### 2. Notifications

```
NOTIFICATIONS

Daily Watchlist:
☑ Email me top 5 stocks at 8:00 AM
  (Mon-Fri before market open)
  
Browser Notifications:
☐ Notify when new watchlist is ready
☐ Notify when analysis is complete
  (Requires browser permission)

Premium Alerts (Coming Soon):
☐ Real-time high-confidence setups
☐ Position size suggestions
```

---

### 3. Watchlist Preferences

*(See Section 7B for full details)*

```
DAILY WATCHLIST

Enable: ☑ Yes ○ No

Watchlist Size: [5 ▼]

Sectors: Technology, Finance, Energy

Exclude: TSLA, GME

Minimum Confidence: HIGH only
```

---

### 4. Risk Settings

```
RISK PREFERENCES

Risk Tolerance:
○ Conservative — Only HIGH confidence setups shown
● Moderate — HIGH and MEDIUM confidence
○ Aggressive — Show all signals including LOW

Time Horizon:
● Intraday (5-min, 15-min)
○ Swing Trading (daily)

Show Position Sizing:
☐ Calculate suggested position based on your account
  (Requires entering account size in Profile)
```

---

### 5. Display Preferences

```
DISPLAY

Chart Style:
● Candlestick
○ Line
○ Heikin Ashi

Timezone:
[Asia/Kolkata (IST) ▼]

Color Theme:
● Dark Mode
○ Light Mode
○ Auto (Follow System)

Language:
[English ▼]
```

---

### 6. Account & Privacy

```
ACCOUNT

Email: user@example.com
Plan: Free (5 analyses/day)
[Upgrade to Pro]

PRIVACY

Data Usage:
☑ Allow anonymized data for improving accuracy
☐ Send me product updates via email

Delete Account:
[Delete My Account]
(All your data will be permanently removed)
```

---

## INTEGRATION WITH EXISTING PRD

### Updated Section Numbers

Original PRD sections 8-28 become sections 11-31.

**New Structure:**
- Sections 1-6: Unchanged
- Section 7: Feature Builder (unchanged)
- **Section 7A: User Experience Levels (NEW)**
- **Section 7B: Pre-Market Recommendations (NEW)**
- **Section 7C: Settings & Customization (NEW)**
- Sections 8-28: Renumber to 11-31

---

## IMPACT ON ZERO BUDGET PLAN

**Additional Free Resources Needed:**

1. **Scheduled Jobs:** GitHub Actions (free) or Vercel Cron (free on Hobby)
2. **Storage:** 5 stocks × 365 days = ~2,000 records/year (negligible DB cost)
3. **API Calls:** 50 stocks/day = 50 Alpha Vantage calls (within range if using Finnhub backup)

**Solution to API Limit:**
- Use Finnhub free tier (60 calls/min) for daily scan
- Use Alpha Vantage (25/day) for user on-demand analysis
- Total cost: **$0/month**

---

## IMPLEMENTATION PRIORITY

### Phase 1 (MVP - Week 1-3)
1. ✅ Beginner/Pro mode toggle in onboarding
2. ✅ Simple vs. detailed bias output rendering
3. ✅ Settings page (mode switching)

### Phase 2 (Week 4-5)
1. Daily watchlist cron job
2. Watchlist display on homepage
3. Cached analysis retrieval

### Phase 3 (Week 6+)
1. Watchlist customization (sectors, symbol blacklist)
2. Email notifications
3. Browser push notifications

---

## SUCCESS METRICS (ADDITIONS)

Besides existing metrics, track:

| New Metric | Target | Measurement |
|------------|--------|-------------|
| **Mode Distribution** | 60% Beginner, 40% Pro | User settings |
| **Watchlist Engagement** | 70%+ users click at least 1 stock | Daily active users |
| **Watchlist Accuracy** | 60%+ recommendations reach target | Trade outcomes |
| **Mode Switching Rate** | <10% users switch modes | Settings changes |

---

## CONCLUSION

These enhancements make ChartSense:
1. **More beginner-friendly** (simplified output)
2. **More proactive** (daily recommendations)
3. **More customizable** (user preferences)

All while maintaining **$0 monthly cost** using free tier APIs and scheduled jobs.

---

**Document Status:** ✅ Ready for Integration into Main PRD
