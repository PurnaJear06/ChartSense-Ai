'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import Button from '@/components/Button';
import { Search, TrendingUp, TrendingDown, Minus, ArrowRight, AlertTriangle, CheckCircle, XCircle, BarChart3, Clock, Target } from 'lucide-react';
import Link from 'next/link';

export default function AnalyzePage() {
    const [symbol, setSymbol] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleAnalyze = async () => {
        if (!symbol) return;
        setLoading(true);
        // Mock analysis
        setTimeout(() => {
            setResult({
                symbol: symbol.toUpperCase(),
                bias: 'BUY',
                confidence: 'HIGH',
                entry: [154.50, 155.20],
                target: [162.00, 165.00],
                invalidation: 148.50,
                riskNotes: [
                    'Wait for volume expansion > 1.2M before entering',
                    'Approaching major liquidity zone at $160',
                ],
                scores: {
                    trend: 2, structure: 1, volume: 1, control: 1, momentum: 2, time: 0
                }
            });
            setLoading(false);
        }, 2000);
    };

    const getSignalColor = (bias: string) => {
        if (bias === 'BUY') return 'text-emerald-400';
        if (bias === 'SELL') return 'text-rose-400';
        return 'text-gray-400';
    };

    const getSignalGradient = (bias: string) => {
        if (bias === 'BUY') return 'from-emerald-500/20 to-emerald-500/5';
        if (bias === 'SELL') return 'from-rose-500/20 to-rose-500/5';
        return 'from-gray-500/20 to-gray-500/5';
    };

    return (
        <main className="min-h-screen py-24 px-4 relative z-10">
            <div className="container max-w-6xl mx-auto">
                <div className="mb-12 flex items-center justify-between">
                    <Link href="/" className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <div className="text-right">
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Market Analysis</h1>
                        <p className="text-gray-500 text-sm">AI-Powered Context Engine</p>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {!result ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                            className="max-w-2xl mx-auto text-center mt-20"
                        >
                            <GlassCard className="p-12 border-indigo-500/20 shadow-[0_0_100px_-20px_rgba(99,102,241,0.2)]">
                                <h2 className="text-4xl font-bold mb-8">What are we trading?</h2>
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity" />
                                    <div className="relative flex gap-4 bg-white/5 border border-white/10 rounded-xl p-2 focus-within:border-indigo-500/50 transition-colors">
                                        <input
                                            type="text"
                                            value={symbol}
                                            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                                            placeholder="Enter symbol (e.g. BTC, NVDA)"
                                            className="flex-1 bg-transparent border-none text-2xl font-mono text-white placeholder-gray-600 focus:ring-0 px-4 uppercase tracking-wider"
                                            onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                                        />
                                        <Button
                                            onClick={handleAnalyze}
                                            disabled={!symbol || loading}
                                            className="min-w-[140px]"
                                            size="lg"
                                        >
                                            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Analyze'}
                                        </Button>
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-center gap-4 text-sm text-gray-500">
                                    <span>Popular:</span>
                                    {['SPY', 'QQQ', 'BTC', 'ETH', 'NVDA'].map(s => (
                                        <button key={s} onClick={() => setSymbol(s)} className="hover:text-indigo-400 transition-colors">{s}</button>
                                    ))}
                                </div>
                            </GlassCard>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="grid lg:grid-cols-3 gap-6"
                        >
                            {/* Main Signal Card */}
                            <div className="lg:col-span-2 space-y-6">
                                <GlassCard glow className={`bg-gradient-to-br ${getSignalGradient(result.bias)} border-l-4 ${result.bias === 'BUY' ? 'border-l-emerald-500' : 'border-l-rose-500'}`}>
                                    <div className="flex justify-between items-start mb-8">
                                        <div>
                                            <div className="text-gray-400 text-sm font-mono mb-2">ANALYSIS RESULT</div>
                                            <h2 className="text-6xl font-bold tracking-tighter flex items-center gap-4">
                                                {result.symbol}
                                                <span className={`text-4xl px-4 py-1 rounded-full bg-white/5 border border-white/10 ${getSignalColor(result.bias)}`}>
                                                    {result.bias}
                                                </span>
                                            </h2>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-gray-400 text-sm mb-1">CONFIDENCE</div>
                                            <div className="text-2xl font-bold text-white">{result.confidence}</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2"><TrendingUp className="w-4 h-4" /> ENTRY</div>
                                            <div className="text-xl font-mono font-bold text-white">${result.entry[0]} - ${result.entry[1]}</div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2"><Target className="w-4 h-4" /> TARGET</div>
                                            <div className="text-xl font-mono font-bold text-emerald-400">${result.target[0]} - ${result.target[1]}</div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2"><XCircle className="w-4 h-4" /> STOP</div>
                                            <div className="text-xl font-mono font-bold text-rose-400">${result.invalidation}</div>
                                        </div>
                                    </div>
                                </GlassCard>

                                <GlassCard>
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                        <BarChart3 className="w-5 h-5 text-indigo-400" />
                                        Context Breakdown
                                    </h3>
                                    <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                                        {Object.entries(result.scores).map(([factor, score]: [string, any]) => (
                                            <div key={factor}>
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-gray-400 capitalize text-sm">{factor}</span>
                                                    <span className={`text-sm font-bold ${score > 0 ? 'text-emerald-400' : score < 0 ? 'text-rose-400' : 'text-gray-500'}`}>
                                                        {score > 0 ? '+' : ''}{score}
                                                    </span>
                                                </div>
                                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-1000 ${score > 0 ? 'bg-emerald-500' : score < 0 ? 'bg-rose-500' : 'bg-gray-600'}`}
                                                        style={{ width: `${Math.abs(score) * 33}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </GlassCard>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                <GlassCard className="border-l-4 border-l-yellow-500 bg-yellow-500/5">
                                    <h3 className="font-bold text-yellow-400 flex items-center gap-2 mb-4">
                                        <AlertTriangle className="w-5 h-5" />
                                        Risk Protocol
                                    </h3>
                                    <ul className="space-y-3">
                                        {result.riskNotes.map((note: string, i: number) => (
                                            <li key={i} className="text-sm text-gray-300 flex gap-3 text-balance leading-relaxed">
                                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 flex-shrink-0" />
                                                {note}
                                            </li>
                                        ))}
                                    </ul>
                                </GlassCard>

                                <div className="space-y-4 pt-8">
                                    <Button variant="secondary" onClick={() => setResult(null)} className="w-full">
                                        New Analysis
                                    </Button>
                                    <p className="text-center text-xs text-gray-500">
                                        Calculated at {new Date().toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
