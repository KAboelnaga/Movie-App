import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import LanguageProvider from './context/LanguageContext.jsx';
import {Provider} from 'react-redux';
import store from './components/store/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
    <Provider store={store}>
      <App />
    </Provider>
    </LanguageProvider>
  </StrictMode>,
)