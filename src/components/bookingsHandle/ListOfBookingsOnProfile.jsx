import { Link } from "react-router-dom";
import DeleteButton from "./DeleteABooking";
import { useToken } from "../../stores/useUserStore";

const ListOfBookingsOnProfile = ({ bookings }) => {
    const newDateFrom = bookings.dateFrom.split('T')[0];
    const newDateTo = bookings.dateTo.split('T')[0];
    const token = useToken();

    return (
        <div className="booking-list">
            <div className="card flex flex-col gap-2 justify-center">
                <Link to={`/venues/${bookings.venue.id}`}>
                    <h3>{bookings.venue.name}</h3>
                    <img src={`${bookings.venue.media}`} alt={`${bookings.venue.name}`}/>
                </Link>
                <p>From date: {newDateFrom}</p>
                <p>To date: {newDateTo}</p>
                <p>Booking is for: {bookings.guests} people</p>
                <div className="flex flex-col gap-2 items-center">
                    <Link to={`/venues/${bookings.venue.id}`} className="button">
                        View Venue
                    </Link>
                    <Link to={`/venues/${bookings.venue.id}`} className="button">
                        Edit booking
                    </Link>
                    <DeleteButton bookingId={bookings.id} token={token} />
                </div>
            </div>
        </div>
    );
  };
  
  export default ListOfBookingsOnProfile;