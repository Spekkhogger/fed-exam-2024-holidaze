import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiVenueClient from "../api/apiVenueClient";

const VenueDetails = () => {
    const [singleVenue, setSingleVenue] = useState([]);
    const { id } = useParams();
  
    useEffect(() => {
      const fetchVenue = async () => {
        try {
          const venueData = await apiVenueClient.getVenueById(id);
          setSingleVenue(venueData);
        } catch (error) {
          console.error('Error fetching venue:', error);
        }
      };
  
      fetchVenue();
      console.log(singleVenue)
    }, [id]);
  
    return (
      <div>
        <Link to="/browse"> Go back </Link>
        <h1>{singleVenue.name}</h1>
        <img src={singleVenue.media} alt={singleVenue.name} />
        <p>{singleVenue.description}</p>
        <button className="button">Book</button>
      </div>
    );
  };
  
  export default VenueDetails;