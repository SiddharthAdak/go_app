const BASE_URL = import.meta.env.VITE_BASE_URL
const gameApi = `${BASE_URL}/api`;
export const updateScoreApi = async (userData: {username: string}) => {
    try {
        const response = await fetch(`${gameApi}/score`, {
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
export const getScoresApi = async () => {
    try {
        const response = await fetch(`${gameApi}/scores`, {
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

