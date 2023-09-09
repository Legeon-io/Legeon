import { Outlet, Navigate } from "react-router-dom";
import Cookie from "js-cookie";

function ProtectedRoute() {
  let googleToken = Cookie.get("googletoken");
  let token = Cookie.get("token");
  let checkToken = googleToken || token;

  return checkToken ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
