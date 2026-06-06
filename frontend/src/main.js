import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
ReactDOM.createRoot(document.getElementById("root")).render(_jsx(BrowserRouter, { children: _jsxs(AuthProvider, { children: [_jsx(App, {}), _jsx(Toaster, { position: "top-right" })] }) }));
