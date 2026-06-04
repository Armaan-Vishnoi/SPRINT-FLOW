
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import SocketProvider from "./socket/SocketProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <SocketProvider>
        <App />
        <Toaster position="top-right" />
      </SocketProvider>
    </AuthProvider>
  </BrowserRouter>,
);
