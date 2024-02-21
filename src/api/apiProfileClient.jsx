import { api_base } from "./apiURL";

const apiProfileClient = {
    // Get profile by name from API
    getProfileByName: async (name, token) => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
            method: 'GET',
            }
        try {
            const response = await fetch(`${api_base}profiles/${name}?_bookings=true&_venues=true`, options);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Could not fetch profile:", error);
        }
    },

    // POST edit of profile to API
    editProfile: async (data, name, token) => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
            method: 'PUT',
            body: JSON.stringify(data),
        };
        try {
            const response = fetch(`${api_base}profiles/${name}`, options)
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default apiProfileClient;