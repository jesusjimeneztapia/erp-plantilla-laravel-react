import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@css/app.css";

import App from "./App.tsx";
import { AppWrapper } from "@components/common/PageMeta.tsx";

createRoot(document.getElementById("app")!).render(
    <StrictMode>
        <AppWrapper>
            <App />
        </AppWrapper>
    </StrictMode>
);
