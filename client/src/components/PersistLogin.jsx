import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } 
      catch (err){
        console.log(err.response);
      } 
      finally {
        isMounted && setIsLoading(false);
      }
    }

    !auth?.token ? verifyRefreshToken() : setIsLoading(false);

    return () => isMounted = false;
  }, [])

  return (
    <>
      {!persist
        ? <Outlet />
        : isLoading
          ? <Loader />
          : <Outlet />
      }
    </>
  )
};

export default PersistLogin;