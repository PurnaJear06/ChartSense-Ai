<div align="center">

<img src="https://img.shields.io/badge/ChartSense-AI-6366f1?style=for-the-badge&logo=tradingview&logoColor=white&labelColor=0d1117" height="40"/>

# 🧠 ChartSense AI

### *AI-Powered Market Chart Analysis — Think Like a Trader, Not a Bot*

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![Status](https://img.shields.io/badge/Status-In_Development-6366f1?style=flat-square)]()
[![License](https://img.shields.io/badge/License-MIT-10b981?style=flat-square)]()

</div>

---

## 📖 What is ChartSense AI?

ChartSense AI is an intelligent market analysis tool that reads stock/crypto charts the way an experienced trader does — identifying patterns, key levels, and probabilistic market bias **without predicting exact prices or guaranteeing profits**.

Unlike traditional indicators, ChartSense uses computer vision and deep learning to understand chart structure holistically, providing:
- 📊 **Pattern Recognition** — Candlestick patterns, support/resistance, trend channels
- 📈 **Probabilistic Bias** — Market direction confidence (not predictions)
- 🔍 **Multi-Timeframe Analysis** — Cross-referencing across timeframes
- 💡 **Plain English Summaries** — No jargon, clear insights

## 🏗️ Architecture

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Data Input  │───▶│  Processing  │───▶│   Analysis   │
│  (Charts)    │    │  Pipeline    │    │   Engine     │
└──────────────┘    └──────────────┘    └──────────────┘
                                              │
                    ┌──────────────┐    ┌──────▼───────┐
                    │   Frontend   │◀───│  API Layer   │
                    │  Dashboard   │    │  (FastAPI)   │
                    └──────────────┘    └──────────────┘
```

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Backend** | Python, FastAPI |
| **AI/ML** | TensorFlow, OpenCV, Custom CNNs |
| **Data** | Yahoo Finance API, Binance API |
| **Frontend** | React, Chart.js |
| **Database** | PostgreSQL |
| **Deployment** | Docker, Streamlit |

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/PurnaJear06/ChartSense-Ai.git
cd ChartSense-Ai

# Install dependencies
pip install -r requirements.txt

# Run the app
python main.py
```

## 📚 Documentation

Detailed documentation is available in this branch:
- [Product Requirements (PRD)](./ChartSense_PRD_v2.md)
- [Technical Architecture](./ChartSense_Technical_Architecture.md)
- [Data & API Research](./ChartSense_Data_API_Research.md)
- [Zero Budget Deployment Plan](./ChartSense_Zero_Budget_Plan.md)

## ⚠️ Disclaimer

> This tool provides **probabilistic analysis**, not financial advice. It does NOT predict prices or guarantee profits. Always do your own research and never invest more than you can afford to lose.

---

<div align="center">

**Built with ❤️ by [Purna Jear](https://github.com/PurnaJear06)**

</div>
