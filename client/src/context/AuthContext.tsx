import  { createContext, useState, useEffect, useContext, Children } from 'react';
import type { ReactNode } from 'react';
import API from '../services/api.js';

interface User{
    _id:string;
    name:string;
    email:string;
}

interface AuthContextType{
    user : User | null;
    token : string | null;
    login : (token:string , userData:User) => void;
    logout : ()=> void;
    loading : boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children} : {children:ReactNode}) => {
    const [user ,setUser] = useState<User | null>(null);
    const [token , setToken] = useState<string | null>(null);
    const [loading , setLoading] = useState<boolean>(true);


    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if(storedToken && storedUser){
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }

        setLoading(false);
    } ,[])

    const login = (newToken:string, userData:User) => {
        localStorage.setItem('token' , newToken);
        localStorage.setItem('user' , JSON.stringify(userData));
        setToken(newToken);
        setUser(userData);
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{user, token, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );
}


export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}