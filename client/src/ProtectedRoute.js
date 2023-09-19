import { Outlet, Navigate } from "react-router-dom";
import Cookie from "js-cookie";

function ProtectedRoute() {
  let token = Cookie.get("token");

  return token ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
