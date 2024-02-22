import useAxiosPrivate from './useAxiosPrivate';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
 const { setAuth } = useAuth();
 const axiosPrivate = useAxiosPrivate();
 const nav = useNavigate();

 const Logout = async () => {
  try {
    await axiosPrivate.get('/auth/logout')
      .then(() => {
        setAuth(null);
        nav('/auth/login', { replace: true });
      });
  } catch (err) {
    throw new Error(err);
  }
 };
 return Logout;
};

export default useLogout;