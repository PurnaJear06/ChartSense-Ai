'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import Button from '@/components/Button';
import { ArrowRight, TrendingUp, Shield, Zap, Lock, Brain, LineChart } from 'lucide-react';

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-32 md:py-48 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto mb-32"
        >
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md">
            <span className="text-indigo-300 text-sm font-semibold tracking-wide uppercase">v1.0 Public Beta</span>
          </div>

          <h1 className="text-7xl md:text-9xl font-bold mb-8 tracking-tighter leading-[0.9]">
            <span className="block text-white">Market</span>
            <span className="gradient-text-primary">Clarity</span>
          </h1>

          <p className="text-xl md:text-3xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed text-balance font-light">
            An AI that judges market context like a pro, but leaves the final decision to deterministic code.
          </p>

          <div className="flex gap-6 justify-center items-center flex-wrap">
            <Link href="/analyze">
              <Button size="lg" className="w-full sm:w-auto h-14 text-lg">
                Start Analysis <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/watchlist">
              <Button variant="glass" size="lg" className="w-full sm:w-auto h-14 text-lg">
                Daily Watchlist
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Bento Grid Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-32"
        >
          {/* Large Card */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <GlassCard glow className="h-full flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="w-12 h-12 mb-6 bg-indigo-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30">
                  <Brain className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Context-Aware Intelligence</h3>
                <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                  Most indicators are blind to context. ChartSense uses Gemini AI to judge 6 key market factors—Trend, Structure, Volume, Control, Momentum, and Timing—before generating any signal.
                </p>
              </div>
              <div className="mt-8 flex gap-2">
                {['Trend', 'Volume', 'Structure'].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Tall Card */}
          <motion.div variants={itemVariants} className="md:row-span-2">
            <GlassCard glow className="h-full bg-gradient-to-b from-white/5 to-transparent">
              <div className="h-full flex flex-col">
                <div className="w-12 h-12 mb-6 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-500/30">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Guard Rails</h3>
                <p className="text-gray-400 leading-relaxed mb-8">
                  LLMs can hallucinate. That's why we use a deterministic "Safety Layer" that overrides AI suggestions if strict mathematical risk parameters aren't met.
                </p>
                <div className="mt-auto space-y-4">
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <div className="text-red-400 text-xs font-bold uppercase mb-1">Risk Warning</div>
                    <div className="text-white text-sm">Prevents trading into resistance</div>
                  </div>
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="text-green-400 text-xs font-bold uppercase mb-1">Clear Signal</div>
                    <div className="text-white text-sm">Only confirms high-confluence setups</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Standard Card 1 */}
          <motion.div variants={itemVariants}>
            <GlassCard className="h-full">
              <div className="w-12 h-12 mb-6 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                <LineChart className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Precision Levels</h3>
              <p className="text-gray-400">
                Don't guess where to enter. We provide exact Entry, Target, and Stop Loss prices based on volatility structure.
              </p>
            </GlassCard>
          </motion.div>

          {/* Standard Card 2 */}
          <motion.div variants={itemVariants}>
            <GlassCard className="h-full">
              <div className="w-12 h-12 mb-6 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Zero Friction</h3>
              <p className="text-gray-400">
                No sign-up required to test. No credit card. Just instant analysis powered by enterprise-grade APIs.
              </p>
            </GlassCard>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <footer className="border-t border-white/5 py-12">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white">C</div>
              <span className="font-bold text-white tracking-tight">ChartSense</span>
            </div>
            <p className="text-gray-500 text-sm">
              Built for educational purposes. Not financial advice.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
