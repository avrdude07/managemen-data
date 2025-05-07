import { createContext, useContext, useEffect, useState } from "react";

const AuthContex = createContext();

export default function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(() =>
    localStorage.getItem("accessToken")
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("accessToken");
    if (storedUser !== authUser) {
      setAuthUser(storedUser);
    }
  }, [authUser]);

  const saveToken = (token) => {
    localStorage.setItem("accessToken", token);
    setAuthUser(token);
  };

  const deleteToken = () => {
    localStorage.removeItem("accessToken");
    setAuthUser(null);
  };

  return (
    <AuthContex.Provider value={{ authUser, saveToken, deleteToken }}>
      {children}
    </AuthContex.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContex);
}
