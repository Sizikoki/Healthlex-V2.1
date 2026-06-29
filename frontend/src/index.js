import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";
import { injectSpeedInsights } from '@vercel/speed-insights';
import { Analytics } from '@vercel/analytics/react';

injectSpeedInsights();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
);
