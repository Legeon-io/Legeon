import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute() {
  let localToken = localStorage.getItem("access_token");
  let sessionToken = sessionStorage.getItem("access_token");
  let localAuth = { token: localToken };
  let sessionAuth = { token: sessionToken };

  // logic
  // let sessionAuth = true;
  return false ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
