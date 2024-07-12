import {PublicClientApplication} from '@azure/msal-browser';

export const msalConfig = {
    auth: {
        clientId: 'bf889674-38b4-4962-aed7-8aa58de1a32c', 
        authority: 'https://login.microsoftonline.com/af954910-0373-40a3-9264-df85a5adfbb6',
        redirectUri: 'http://localhost:3000',
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false,
    }
};

export const msalInstance = new PublicClientApplication(msalConfig);
