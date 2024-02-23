import { api_base } from "./apiURL";

// CLient for handling booking requests to the API 

const apiBookingClient = {
    // Get all bookings for a specific venue and show to manager 
    getBookings: async (venueId, token) => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
            method: 'GET',
            
        };
        try {
            const response = fetch(`${api_base}venues/${venueId}?_bookings=true`, options)
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },

    // User can create a new booking for a venue
    createNewBooking: async (date, token) => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
            method: 'POST',
            body: JSON.stringify(date),
            }
        try {
            const response = await fetch(`${api_base}bookings`, options);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Could not fetch profile:", error);
        }
    },

    // Get a specific booking by ID
     getBookingByID: async (bookingId, token) => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
            method: 'GET',
            
        };
        try {
            const response = fetch(`${api_base}bookings/${bookingId}`, options)
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },

    // Edit a specific booking by ID
    editBookingByID: async (date, bookingId, token) => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
            method: 'GET',
            body: JSON.stringify(date),
        };
        try {
            const response = fetch(`${api_base}bookings/${bookingId}`, options)
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },

    // Delete a specific booking by ID
    deleteBookingByID: async (bookingId, token) => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
            method: 'DELETE',
        };
        try {
            const response = fetch(`${api_base}bookings/${bookingId}`, options)
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default apiBookingClient;