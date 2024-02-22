import axios from '../api/axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const res = await axios.post('/refresh');
		
    setAuth({
        ...prev,
        id: res.data.id,
        username: res.data.username,
        email: res.data.email,
    });
    return res.data.token;
  }
  return refresh;
}

export default useRefreshToken;