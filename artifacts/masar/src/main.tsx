import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

document.documentElement.style.setProperty(
  "font-family",
  '"Cairo", "Tajawal", system-ui, sans-serif',
);

createRoot(document.getElementById("root")!).render(<App />);
