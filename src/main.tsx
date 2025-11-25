import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Set dark theme by default
const theme = localStorage.getItem("theme") || "dark";
document.documentElement.classList.toggle("dark", theme === "dark");

createRoot(document.getElementById("root")!).render(<App />);
