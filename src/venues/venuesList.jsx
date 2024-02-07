import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiVenueClient from "../api/apiVenueClient";
import { get } from "react-hook-form";

const VenueList = () => {
    const [venues, setVenues] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const venuesData = await apiVenueClient.getAllVenues();
          setVenues(venuesData);
          console.log(venuesData)
        } catch (error) {
          console.error('Error fetching venues:', error);
        }
      };
  
      fetchData();
      
    }, []);
  
    return (
      <div>
        <h1>Venues</h1>
        <ul>
          {venues.map((venue) => (
            // Improve
            // Needs to link to the detailspage for each venue
            <li key={venue.id}>
                <Link to={`/venues/${venue.id}`} >{venue.name}</Link>
                
            </li> 
          ))}
        </ul>
      </div>
    );
  };
  
  export default VenueList;