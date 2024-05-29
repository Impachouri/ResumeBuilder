import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SectionDataProvider } from "./context/appContext/AppContext.tsx";
import { ApiDataProvider } from "./context/apiContext/apiContext.tsx";
import { UserDataProvider } from "./context/userContext/userContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SectionDataProvider>
      <ApiDataProvider>
        <UserDataProvider>
          <App />
        </UserDataProvider>
      </ApiDataProvider>
    </SectionDataProvider>
  </React.StrictMode>
);
