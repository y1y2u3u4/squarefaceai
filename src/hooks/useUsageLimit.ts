'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'squareface_usage';
const FREE_LIMIT = 3;

interface UsageData {
  count: number;
  isPro: boolean;
}

interface UseUsageLimitReturn {
  usageCount: number;
  remainingUses: number;
  canGenerate: boolean;
  isPro: boolean;
  incrementUsage: () => void;
  resetUsage: () => void;
  setPro: (value: boolean) => void;
}

export function useUsageLimit(): UseUsageLimitReturn {
  const [usageData, setUsageData] = useState<UsageData>({ count: 0, isPro: false });

  // Load usage data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as UsageData;
        setUsageData(parsed);
      } catch {
        // Invalid data, reset
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save usage data to localStorage whenever it changes
  const saveUsage = useCallback((data: UsageData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setUsageData(data);
  }, []);

  const incrementUsage = useCallback(() => {
    const newData = { ...usageData, count: usageData.count + 1 };
    saveUsage(newData);
  }, [usageData, saveUsage]);

  const resetUsage = useCallback(() => {
    saveUsage({ count: 0, isPro: usageData.isPro });
  }, [usageData.isPro, saveUsage]);

  const setPro = useCallback((value: boolean) => {
    saveUsage({ ...usageData, isPro: value });
  }, [usageData, saveUsage]);

  const remainingUses = usageData.isPro ? Infinity : Math.max(0, FREE_LIMIT - usageData.count);
  const canGenerate = usageData.isPro || usageData.count < FREE_LIMIT;

  return {
    usageCount: usageData.count,
    remainingUses,
    canGenerate,
    isPro: usageData.isPro,
    incrementUsage,
    resetUsage,
    setPro,
  };
}

export const FREE_GENERATION_LIMIT = FREE_LIMIT;
