/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trash2, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { usePipWiseStore } from '../store';

export default function HistoryScreen() {
  const { history, clearHistory, deleteHistoryItem } = usePipWiseStore();

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="p-6 pb-20">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">History</h2>
          <p className="text-gray-500 text-sm">Review your past calculations</p>
        </div>
        {history.length > 0 && (
          <button 
            onClick={() => {
              if (confirm('Clear all history?')) clearHistory();
            }}
            className="p-3 rounded-2xl bg-dark-card border border-dark-border text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <Trash2 size={20} />
          </button>
        )}
      </header>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center opacity-30">
          <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-500 flex items-center justify-center mb-4">
            <Search size={32} />
          </div>
          <p className="text-gray-500 font-medium">No history found</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {history.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                className="trading-card p-4 flex justify-between items-center group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    item.entry > item.stopLoss ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {item.entry > item.stopLoss ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white uppercase text-sm tracking-widest">{item.pair}</span>
                      <span className="text-[10px] text-gray-500 font-medium">•</span>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{item.lotSize} Lots</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500 mt-0.5">
                      <Calendar size={10} />
                      <span className="text-[10px] font-medium tracking-tight">{formatDate(item.timestamp)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-gold font-bold font-display text-lg leading-tight">{item.pips}</p>
                    <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Pips</p>
                  </div>
                  <button 
                    onClick={() => deleteHistoryItem(item.id)}
                    className="p-2 text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          <div className="flex items-center justify-center gap-2 pt-6 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            <AlertCircle size={12} />
            Only last 50 trades are saved locally
          </div>
        </div>
      )}
    </div>
  );
}
