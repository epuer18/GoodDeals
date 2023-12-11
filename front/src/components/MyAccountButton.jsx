import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function MyAccountButton() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="btn btn-primary">
        Me
      </button>
      {showDropdown && (
        <div className="dropdown-content">
          {/* <Link to="/usercreated">Created Deals</Link> */}
          <Link to="/userliked">Liked Deals</Link>
        </div>
      )}
    </div>
  );
};