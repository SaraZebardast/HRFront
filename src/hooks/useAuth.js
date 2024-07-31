import {useState, useEffect} from 'react';

const useAuth = (timeout = 1200000) => { // 20 minutes in milliseconds
    const [auth, setAuth] = useState(() => {
        const storedAuth = localStorage.getItem('auth');
        return storedAuth ? JSON.parse(storedAuth) : {isAuthenticated: false, userRole: null};
    });

    useEffect(() => {
        let timer;
        if (auth.isAuthenticated) {
            localStorage.setItem('auth', JSON.stringify(auth));
            timer = setTimeout(() => {
                setAuth({isAuthenticated: false, userRole: null});
                localStorage.removeItem('auth');
            }, timeout);
        } else {
            localStorage.removeItem('auth');
        }

        return () => clearTimeout(timer);
    }, [auth, timeout]);

    const login = (userRole) => {
        setAuth({isAuthenticated: true, userRole});
    };

    const logout = () => {
        setAuth({isAuthenticated: false, userRole: null});
    };

    return {auth, login, logout};
};

export default useAuth;
