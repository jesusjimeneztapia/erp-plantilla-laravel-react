import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@css/app.css";

import App from "./App.tsx";
import { ThemeProvider } from "@context/ThemeContext.tsx";
import { AppWrapper } from "@components/common/PageMeta.tsx";

createRoot(document.getElementById("app")!).render(
    <StrictMode>
        <ThemeProvider>
            <AppWrapper>
                <App />
            </AppWrapper>
        </ThemeProvider>
    </StrictMode>
);
