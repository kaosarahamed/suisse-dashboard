import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const adminAuth = localStorage.getItem("admin");
  let admin;
  try {
    admin = JSON.parse(adminAuth); // Safely parse the admin data
  } catch (error) {
    admin = null; // Handle cases where parsing fails
  }
  const token = admin?.token; // Safely access the token
  let component = (
    <div className="vh-100">
      <Outlet />
    </div>
  );
  // If no token, allow public route access, otherwise redirect to home.
  return !token ? component : <Navigate to="/" />;
};

export default PublicRoute;
