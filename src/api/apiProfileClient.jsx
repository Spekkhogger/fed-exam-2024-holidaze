import { api_base } from "./apiURL";

const apiProfileClient = {
    // POST edit to API
    editProfile: async (data, token) => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
            method: 'PUT',
            body: JSON.stringify(data),
        };
        try {
            const response = fetch()
        } catch (error) {
            console.error(error);
        }
    }
}