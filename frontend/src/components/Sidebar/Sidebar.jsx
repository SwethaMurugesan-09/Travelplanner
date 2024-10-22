import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ filterPlaces }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  // Handle category checkbox change
  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
    filterPlaces(updatedCategories, selectedRatings); // Pass updated categories and ratings
  };

  // Handle rating checkbox change
  const handleRatingChange = (rating) => {
    const updatedRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter((r) => r !== rating)
      : [...selectedRatings, rating];

    setSelectedRatings(updatedRatings);
    filterPlaces(selectedCategories, updatedRatings); // Pass updated categories and ratings
  };

  return (
    <aside className="sidebar">
      <h5>Filter by Categories</h5>
      <ul className="sidebar-list">
        <li className='sidebar-lists'>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCategoryChange('waterfall')}
              className='sidebar-checkbox'
            />
            Waterfalls
          </label>
        </li>
        <li className='sidebar-lists'>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCategoryChange('dam')}
              className='sidebar-checkbox'
            />
            Dams
          </label>
        </li>
        <li className='sidebar-lists'>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCategoryChange('hillstation')}
              className='sidebar-checkbox'
            />
            Hill Stations
          </label>
        </li>
        <li className='sidebar-lists'>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCategoryChange('view point')}
              className='sidebar-checkbox'
            />
            View Points
          </label>
        </li>
        <li className='sidebar-lists'>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCategoryChange('lake')}
              className='sidebar-checkbox'
            />
            Lakes
          </label>
        </li>
        <li className='sidebar-lists'>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCategoryChange('caves')}
              className='sidebar-checkbox'
            />
            Caves
          </label>
        </li>
      </ul>

      <h5>Filter by Ratings</h5>
      <ul className="sidebar-list">
        {[5, 4, 3, 2, 1].map((rating) => (
          <li key={rating} className='sidebar-lists'>
            <label>
              <input
                type="checkbox"
                onChange={() => handleRatingChange(rating)}
                className='sidebar-checkbox'
              />
              {rating} Star{rating > 1 && 's'}
            </label>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
