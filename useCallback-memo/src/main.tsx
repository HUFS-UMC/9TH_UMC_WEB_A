import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./UseCallbackPage_ex3(memo)/components/CountButton.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
