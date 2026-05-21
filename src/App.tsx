/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  History as HistoryIcon, 
  Settings as SettingsIcon,
  TrendingUp
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Sub-components
import HomeScreen from './screens/HomeScreen';
import HistoryScreen from './screens/HistoryScreen';
import SettingsScreen from './screens/SettingsScreen';
import SplashScreen from './screens/SplashScreen';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'history' | 'settings'>('home');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return <SplashScreen />;
  }

  return (
    <div className="flex flex-col h-[100dvh] max-w-md mx-auto relative overflow-hidden bg-dark-bg">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto overscroll-y-contain pb-24" style={{ WebkitOverflowScrolling: 'touch' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <HomeScreen />
            </motion.div>
          )}
          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <HistoryScreen />
            </motion.div>
          )}
          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <SettingsScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-dark-card border-t border-dark-border px-6 py-4 flex justify-around items-center z-50 max-w-md mx-auto rounded-t-3xl shadow-2xl">
        <NavButton 
          active={activeTab === 'home'} 
          onClick={() => setActiveTab('home')}
          icon={<Calculator size={24} />}
          label="Calc"
        />
        <NavButton 
          active={activeTab === 'history'} 
          onClick={() => setActiveTab('history')}
          icon={<HistoryIcon size={24} />}
          label="History"
        />
        <NavButton 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')}
          icon={<SettingsIcon size={24} />}
          label="Settings"
        />
      </nav>
    </div>
  );
}

function NavButton({ 
  active, 
  onClick, 
  icon, 
  label 
}: { 
  active: boolean; 
  onClick: () => void; 
  icon: React.ReactNode; 
  label: string;
}) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 transition-all duration-300 relative",
        active ? "text-gold" : "text-gray-500"
      )}
    >
      {active && (
        <motion.div 
          layoutId="activeTab"
          className="absolute -top-1 w-8 h-1 bg-gold rounded-full"
        />
      )}
      <div className={cn(
        "p-2 rounded-xl transition-colors",
        active ? "bg-gold/10" : "hover:bg-gray-800/50"
      )}>
        {icon}
      </div>
      <span className="text-[10px] font-medium uppercase tracking-widest">{label}</span>
    </button>
  );
}
