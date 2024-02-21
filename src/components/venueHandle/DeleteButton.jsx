import React from 'react';
import apiVenueClient from '../../api/apiVenueClient';
import { useParams, useNavigate } from 'react-router-dom';
import { useToken } from '../../stores/useUserStore';

function DeleteButton({ venueIdToDelete, token }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
        const response = await apiVenueClient.deleteVenue(venueIdToDelete, token);
        console.log('Venue deleted successfully:', response);
        // After deletion navigate to browse page
        // navigate('/browse');
        } catch (error) {
        console.error('Error deleting venue:', error);
        }
    };

    return (
        <button onClick={handleDelete} className='delete-button'>Delete Venue</button>
    );
}
export default DeleteButton;