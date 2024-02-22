import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useLogout from '../hooks/useLogout';

const Header = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const loc = useLocation().pathname;
  const [location, setLocation] = useState(false);

  useEffect(() => {
    // Check if the user is on the profile page
    const checkCurrentLocation = () => {
      if (loc.includes('/profile')) {
        setLocation(true);
      } else {
        setLocation(false);
      }
    };
    checkCurrentLocation();
  }, [loc]);

  return (
    <>
    {auth && (
      <div className="sticky top-0 w-full">
        <header className="flex justify-between items-center bg-blue-600 text-white p-5">
          <h1 className="text-2xl font-semibold">Auth App</h1>
          <nav>
            <span className="flex gap-5">
              <Link
                className='hover:underline'
                to={location ? '/' : `/profile/${auth?.username}`}>
                  {location ? 'Dashboard' : 'Profile'}
              </Link>
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