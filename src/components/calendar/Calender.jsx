import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import apiBookingClient from '../../api/apiBookingClient';
import { useToken } from '../../stores/useUserStore';

const BookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookings, setBookings] = useState({}); 

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchBookingsForDate(date);
  };

  const fetchBookingsForDate = (date) => {
    console.log(date); 
  };

  return (
    <div>
      <h1>Booking Calendar</h1>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileContent={({ date, view }) =>
          bookings[date.toISOString()] && view === 'month' ? (
            <p>Booked</p>
          ) : null
        }
      />
    </div>
  );
};

export default BookingCalendar;
