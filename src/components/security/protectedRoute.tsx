import { type PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  if (!localStorage.getItem("isAuthentecated")) return <Navigate to="/auth" />;
  return <>{children}</>;
};

export default ProtectedRoute;
