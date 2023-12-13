import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export function MyAccountButton() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="btn btn-primary">
        My Account
      </button>
      {showDropdown && (
        <div className="dropdown-content">
          <Link to="/usercreated">My Posted Deals</Link>
          <Link to="/userliked">My Liked Deals</Link>
        </div>
      )}
    </div>
  );
}
