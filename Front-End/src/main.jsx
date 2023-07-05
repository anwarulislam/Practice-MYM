import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GCLIENT_ID =
  "461349021297-u2s7gd7nie5697m0d4po36687fp0n6du.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GCLIENT_ID}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
