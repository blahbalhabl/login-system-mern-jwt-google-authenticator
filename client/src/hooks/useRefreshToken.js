// Desc: Custom hook to refresh the token
import axios from '../api/axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const res = await axios.post('/auth/refresh');
      setAuth(prev => {
        return {
          ...prev,
          id: res.data.user.id,
          username: res.data.user.username,
          email: res.data.user.email,
          token: res.data.token,
        }
      });
      return res.data.token;
    } catch (err) {
      // setAuth(null);
      // TODO: return a message to pop up a modal that says "Session Expired"
    }
  }
  return refresh;
}

export default useRefreshToken;