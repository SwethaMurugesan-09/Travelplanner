import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ filterPlaces }) => {
  const [selectedCategories, setSelectedCategories] = useState({
    allPlaces: false,
    waterfall: false,
    dam: false,
    hillstation: false,
    viewpoint: false,
    lake: false,
    caves: false,
  });

  const handleCheckboxChange = (category) => {
    const updatedCategories = {
      ...selectedCategories,
      [category]: !selectedCategories[category],
    };
    setSelectedCategories(updatedCategories);

    // Collect selected categories
    const selected = Object.keys(updatedCategories).filter((key) => updatedCategories[key]);
    filterPlaces(selected);
  };

  return (
    <aside className="sidebar">
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <input
            type="checkbox"
            checked={selectedCategories.allPlaces}
            onChange={() => handleCheckboxChange('allPlaces')}
          />
          <label>All Places</label>
        </li>
        <li className="sidebar-item">
          <input
            type="checkbox"
            checked={selectedCategories.waterfall}
            onChange={() => handleCheckboxChange('waterfall')}
          />
          <label>Waterfalls</label>
        </li>
        <li className="sidebar-item">
          <input
            type="checkbox"
            checked={selectedCategories.dam}
            onChange={() => handleCheckboxChange('dam')}
          />
          <label>Dams</label>
        </li>
        <li className="sidebar-item">
          <input
            type="checkbox"
            checked={selectedCategories.hillstation}
            onChange={() => handleCheckboxChange('hillstation')}
          />
          <label>Hill Stations</label>
        </li>
        <li className="sidebar-item">
          <input
            type="checkbox"
            checked={selectedCategories.viewpoint}
            onChange={() => handleCheckboxChange('viewpoint')}
          />
          <label>View Points</label>
        </li>
        <li className="sidebar-item">
          <input
            type="checkbox"
            checked={selectedCategories.lake}
            onChange={() => handleCheckboxChange('lake')}
          />
          <label>Lakes</label>
        </li>
        <li className="sidebar-item">
          <input
            type="checkbox"
            checked={selectedCategories.caves}
            onChange={() => handleCheckboxChange('caves')}
          />
          <label>Caves</label>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
