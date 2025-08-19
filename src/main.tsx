import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")!).render(
  //50200811809-ab6tmesot42bl18b5vlp3b3034ah9fd7.apps.googleusercontent.com
  <GoogleOAuthProvider clientId="50200811809-ab6tmesot42bl18b5vlp3b3034ah9fd7.apps.googleusercontent.com">
    <App />
    <Toaster />
  </GoogleOAuthProvider>
);
