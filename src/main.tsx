import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AppDataProvider } from "./context/appContext/AppContext";
import { ApiDataProvider } from "./context/apiContext/ApiContext";
import { UserDataProvider } from "./context/userContext/UserContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppDataProvider>
      <ApiDataProvider>
        <UserDataProvider>
          <App />
        </UserDataProvider>
      </ApiDataProvider>
    </AppDataProvider>
  </React.StrictMode>
);
