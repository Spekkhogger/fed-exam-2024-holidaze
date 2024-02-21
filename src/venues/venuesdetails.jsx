import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiVenueClient from "../api/apiVenueClient";
import useOwner from "../api/auth/checkOwner";
import { useToken } from "../stores/useUserStore";
import DeleteButton from "../components/venueHandle/DeleteButton";

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

    const { location } = singleVenue;
    const { address, city, country, lat, lng, zip } = location;

    const ownerName = singleVenue.owner?.name;
    const isOwner = useOwner(ownerName);
  
    return (
      <div>
        <Link to="/browse"> Go back </Link>
        <div className="venue-page">
          <h1>{singleVenue.name}</h1>
          <div className="venue-image-wrap">
            <img src={singleVenue.media} alt={singleVenue.name} className="venue-image"/>
          </div>
          <div className="venue-info flex flex-row">
            <div className="venue-description">
              <p>{singleVenue.description}</p>
              <ul>
                <li>Wifi:</li>
                <li>Parking:</li>
                <li>Pets:</li>
                <li>Breakfast:</li>
              </ul>
            </div>
            <div className="venue-location">
              <h3>Location</h3>
              <p>{city}</p>
              <p>{city}</p>
              <p>{city}</p>
            </div>
          </div>
          
        </div>
        {!isOwner ? (
          <button className="button">Book</button>
        ) : (
          <div>
            <Link to={`/venues/${id}/edit`}>
              <button className="button">Edit</button>
            </Link>
            <Link to={`/venues/${id}/`}>
              <button className="button">Handle bookings</button>
            </Link>
            <DeleteButton venueIdToDelete={id} token={token} />
          </div>
          )}
      </div>
    );
  };
  
  export default VenueDetails;