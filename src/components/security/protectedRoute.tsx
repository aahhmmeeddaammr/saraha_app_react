import { type PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
interface Props {
  auth?: boolean;
}
const ProtectedRoute = ({ auth, children }: Props & PropsWithChildren) => {
  if (!auth && !localStorage.getItem("accessToken") && !localStorage.getItem("refreshToken")) {
    return <Navigate to={"/auth"} />;
  }
  if (auth && localStorage.getItem("accessToken") && localStorage.getItem("refreshToken")) {
    return <Navigate to={"/"} />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
