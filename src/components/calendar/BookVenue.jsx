import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useToken } from '../../stores/useUserStore';
import apiBookingClient from '../../api/apiBookingClient';
import { useParams } from 'react-router-dom';

const BookNewVenue = () => {
    const token = useToken();
    const { id } = useParams();
    console.log(token)

  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [guests, setGuests] = useState(1);

  const handleDateFromChange = date => {
    setDateFrom(date);
  };

  const handleDateToChange = date => {
    setDateTo(date);
  };

  const handleNumGuestsChange = event => {
    setGuests(parseFloat(event.target.value));
  };


  const handleBookingSubmit = async () => {
    const bookingData = {
      dateFrom: dateFrom,
      dateTo: dateTo,
      guests: guests,
      venueId: id,
    };

    try {
      const data = await apiBookingClient.createNewBooking(bookingData, token);
      console.log('Booking created:', data);
      // Optionally, you can add logic here to handle success cases
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };


  return (
    <div>
      <h2>Make a Booking</h2>
      <div>
        <label>Date From:</label>
        <Calendar onChange={handleDateFromChange} value={dateFrom} />
      </div>
      <div>
        <label>Date To:</label>
        <Calendar onChange={handleDateToChange} value={dateTo} />
      </div>
      <div>
        <label>Number of Guests:</label>
        <input type="number" value={guests} onChange={handleNumGuestsChange} />
      </div>
      <button onClick={handleBookingSubmit}>Book Now</button>
    </div>
  );
};

export default BookNewVenue;
