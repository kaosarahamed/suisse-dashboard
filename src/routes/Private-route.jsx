import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const adminAuth = localStorage.getItem("admin");
  const admin = JSON.parse(adminAuth);
  const { token } = admin || {};

  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
