import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import "modern-normalize/modern-normalize.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

import QueryProvider from "@/shared/providers/Provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryProvider>
  </StrictMode>,
);
