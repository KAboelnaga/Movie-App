import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import LanguageProvider from './context/LanguageContext.jsx';
import CategoryProvider from './context/CategoryContext.jsx';
import {Provider} from 'react-redux';
import store from './components/store/store.js';
import ThemeProvider from './context/ThemeContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider>
        <CategoryProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </CategoryProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  </StrictMode>,
)