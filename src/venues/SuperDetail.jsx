import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiVenueClient from "../api/apiVenueClient";
import useOwner from "../api/auth/checkOwner";
import { useToken } from "../stores/useUserStore";
import DeleteButton from "../components/venueHandle/DeleteButton";
import ShowUpcomingBookingsOnVenue from "../components/bookingsHandle/ShowUpcomingBookingsOnVenue";
import BookingCalendar from "../components/calendar/Calender";
import BookNewVenue from "../components/calendar/BookVenue";

const VenueDetails = () => {
    const [singleVenue, setSingleVenue] = useState([]);
    const { id } = useParams();
    const token = useToken();
  
    useEffect(() => {
      const fetchVenue = async () => {
        try {
          const venueData = await apiVenueClient.getVenueById(id);
          setSingleVenue(venueData);
          console.log(venueData);
        } catch (error) {
          console.error('Error fetching venue:', error);
        }
      };
  
      fetchVenue();
      console.log(singleVenue)
    }, [id]);

    // const { location } = singleVenue;
    // const { address, city, country, lat, lng, zip } = location;

    if (singleVenue.media < 1) {
      singleVenue.media = "https://placehold.co/600x400";
    }

    const ownerName = singleVenue.owner?.name;
    const isOwner = useOwner(ownerName);
  
    return (
      <div>
        <Link to="/browse"> Go back </Link>
        <div className="venue-page">
          <h1 className="text-center">{singleVenue.name}</h1>
          <div className="">
            <img src={singleVenue.media} alt={singleVenue.name} className=""/>
          </div>
          <div className="flex flex-col gap-10">
            <div className="p-5 info-box">
              <h4>About {singleVenue.name}</h4>
              <p>{singleVenue.description}</p>
            </div>
            <div className="flex flex-row justify-between">
              <div className="w-2/5 info-box">
                <h3>Facilities</h3>
                <ul className="list-disc pl-5">
                  <li>Wifi:</li>
                  <li>Parking:</li>
                  <li>Pets:</li>
                  <li>Breakfast:</li>
                </ul>
              </div>
              <div className="p-5 w-2/5 info-box">
                <h3>Location</h3>
                {/* <p>{location.address}</p> */}
              </div>
            </div>
          </div>
          
        </div>
        {!isOwner ? (
          <div>
            <BookNewVenue />
          </div>
        ) : (
          <div>
            <Link to={`/venues/${id}/edit`}>
              <button className="button">Edit</button>
            </Link>
            <Link to={`/venues/${id}/`}>
              <button className="button">Handle bookings</button>
            </Link>
            <DeleteButton venueIdToDelete={id} token={token} />
            <div>
              <h3>Upcoming bookings:</h3>
              <div>
                {singleVenue.bookings.map((booking, index) => (
                <ShowUpcomingBookingsOnVenue key={index} bookings={booking} />
                ))}
              </div>
              
            </div>
          </div>
          )}
      </div>
    );
  };
  
  export default VenueDetails;