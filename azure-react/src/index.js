// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from './msalConfig';
import App from './App';

ReactDOM.render(
    <MsalProvider instance={msalInstance}>
        <App />
    </MsalProvider>,
    document.getElementById('root')
);
