import { createContext, useState, useEffect } from 'react';
import { AppConstants } from '../Util/constants';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const BACKEND_URL = AppConstants.BACKEND_API_BASE_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [cart, setCart] = useState({});
    const [loading, setLoading] = useState(true); // Add loading state

    // Load user data from localStorage on app start
    useEffect(() => {
        const loadUserData = () => {
            try {
                const token = localStorage.getItem('token');
                const user = localStorage.getItem('user');
                
                console.log('Loading user data from localStorage:', { token, user });

                if (token && user) {
                    try {
                        const parsedUser = JSON.parse(user);
                        setIsLoggedIn(true);
                        setUserData({
                            ...parsedUser,
                            token: token
                        });
                        console.log('User data loaded successfully:', parsedUser);
                    } catch (parseError) {
                        console.error('Error parsing user data:', parseError);
                        // Clear invalid data
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                    }
                } else {
                    console.log('No user data found in localStorage');
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, []);

    // Cart functions
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

    const clearCart = () => {
        setCart({});
        localStorage.removeItem('cart');
    };

    const cartCount = Object.values(cart).reduce(
        (total, qty) => total + qty,
        0,
    );

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUserData(null);
        setCart({});
    };

    const contextValue = {
        BACKEND_URL,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        isEmailVerified,
        setIsEmailVerified,
        cart,
        setCart,
        addToCart,
        removeFromCart,
        deleteFromCart,
        clearCart,
        cartCount,
        logout,
        loading // Add loading state
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};