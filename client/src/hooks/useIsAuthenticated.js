import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const useIsAuthenticated = () => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();
  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from.pathname || '/';

  const isLoggedIn = async () => {
    try {
      await refresh();
      if (auth) nav(from, { replace: true });
      return !!auth;
    } catch (err) {
      throw new Error(err);
    }
  };
  return isLoggedIn;
};

export default useIsAuthenticated;