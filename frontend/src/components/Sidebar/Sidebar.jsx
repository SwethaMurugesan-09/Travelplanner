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
      <h3>Filter by Categories</h3>
      <ul className="sidebar-list">
        <li>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCategoryChange('waterfall')}
            />
            Waterfalls
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCategoryChange('dam')}
            />
            Dams
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCategoryChange('hillstation')}
            />
            Hill Stations
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCategoryChange('view point')}
            />
            View Points
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCategoryChange('lake')}
            />
            Lakes
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCategoryChange('caves')}
            />
            Caves
          </label>
        </li>
      </ul>

      <h3>Filter by Ratings</h3>
      <ul className="sidebar-list">
        {[5, 4, 3, 2, 1].map((rating) => (
          <li key={rating}>
            <label>
              <input
                type="checkbox"
                onChange={() => handleRatingChange(rating)}
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
