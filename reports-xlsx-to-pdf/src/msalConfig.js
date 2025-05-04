import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
    auth: {
        clientId: "890d40aa-3ac1-428f-bb35-947f8689a18d",
        authority: "https://login.microsoftonline.com/b3ba2c04-3cd9-4843-b131-c7c7108ffffb",
        redirectUri: window.location.origin,
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    },
};

export const msalInstance = new PublicClientApplication(msalConfig);

export const initializeMsal = async () => {
    await msalInstance.initialize();
};

export const loginRequest = {
    scopes: ["User.Read", "Files.Read", "Files.Read.All"],
};
