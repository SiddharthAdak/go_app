type signupData = {
    "username": string,
    "password": string,
    "confirm_password": string,
}
type loginData = {
    "username": string,
    "password": string,
}
const BASE_URL = import.meta.env.VITE_BASE_URL
const userApi = `${BASE_URL}/auth`;
export const signupApi = async (userData: signupData) => {
    try {
        const response = await fetch(`${userApi}/signup`, {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify(userData),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        
        if (response.ok) {
            const data = await response.json();
            return {data, error: null};
        }
        else{
            const data = await response.text();
            throw new Error(data);
        }
    } 
    catch (error) {
        if (error instanceof Error) {
            // ✅ TypeScript knows err is Error
            console.log(error.message);
            return {data: null, error: error.message};
          } else {
            console.log('Unexpected error', error);
            return {data: null, error: 'Unexpected error'};
          }

    }
}
export const loginApi = async (userData: loginData) => {
    try {
        const response = await fetch(`${userApi}/login`, {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify(userData),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                
            }
        })
        
        if (response.ok) {
            const data = await response.json();
            return {data, error: null};
        }
        else{
            const data = await response.text();
            console.log(data);
            throw new Error(data);
        }
        
        
        
    } 
    catch (error) {
        if (error instanceof Error) {
            // ✅ TypeScript knows error is Error
            return {data: null, error: error.message};
        }
        else {
            return {data: null, error: 'Unexpected error'};
        }

    }
}
export const checkUserApi = async () => {
    try {
        const response = await fetch(`${userApi}/check`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                
            }
        })
        
        if (response.ok) {
            const data = await response.json();
            return {data, error: null};
        }
        else{
            const data = await response.text();
            console.log(data);
            throw new Error(data);
        }
        
        
        
    } 
    catch (error) {
        if (error instanceof Error) {
            // ✅ TypeScript knows error is Error
            return {data: null, error: error.message};
        }
        else {
            return {data: null, error: 'Unexpected error'};
        }

    }
}

export const logoutApi = async () => {
    try {
        const response = await fetch(`${userApi}/logout`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        
        if (response.ok) {
            const data = await response.json();
            return {data, error: null};
        }
        else{
            const data = await response.text();
            console.log(data);
            throw new Error(data);
        }
    } 
    catch (error) {
        if (error instanceof Error) {
            // ✅ TypeScript knows error is Error
            return {data: null, error: error.message};
        }
        else {
            return {data: null, error: 'Unexpected error'};
        }

    }
}
