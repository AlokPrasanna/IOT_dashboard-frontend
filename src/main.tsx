import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from './context/Theme/ThemeContext';
import { BrowserRouter } from 'react-router-dom';
import { BaseUrlProvider } from './context/BaseUrl/BaseUrlContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <BaseUrlProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BaseUrlProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
