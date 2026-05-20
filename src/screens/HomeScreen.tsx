/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  Target, 
  ShieldAlert, 
  DollarSign, 
  CheckCircle2, 
  RotateCcw,
  Copy,
  Info,
  Hash,
  Save
} from 'lucide-react';
import { TradingPair } from '../types';
import { calculatePips, calculateLotSize, getPipValue } from '../utils/calculator';
import { usePipWiseStore } from '../store';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type CalcMode = 'price' | 'pips';

export default function HomeScreen() {
  const [mode, setMode] = useState<CalcMode>('price');
  const [pair, setPair] = useState<TradingPair>(TradingPair.EURUSD);
  const [entry, setEntry] = useState<string>('');
  const [stopLoss, setStopLoss] = useState<string>('');
  const [manualPips, setManualPips] = useState<string>('');
  const [risk, setRisk] = useState<string>('');
  
  const [showCopied, setShowCopied] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  
  const addHistoryItem = usePipWiseStore(state => state.addHistoryItem);

  // Real-time calculation logic
  const results = useMemo(() => {
    const riskNum = parseFloat(risk) || 0;
    const entryNum = parseFloat(entry) || 0;
    const slNum = parseFloat(stopLoss) || 0;
    
    // BabyPips Precision: 
    // If calculating JPY, we need the USDJPY rate specifically for the pip value
    const pipVal = getPipValue(pair, entryNum > 0 ? entryNum : slNum);
    
    let pips = 0;
    
    if (mode === 'price') {
      if (entryNum && slNum) {
        pips = calculatePips(entryNum, slNum, pair);
      }
    } else {
      pips = parseFloat(manualPips) || 0;
    }

    const lotSize = riskNum > 0 && pips > 0 ? calculateLotSize(riskNum, pips, pipVal) : 0;

    return {
      pips,
      lotSize,
      risk: riskNum,
      pipValue: pipVal,
      isValid: riskNum > 0 && pips > 0
    };
  }, [mode, pair, entry, stopLoss, manualPips, risk]);

  const handleSave = () => {
    if (!results.isValid) return;

    addHistoryItem({
      pips: results.pips,
      lotSize: results.lotSize,
      risk: results.risk,
      pair,
      entry: mode === 'price' ? (parseFloat(entry) || 0) : 0,
      stopLoss: mode === 'price' ? (parseFloat(stopLoss) || 0) : 0,
      timestamp: Date.now()
    });

    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const handleReset = () => {
    setEntry('');
    setStopLoss('');
    setManualPips('');
    setRisk('');
  };

  const handleCopy = () => {
    if (!results.isValid) return;
    const text = `PipWise Result:\nPair: ${pair}\nMode: ${mode}\nPips: ${results.pips}\nLot Size: ${results.lotSize}\nRisk: $${results.risk}`;
    navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div className="p-6 pb-20">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">PipWise Trader</h2>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest opacity-60">Terminal Suite</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleReset}
            className="p-3 rounded-2xl bg-dark-card border border-dark-border text-gray-400 hover:text-gold transition-colors"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </header>

      {/* Mode Selector */}
      <div className="bg-dark-card border border-dark-border p-1 rounded-2xl flex mb-6 shadow-2xl">
        <button 
          onClick={() => setMode('price')}
          className={cn(
            "flex-1 py-3 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
            mode === 'price' ? "bg-gold text-black shadow-lg" : "text-gray-500"
          )}
        >
          Price Based
        </button>
        <button 
          onClick={() => setMode('pips')}
          className={cn(
            "flex-1 py-3 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
            mode === 'pips' ? "bg-gold text-black shadow-lg" : "text-gray-500"
          )}
        >
          Direct Pips
        </button>
      </div>

      <div className="space-y-6">
        {/* Pair Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Trading Pair</label>
          <div className="relative">
            <select 
              value={pair}
              onChange={(e) => setPair(e.target.value as TradingPair)}
              className="w-full bg-dark-card border border-dark-border rounded-2xl p-4 appearance-none outline-none focus:border-gold/50 transition-all text-white font-medium"
            >
              {Object.values(TradingPair).map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
          </div>
        </div>

        {/* Dynamic Inputs */}
        <AnimatePresence mode="wait">
          {mode === 'price' ? (
            <motion.div 
              key="price-inputs"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-2 gap-4"
            >
              <InputField 
                label="Entry Price"
                value={entry}
                onChange={setEntry}
                icon={<Target size={18} />}
                placeholder="1.0850"
                step={pair.includes('JPY') ? "0.001" : pair === TradingPair.XAUUSD ? "0.01" : "0.00001"}
              />
              <InputField 
                label="Stop Loss"
                value={stopLoss}
                onChange={setStopLoss}
                icon={<ShieldAlert size={18} />}
                placeholder="1.0820"
                step={pair.includes('JPY') ? "0.001" : pair === TradingPair.XAUUSD ? "0.01" : "0.00001"}
              />
            </motion.div>
          ) : (
            <motion.div 
              key="pips-inputs"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <InputField 
                label="Exact Pips"
                value={manualPips}
                onChange={setManualPips}
                icon={<Hash size={18} />}
                placeholder="30.5"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <InputField 
          label="Risk Amount ($)"
          value={risk}
          onChange={setRisk}
          icon={<DollarSign size={18} />}
          placeholder="100.00"
          step="0.01"
        />

        {/* Results Card (Real-time) */}
        <motion.div 
          className={cn(
            "trading-card p-6 relative overflow-hidden transition-all duration-300",
            results.isValid ? "bg-gold/5 border-gold/40 shadow-[0_0_30px_rgba(255,215,0,0.05)]" : "bg-dark-card border-dark-border opacity-60"
          )}
        >
          <div className="absolute top-0 right-0 p-2 flex gap-1">
            <button 
              onClick={handleCopy}
              disabled={!results.isValid}
              className="p-2 hover:bg-gold/10 rounded-lg text-gold transition-colors disabled:opacity-0"
            >
              {showCopied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
            </button>
          </div>
          
          <div className="flex items-center gap-2 mb-6">
            <div className={cn(
              "w-1 h-6 rounded-full transition-colors",
              results.isValid ? "bg-gold" : "bg-gray-700"
            )} />
            <h3 className="text-lg font-bold font-display uppercase tracking-wider">Live Results</h3>
          </div>

          <div className="grid grid-cols-2 gap-y-6">
            <ResultBlock label="Total Pips" value={results.pips || '—'} unit="pips" highlight={results.isValid} />
            <ResultBlock label="Lot Size" value={results.lotSize || '—'} unit="lots" highlight={results.isValid} />
            <ResultBlock label="Risk" value={results.risk ? `$${results.risk}` : '—'} unit="USD" />
            <ResultBlock label="Pip Value" value={results.isValid ? `$${results.pipValue.toFixed(2)}` : '—'} unit="p/lot" />
          </div>
          
          <div className="mt-6 pt-6 border-t border-dark-border space-y-2 text-[10px] text-gray-500 italic">
             <div className="flex items-start gap-2">
               <Info size={12} className="flex-shrink-0 mt-0.5 text-gray-600" />
               <p>Calculated based on {pair === TradingPair.XAUUSD ? 'Gold (0.10)' : pair.includes('JPY') ? 'JPY (0.01)' : 'Standard (0.0001)'} pip size rules.</p>
             </div>
             {pair.endsWith('USD') || pair === TradingPair.XAUUSD ? (
               <div className="flex items-center gap-2 text-gold/40">
                 <div className="w-1 h-1 rounded-full bg-gold/40 ml-1" />
                 <p>Standard Rule: Fixed $10.00/pip per 1.00 Lot</p>
               </div>
             ) : pair.includes('JPY') ? (
               <div className="flex items-center gap-2 text-gold/40">
                 <div className="w-1 h-1 rounded-full bg-gold/40 ml-1" />
                 <p>JPY Rule: Approx $6.00–$7.00 per lot (1000 ÷ Price)</p>
               </div>
             ) : (pair === TradingPair.USDCHF || pair === TradingPair.USDCAD) && (
               <div className="flex items-center gap-2 text-gold/40">
                 <div className="w-1 h-1 rounded-full bg-gold/40 ml-1" />
                 <p>USD-Base Rule: Approx {pair === TradingPair.USDCAD ? '$7–$8' : '$10–$11'} per lot based on price.</p>
               </div>
             )}
          </div>
        </motion.div>

        {/* Save Button */}
        <button 
          onClick={handleSave}
          disabled={!results.isValid}
          className="w-full gold-gradient text-black font-bold py-4 rounded-2xl shadow-[0_4px_20px_rgba(255,215,0,0.2)] disabled:opacity-20 disabled:grayscale transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
        >
          {showSaved ? (
            <>
              <CheckCircle2 size={20} />
              <span>SAVED TO HISTORY</span>
            </>
          ) : (
            <>
              <Save size={20} />
              <span>SAVE TRADE</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function InputField({ 
  label, 
  value, 
  onChange, 
  icon, 
  placeholder,
  step = "any"
}: { 
  label: string; 
  value: string; 
  onChange: (v: string) => void; 
  icon: React.ReactNode;
  placeholder: string;
  step?: string;
}) {
  return (
    <div className="space-y-2 group">
      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1 group-focus-within:text-gold transition-colors">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gold transition-colors">
          {icon}
        </div>
        <input 
          type="number"
          inputMode="decimal"
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-dark-card border border-dark-border rounded-2xl p-4 pl-12 appearance-none outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all text-white font-medium placeholder:text-gray-600"
        />
      </div>
    </div>
  );
}

function ResultBlock({ 
  label, 
  value, 
  unit, 
  highlight = false 
}: { 
  label: string; 
  value: string | number; 
  unit: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{label}</p>
      <div className="flex items-baseline gap-1">
        <motion.span 
          key={value}
          initial={{ opacity: 0.5, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "text-2xl font-bold font-display leading-none transition-colors",
            highlight ? "text-gold" : "text-white/10"
          )}
        >
          {value}
        </motion.span>
        <span className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter">{unit}</span>
      </div>
    </div>
  );
}
