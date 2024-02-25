import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useToken } from '../../stores/useUserStore';
import apiBookingClient from '../../api/apiBookingClient';
import { useParams } from 'react-router-dom';

const BookNewVenue = () => {
    const token = useToken();
    const { id } = useParams();

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
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };


  return (
    <div className='booking-box flex flex-col pb-10 pl-10 pr-10 gap-5'>
      <h2 className='text-white text-center'>Make a Booking</h2>
      <div className='flex justify-evenly'>
        <div>
          <label className='text-white'>Date From:</label>
          <Calendar onChange={handleDateFromChange} value={dateFrom} />
        </div>
        <div>
          <label className='text-white'>Date To:</label>
          <Calendar onChange={handleDateToChange} value={dateTo} />
        </div>
      </div>
      <div className='text-center w-2/5'>
        <label className='text-white'>Number of Guests: (1-10)</label>
        <input type="number" value={guests} onChange={handleNumGuestsChange} className='input-field' max="10" />
      </div>
      <button onClick={handleBookingSubmit} className='light-button'>Book Now</button>
    </div>
  );
};

export default BookNewVenue;
