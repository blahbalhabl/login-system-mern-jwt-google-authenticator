import { createContext, useState } from 'react'

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const contextData = {
    auth: auth,
    setAuth: setAuth
  };

  return (
    <AuthContext.Provider value={contextData}>
        {children}
    </AuthContext.Provider>
  )
};

export default AuthContext;