import React, { useCallback, useEffect, useState } from 'react';
import { PortfolioContext, type PortfolioContextType } from './portfolio-context';
import { PortfolioService } from '../services/api';
import type { PortfolioData } from '../types/portfolio'; // Import type

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const portfolioService = PortfolioService.getInstance();

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const portfolioData = await portfolioService.fetchPortfolioData();
      setData(portfolioData);
    } catch (err) {
      setError('Erro ao carregar dados do portfólio');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [portfolioService]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const contextValue: PortfolioContextType = {
    data,
    loading,
    error,
    refreshData,
  };

  return (
    <PortfolioContext.Provider value={contextValue}>
      {children}
    </PortfolioContext.Provider>
  );
};