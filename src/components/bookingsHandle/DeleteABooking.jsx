import React from 'react';
import apiBookingClient from '../../api/apiBookingClient';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../stores/useUserStore';

function DeleteButton({ bookingId, token }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
        const response = await apiBookingClient.deleteBookingByID(bookingId, token);
        if (response.ok) {
            navigate(0, { replace: true });
        }

        } catch (error) {
        console.error('Error deleting venue:', error);
        }
    };

    return (
        <button onClick={handleDelete} className='delete-button'>Delete booking</button>
    );
}
export default DeleteButton;