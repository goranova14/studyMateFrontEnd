import { createContext, useState,useContext } from 'react';

export const AuthContext = createContext({});

 const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({loading: true, data: null});

    const setAuthData = (data) => {
        setAuth({data: data});
      };

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;