import "./global.css";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

// Create root only once to prevent double mounting warnings
const root = createRoot(container);
root.render(<App />);
