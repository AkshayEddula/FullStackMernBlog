import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate }  from 'react-router-dom'

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate()

    // token handling
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            axios.get('http://localhost:5000/verifyToken', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(res => {
                if (res.status === 200) {
                    setIsAuthenticated(true);
                    setUser(res.data.user._id);
                }
            })
            .catch(err => {
                console.log(err);
                setIsAuthenticated(false);
            });
        }
    }, []);

    const login = (token, userData) => {
        localStorage.setItem('accessToken', token);
        setIsAuthenticated(true);
        setUser(userData);
        console.log(userData)
    };

    const logout = () => {
        axios.get('http://localhost:5000/logout')
            .then(() => {
                localStorage.removeItem('accessToken');
                setIsAuthenticated(false);
                setUser(null);
                navigate('/login');
            })
            .catch(err => console.log(err));
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login,  logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
