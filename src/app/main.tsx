import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import "modern-normalize/modern-normalize.css";
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx'
import { queryClient } from '@/shared/api/queryClient';




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
    
  </StrictMode>,
)
