import React from 'react';
import './Sidebar.css'; // Assuming you will create this CSS file

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar-list">
        <li className="sidebar-item">Waterfalls</li>
        <li className="sidebar-item">Dams</li>
        <li className="sidebar-item">Hill Stations</li>
        <li className="sidebar-item">View Points</li>
        <li className="sidebar-item">Ratings</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
