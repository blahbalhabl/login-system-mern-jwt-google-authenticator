import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const loc = useLocation();
  
  // Check if the user has any of the allowed roles
  const hasAllowedRole = allowedRoles?.includes(auth?.role);
  
  return (
    hasAllowedRole
      ? <Outlet/>
      : auth?.role
        ? <Navigate to='/unauthorized' state={{from: loc}} replace />
        : <Navigate to='/auth/login' state={{from: loc}} replace />
  )
}

export default RequireAuth;