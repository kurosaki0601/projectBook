import { Navigate } from "react-router-dom";
import { AUTH_TOKEN } from "./constants";

// eslint-disable-next-line react/prop-types
const ProtectedRoutes = ({ children }) => {
  let isAuthenticated = localStorage.getItem(AUTH_TOKEN);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
