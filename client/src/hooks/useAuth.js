import { useContext } from "react"
import AuthContext from "../context/AuthContext"

const useAuth = () => {
  const { auth, setAuth, persist } = useContext(AuthContext);

  const setAuthData = (data) => {
    setAuth(data);
  }

  return { 
    auth, 
		setAuth: setAuthData, 
		persist,
	};
};

export default useAuth; 

