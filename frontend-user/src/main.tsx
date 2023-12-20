import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { RecoilRoot } from "recoil";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RecoilRoot>
        <ThemeProvider>
          {" "}
          <App />
        </ThemeProvider>
      </RecoilRoot>
    </React.StrictMode>
  );
} else {
  console.error("Root element with ID 'root' not found");
}
