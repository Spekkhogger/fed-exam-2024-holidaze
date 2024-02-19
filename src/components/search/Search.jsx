import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from 'react-hook-form';

import apiVenueClient from "../../api/apiVenueClient";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


const SearchForm = () => {
    const [searchText, setSearchText] = useState('');
    const [selectValue, setSelectValue] = useState('1');
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await apiVenueClient.getAllVenues();
            const data = await response.json();
            setSearchResults(data);
            console.log(searchResults)
          } catch (error) {
            console.error('Error fetching venues:', error);
          }
        };
        fetchData();  
      }, []);
  

    const handleSearch = () => {
        let filteredResults = searchResults.filter(item => {
        //   Search criteria 
          let isMatch = true;
          if (searchText && !item.name.toLowerCase().includes(searchText.toLowerCase())) {
            isMatch = false;
          }
          if (selectValue && item.category !== selectValue) {
            isMatch = false;
          }
          if (dateFrom && new Date(item.date) < dateFrom) {
            isMatch = false;
          }
          if (dateTo && new Date(item.date) > dateTo) {
            isMatch = false;
          }
          return isMatch;
        });
        setSearchResults(filteredResults);
      };

    const handleTextChange = (event) => {
        setSearchText(event.target.value);
      };
    
      const handleSelectChange = (event) => {
        setSelectValue(event.target.value);
      };
    
      const handleDateFromChange = (date) => {
        setDateFrom(date);
      };
    
      const handleDateToChange = (date) => {
        setDateTo(date);
      };

    return (
        <div>
                <form className="">
                    <input type="text" value={searchText} onChange={handleTextChange} />
                    <select value={selectValue} onChange={handleSelectChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </select>
                    <DatePicker
                        selected={dateFrom}
                        onChange={handleDateFromChange}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select a date from"
                    />
                    <DatePicker
                        selected={dateTo}
                        onChange={handleDateToChange}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select a date to"
                    />
                    <button type="button" onClick={handleSearch}>
                        Search
                    </button>
                    {/* Display search results */}
                    <div>
                        {searchResults.map((result, index) => (
                        <div key={index}>{result}</div>
                        ))}
                    </div>
            </form>
        </div>
    )
}

export default SearchForm;