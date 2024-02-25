import { Link } from "react-router-dom";

const ShowUpcomingBookingsOnVenue = (bookings) => {
    return (
        <div className="bookingsVenue">
            <div className="card">
                <h3>{bookings.created}</h3>
                <p>Booking is for: {bookings.guests}</p>
            </div>
        </div>
    );
  };
  
  export default ShowUpcomingBookingsOnVenue;