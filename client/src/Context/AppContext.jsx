import { createContext } from 'react';
import { useState } from 'react';
import { AppConstants } from '../Util/constants';

export const AppContext = createContext();

 

export const AppProvider = ({ children }) => {

    const BACKEND_URL = AppConstants.BACKEND_API_BASE_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    const contextValue = {
        BACKEND_URL,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        isEmailVerified,
        setIsEmailVerified
    };

     return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
     )
     

}