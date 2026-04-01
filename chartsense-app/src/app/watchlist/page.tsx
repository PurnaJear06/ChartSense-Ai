'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import Button from '@/components/Button';
import Link from 'next/link';
import { TrendingUp, TrendingDown, Clock } from 'lucide-react';

const MOCK_WATCHLIST = [
    {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        bias: 'BUY',
        currentPrice: 195.20,
        target: 198.50,
        confidence: 'HIGH'
    },
    {
        symbol: 'SPY',
        name: 'S&P 500 ETF',
        bias: 'SELL',
        currentPrice: 580.50,
        target: 575.00,
        confidence: 'MEDIUM'
    },
    {
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        bias: 'BUY',
        currentPrice: 385.00,
        target: 392.00,
        confidence: 'HIGH'
    },
    {
        symbol: 'NVDA',
        name: 'NVIDIA Corp.',
        bias: 'NO TRADE',
        currentPrice: 720.50,
        target: null,
        confidence: 'LOW'
    },
    {
        symbol: 'META',
        name: 'Meta Platforms',
        bias: 'BUY',
        currentPrice: 535.80,
        target: 545.00,
        confidence: 'MEDIUM'
    },
];

export default function WatchlistPage() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const getSignalColor = (bias: string) => {
        if (bias === 'BUY') return 'text-green-400 bg-green-500/10 border-green-500/30';
        if (bias === 'SELL') return 'text-red-400 bg-red-500/10 border-red-500/30';
        return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    };

    const getSignalIcon = (bias: string) => {
        if (bias === 'BUY') return <TrendingUp className="w-5 h-5" />;
        if (bias === 'SELL') return <TrendingDown className="w-5 h-5" />;
        return <Clock className="w-5 h-5" />;
    };

    return (
        <main className="min-h-screen py-12 px-4">
            <div className="container max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <Link href="/" className="inline-block mb-6">
                        <h1 className="text-4xl font-bold gradient-text">ChartSense</h1>
                    </Link>
                    <h2 className="text-3xl font-semibold text-gray-300 mb-2">
                        📊 Today's Watchlist
                    </h2>
                    <p className="text-gray-400">
                        {MOCKWATCHLIST.length} Stocks Worth Watching Today
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Updated: {time.toLocaleTimeString()} | Market opens at 9:30 AM
                    </p>
                </div>

                {/* Watchlist Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {MOCK_WATCHLIST.map((stock, index) => (
                        <motion.div
                            key={stock.symbol}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <GlassCard className="hover:border-indigo-500/50 transition-all cursor-pointer">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold">{stock.symbol}</h3>
                                        <p className="text-sm text-gray-400">{stock.name}</p>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full border flex items-center gap-2 ${getSignalColor(stock.bias)}`}>
                                        {getSignalIcon(stock.bias)}
                                        <span className="font-semibold text-sm">{stock.bias}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Current</span>
                                        <span className="font-semibold">${stock.currentPrice}</span>
                                    </div>

                                    {stock.target && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Target</span>
                                            <span className={stock.bias === 'BUY' ? 'text-green-400' : 'text-red-400'}>
                                                ${stock.target}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center pt-2 border-t border-white/10">
                                        <span className="text-sm text-gray-500">
                                            Confidence: {stock.confidence}
                                        </span>
                                        <Link href={`/analyze?symbol=${stock.symbol}`}>
                                            <Button variant="ghost" size="sm">
                                                View Analysis →
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                {/* Info Banner */}
                <GlassCard className="text-center">
                    <p className="text-gray-300 mb-4">
                        💡 <strong>Tip:</strong> These stocks were analyzed at 8:00 AM before market open.
                        Click "View Analysis" for detailed entry levels and risk warnings.
                    </p>
                    <Link href="/analyze">
                        <Button>Analyze a Different Stock</Button>
                    </Link>
                </GlassCard>
            </div>
        </main>
    );
}
