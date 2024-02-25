import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiVenueClient from "../api/apiVenueClient";
import { get } from "react-hook-form";
import SearchFunction from "../components/search/Search";

const VenueList = () => {
    const [venues, setVenues] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const venuesData = await apiVenueClient.getAllVenues();
          setVenues(venuesData);
        } catch (error) {
          console.error('Error fetching venues:', error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div>
        <h1>Venues</h1>
        <SearchFunction data={venues} />
      </div>
    );
  };
  
  export default VenueList;