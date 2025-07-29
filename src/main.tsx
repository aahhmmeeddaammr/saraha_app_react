import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="501348923678-o2jni35638q31p2gg734scfm77ngiahq.apps.googleusercontent.com">
    <App />
    <Toaster />
  </GoogleOAuthProvider>
);
