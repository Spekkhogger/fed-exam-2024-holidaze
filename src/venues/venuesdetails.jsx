import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiVenueClient from "../api/apiVenueClient";
import useOwner from "../api/auth/checkOwner";

const VenueDetails = () => {
    const [singleVenue, setSingleVenue] = useState([]);
    const { id } = useParams();
  
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

    const ownerName = singleVenue.owner?.name;
    const isOwner = useOwner(ownerName);
  
    return (
      <div>
        <Link to="/browse"> Go back </Link>
        <h1>{singleVenue.name}</h1>
        <img src={singleVenue.media} alt={singleVenue.name} />
        <p>{singleVenue.description}</p>
        {!isOwner ? (
          <button className="button">Book</button>
        ) : (
          <Link to={`/venues/${id}/edit`}>
            <button className="button">Edit</button>
          </Link>)}
      </div>
    );
  };
  
  export default VenueDetails;