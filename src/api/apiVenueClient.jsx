import { api_base } from "./apiURL";
import { useToken } from "../stores/useUserStore";

const apiVenueClient = {
    // Fetch all venues
    getAllVenues: async () => {
        try {
            const response = await fetch(`${api_base}venues?_owner=true&_bookings=true`, {
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
            const response = await fetch(`${api_base}venues/${id}?_owner=true&_bookings=true`, {
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
    postNewVenue: async (data, token) => {
        try {
            const response = await fetch(`${api_base}venues`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
        });
        return response.json(); 
        } catch (error) {
            console.log(error); 
        }
    },

    // Edit venue if admin 
    editVenue: async(data, id, token) => {
        try {
            const response = await fetch(`${api_base}venues/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            return response.json(); 
        } catch (error) {
            console.log(error); 
        }
    },

    // Delete venue if admin 
    deleteVenue: async (id, token) => {
        try {
            const response = await fetch(`${api_base}venues/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.json(); 
        } catch (error) {
            console.log(error); 
        }
    }
}

export default apiVenueClient; 