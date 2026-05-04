import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import './index.css';
import App from './App.jsx';

// In production, use the deployed backend URL
axios.defaults.baseURL = import.meta.env.PROD
  ? 'https://crypto-app-backend-u3zc.onrender.com'
  : '';
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
