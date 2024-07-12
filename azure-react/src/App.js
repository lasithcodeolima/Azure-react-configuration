// src/App.js
import React from 'react';
import { useMsal } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';

const App = () => {
    const { instance, accounts } = useMsal();

    const handleLogin = () => {
        instance.loginPopup({
            scopes: ["User.Read"]
        }).catch(e => {
            console.error(e);
        });
    };

    const handleLogout = () => {
        instance.logoutPopup().catch(e => {
            console.error(e);
        });
    };

    return (
        <div>
            {accounts.length > 0 ? (
                <div>
                    <p>Welcome, {accounts[0].name}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <button onClick={handleLogin}>Login</button>
            )}
        </div>
    );
};

export default App;
