import "./global.css";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

// Check if root already exists to prevent double mounting
let root: ReturnType<typeof createRoot>;

if (!container.hasChildNodes()) {
  root = createRoot(container);
  root.render(<App />);
}
