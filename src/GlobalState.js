import { createContext, useEffect, useState } from "react";
import ProductAPI from "./api/ProductAPI";
import axios from "axios";
import UserAPI from "./api/UserAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  const refreshToken = async () => {
    try {
      const res = await axios.post('https://my-ecom-back-13.onrender.com/user/refresh_token', {}, {
        withCredentials: true ,// Ensure cookies are sent with the request if needed
      });
      setToken(res.data.accesstoken);
      console.log('Token refreshed:', res.data.accesstoken);
    } catch (err) {
      console.error('Error refreshing token:', err);
    }
  };

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) refreshToken();
  }, []); // Add an empty dependency array to run effect only once

  const state = {
    token: [token, setToken],
    productAPI: ProductAPI(),
    userAPI: UserAPI(token)
  };

  return (
    <GlobalState.Provider value={state}>
      {children}
    </GlobalState.Provider>
  );
};


