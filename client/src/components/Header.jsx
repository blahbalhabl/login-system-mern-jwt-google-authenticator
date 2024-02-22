import { Link } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth'
import useLogout from '../hooks/useLogout';

const Header = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const logout = useLogout();

  return (
    <>
    {auth && (
      <div className="sticky top-0 w-full">
        <header className="flex justify-between items-center bg-blue-600 text-white p-5">
          <h1 className="text-2xl font-semibold">Auth App</h1>
          <nav>
            <span className="flex gap-5">
              {/* <Link
                className='hover:underline'
                to='/auth/login'>
                  Login
              </Link>
              <Link
                className='hover:underline'
                to='/auth/register'>
                  Sign Up
              </Link> */}
              <button onClick={logout}>Logout</button>
            </span>
          </nav>
        </header>
      </div>
     )}
    </>
  )
}

export default Header