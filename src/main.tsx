import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { extendTheme , CssVarsProvider } from '@mui/joy/styles';

const theme = extendTheme({
  fontFamily: {
    display: 'Pretendard',
    body: 'Pretendard', 
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <CssVarsProvider theme={theme}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </CssVarsProvider>,
);
