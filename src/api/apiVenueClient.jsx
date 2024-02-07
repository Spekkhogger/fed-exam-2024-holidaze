import { api_base } from "./apiURL";

const apiVenueClient = {
    // Fetch all venues
    getAllVenues: async () => {
        try {
            const response = await fetch(`${api_base}venues`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.json(); 
        } catch (error) {
            console.log(error); 
        }
    },

    // Fetch venue by id 
    getVenueById: async (id) => {
        try {
            const response = await fetch(`${api_base}venues/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.json();

        } catch (error) {
            console.log(error); 
        }
    },
    // Post new venue if admin
    // Edit venue if admin 
    // Delete venue if admin 
}

export default apiVenueClient; 