import React, { useState } from 'react';
import { 
  User, 
  Info, 
  Shield, 
  Coffee,
  Heart,
  Edit2,
  Check,
  ChevronRight,
  Calculator,
  Database,
  Settings as SettingsIcon
} from 'lucide-react';
import { usePipWiseStore } from '../store';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function SettingsScreen() {
  const historyCount = usePipWiseStore(state => state.history.length);

  return (
    <div className="p-6 pb-24">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">Profile</h2>
          <p className="text-gray-500 text-sm">Application details</p>
        </div>
        <div className="p-3 rounded-2xl bg-gold/10 text-gold border border-gold/20">
          <SettingsIcon size={20} />
        </div>
      </header>

      <div className="space-y-6">
        {/* Profile Card (Permanent) */}
        <div className="trading-card p-6 space-y-4 bg-gradient-to-br from-dark-card to-gray-900 border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex items-center gap-4 relative">
            <div className="w-16 h-16 rounded-2xl gold-gradient p-1 shadow-[0_0_20px_rgba(255,184,0,0.2)]">
              <div className="w-full h-full rounded-xl bg-dark-bg flex items-center justify-center text-gold">
                <User size={32} />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-xl tracking-tight">PipWise Trader</h3>
              </div>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-1 opacity-60">Verified Account • v2.4.0</p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard icon={<Database size={18} />} label="Data Saved" value={`${historyCount} Entries`} />
          <StatCard icon={<Shield size={18} />} label="Security" value="Encrypted" />
        </div>

        {/* Pip Rules Section */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] pl-1">Trading Master Rules</h4>
          <div className="trading-card p-4 space-y-4 border-gold/5 bg-black/20">
            <RuleItem title="Standard Pairs (5 Dec)" desc="EURUSD, GBPUSD: 0.0001 = 1 Pip ($10/Lot)" />
            <RuleItem title="JPY Pairs (3 Dec)" desc="USDJPY, GBPJPY: 0.01 = 1 Pip (~$6-$7/Lot)" />
            <RuleItem title="Gold (XAUUSD)" desc="0.10 Move = 1 Pip ($10 Fixed/Lot)" />
          </div>
        </div>

        {/* Donate Section */}
        <div className="pt-4">
          <a 
            href="upi://pay?pa=rawheatkadam@upi&pn=PipWise%20Developer&tn=Support%20PipWise%20App&cu=INR"
            className="w-full block gold-gradient p-[1px] rounded-2xl group active:scale-95 transition-transform"
          >
            <div className="w-full h-full bg-dark-bg rounded-[15px] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-dark-bg transition-colors">
                  <Coffee size={20} />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-sm">Buy me a coffee</p>
                  <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Support Development via UPI</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gold">
                <Heart size={16} className="fill-current" />
                <ChevronRight size={18} />
              </div>
            </div>
          </a>
        </div>

        {/* Simple Footer */}
        <div className="text-center pt-8 border-t border-white/5 pb-10">
          <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.4em] mb-4">PipWise Intelligence Systems</p>
          <div className="text-[10px] text-gray-600 space-y-1 italic max-w-[240px] mx-auto">
            <p>"Risk comes from not knowing what you're doing."</p>
            <p className="font-bold opacity-50">— Warren Buffett</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="trading-card p-4 flex flex-col gap-2 border-white/5 bg-white/[0.02]">
      <div className="text-gold/60">{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none mb-1">{label}</p>
        <p className="text-white font-bold tracking-tight">{value}</p>
      </div>
    </div>
  );
}

function RuleItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-gold/30 mt-1.5 flex-shrink-0" />
      <div>
        <p className="text-xs font-bold text-white tracking-wide">{title}</p>
        <p className="text-[10px] text-gray-500 font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

