import React, { useState } from 'react';

const SearchFunction = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    parking: false,
    pets: false,
    wifi: false,
    breakfast: false
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: checked
    }));
  };

  const filteredData = data.filter(item => {
    // Check if item includes search term
    const includesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());

    // Check if all selected filters are true for the item
    const allFiltersPass = Object.keys(filters).every(key => {
      return !filters[key] || item[key];
    });

    return includesSearchTerm && allFiltersPass;
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className='input-field'
      />
      <div>
        <label>
          <input
            type="checkbox"
            name="parking"
            checked={filters.parking}
            onChange={handleCheckboxChange}
          />
          Parking
        </label>
        <label>
          <input
            type="checkbox"
            name="pets"
            checked={filters.pets}
            onChange={handleCheckboxChange}
          />
          Pets
        </label>
        <label>
          <input
            type="checkbox"
            name="wifi"
            checked={filters.wifi}
            onChange={handleCheckboxChange}
          />
          Wifi
        </label>
        <label>
          <input
            type="checkbox"
            name="breakfast"
            checked={filters.breakfast}
            onChange={handleCheckboxChange}
          />
          Breakfast
        </label>
      </div>
      <ul>
        {filteredData.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchFunction;
