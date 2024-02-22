import { useState } from "react";
import { loginApi, logoutApi, signupApi } from "../api/auth";

export const useSignup = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const signup = async(username: string, password: string, confirm_password: string) => {
        
        setLoading(true);
        const {data, error} = await signupApi({
            "username": username,
            "password": password,
            "confirm_password": confirm_password,
        });
        console.log(data);
        console.log(error);
        
        
        if (!error) {
            setError("");
            setLoading(false);
            return data;
        }
        else{
            setError(error);
            setLoading(false);
        }
    }
    return {signup, loading, error};
}
export const useLogin = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const login = async(username: string, password: string) => {
        setLoading(true);
        const {data, error} = await loginApi({
            "username": username,
            "password": password,
        });
        console.log(data);
        console.log(error);
        
        
        if (!error) {
            setError("");
            setLoading(false);
            return data;
        }
        else{
            setError(error);
            setLoading(false);
        }
    }
    return {login, loading, error};
}
export const useLogout = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const logout = async() => {
        setLoading(true);
        const {data, error} = await logoutApi();
        // console.log(data);
        // console.log(error);
        
        
        if (!error) {
            setError("");
            setLoading(false);
            return data;
        }
        else{
            setError(error);
            setLoading(false);
            return null;
        }
    }
    return {logout, loading, error};
}