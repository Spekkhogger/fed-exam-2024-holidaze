import { Link } from "react-router-dom";

const ListOfBookingsOnProfile = ({ bookings }) => {
    return (
        <div className="booking-list">
            <div className="card">
                
                <Link to={`/venues/${bookings.venue.id}`}>
                    <img src={`${bookings.venue.media}`} alt="" />
                </Link>
                <h3>{bookings.venue.name}</h3>
                <p>{bookings.dateFrom}</p>
                <p>{bookings.dateTo}</p>
                <p>Booking is for: {bookings.guests}</p>
                <Link to={`/venues/${bookings.venue.id}`} className="button">
                    View Venue
                </Link>
                <Link to={`/venues/${bookings.venue.id}`} className="button">
                    Edit booking
                </Link>
                <button className="button delete-button">Delete booking</button>
            </div>
        </div>
    );
  };
  
  export default ListOfBookingsOnProfile;