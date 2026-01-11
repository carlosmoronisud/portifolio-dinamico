import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App.tsx'

import { PortfolioService } from './services/api';

// Testar a API
const testAPI = async () => {
  const service = PortfolioService.getInstance();
  const data = await service.fetchPortfolioData();
  console.log('📊 Dados carregados:', data);
};

// Chame apenas em desenvolvimento
if (import.meta.env.DEV) {
  testAPI();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
