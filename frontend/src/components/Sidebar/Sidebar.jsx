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
        {['waterfall', 'dam', 'hillstation', 'view point', 'lake', 'caves'].map((category) => (
          <li key={category} className="sidebar-lists">
            <label>
              <input
                type="checkbox"
                onChange={() => handleCategoryChange(category)}
                className="sidebar-checkbox"
              />
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </label>
          </li>
        ))}
      </ul>

      <h5>Filter by Ratings</h5>
      <ul className="sidebar-list">
        {[5, 4, 3, 2, 1].map((rating) => (
          <li key={rating} className="sidebar-lists">
            <label>
              <input
                type="checkbox"
                onChange={() => handleRatingChange(rating)}
                className="sidebar-checkbox"
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
