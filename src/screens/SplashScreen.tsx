/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-dark-bg transition-colors duration-500">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative">
          <motion.div 
            className="w-24 h-24 rounded-3xl gold-gradient flex items-center justify-center shadow-[0_0_40px_rgba(255,215,0,0.3)]"
            animate={{ 
              rotate: [0, 5, 0, -5, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <TrendingUp size={48} className="text-black" />
          </motion.div>
          <motion.div 
            className="absolute -inset-4 rounded-[40px] border border-gold/20 -z-10"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        
        <div className="text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-4xl font-bold font-display gold-text-gradient tracking-tight"
          >
            PipWise
          </motion.h1>
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-gray-500 text-sm font-medium tracking-[0.2em] uppercase mt-2"
          >
            Trading Precision
          </motion.p>
        </div>
      </motion.div>

      <motion.div 
        className="absolute bottom-12 flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="w-12 h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gold"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>
        <span className="text-gray-600 text-[10px] uppercase tracking-widest font-bold">Initializing Engine</span>
      </motion.div>
    </div>
  );
}
