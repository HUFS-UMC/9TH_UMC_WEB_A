import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../style.css"; // style.css가 루트에 있다고 가정

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
