import { createContext } from 'react';
import type { PortfolioData } from '../types/portfolio'; // Import type

export interface PortfolioContextType {
  data: PortfolioData | null;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

export const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

