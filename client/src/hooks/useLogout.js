import useAxiosPrivate from './useAxiosPrivate';
import useAuth from './useAuth';

const useLogout = () => {
 const { setAuth } = useAuth();
 const axiosPrivate = useAxiosPrivate();

 const Logout = async () => {
  try {
    await axiosPrivate.get('/auth/logout')
      .then(() => {
        setAuth(null);
      });
  } catch (err) {
    throw new Error(err);
  }
 };
 return Logout;
};

export default useLogout;