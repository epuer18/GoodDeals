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
          <Link to="/myaccount">Created Deals</Link>
          {/* Other menu items */}
        </div>
      )}
    </div>
  );
};