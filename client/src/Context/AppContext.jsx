import { createContext } from 'react';
import { useState } from 'react';
import { AppConstants } from '../Util/constants';
import { useEffect } from 'react';


export const AppContext = createContext();

 

export const AppProvider = ({ children }) => {

    const BACKEND_URL = AppConstants.BACKEND_API_BASE_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
     const [cart, setCart] = useState({}); 
   
  const addToCart = (itemId) => {
    if (!itemId) return;
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    if (!itemId) return;
    setCart((prev) => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) - 1),
    }));
  };

  const deleteFromCart = (itemId) => {
    if (!itemId) return;
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[itemId];
      return newCart;
    });
  };

  const cartCount = Object.values(cart).reduce(
    (total, qty) => total + qty,
    0,
  );


    const contextValue = {
        BACKEND_URL,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        isEmailVerified,
        setIsEmailVerified,
        cart,
        addToCart,
        removeFromCart,
        deleteFromCart,
        cartCount
    };



     return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
     )
     

}