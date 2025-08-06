import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import theme from 'css/colour';
import reportWebVitals from 'reportWebVitals';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { LoadingProvider } from 'components/Loader/loadingContext';
import '@fontsource/fredoka';
import '@fontsource/fredoka/600.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
