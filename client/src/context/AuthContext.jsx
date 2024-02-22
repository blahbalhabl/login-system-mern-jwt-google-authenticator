/**
 * @param {object} auth - The auth object
 * @param {boolean} persist - If true, the user will be logged in even after the page is refreshed
 */

import { createContext, useState } from 'react'

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [persist] = useState(true);

  const contextData = {
    auth: auth,
    setAuth: setAuth,
    persist: persist,
  };

  return (
    <AuthContext.Provider value={contextData}>
        {children}
    </AuthContext.Provider>
  )
};

export default AuthContext;