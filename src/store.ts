/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TradeHistoryItem } from './types';

interface PipWiseState {
  history: TradeHistoryItem[];
  addHistoryItem: (item: Omit<TradeHistoryItem, 'id'>) => void;
  clearHistory: () => void;
  deleteHistoryItem: (id: string) => void;
}

export const usePipWiseStore = create<PipWiseState>()(
  persist(
    (set) => ({
      history: [],
      addHistoryItem: (item) => set((state) => ({
        history: [{ ...item, id: Math.random().toString(36).substring(7) }, ...state.history].slice(0, 50)
      })),
      clearHistory: () => set({ history: [] }),
      deleteHistoryItem: (id) => set((state) => ({
        history: state.history.filter((i) => i.id !== id)
      })),
    }),
    {
      name: 'pipwise-storage',
    }
  )
);
