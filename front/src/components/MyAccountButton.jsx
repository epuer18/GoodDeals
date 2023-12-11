import React, { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';

export function MyAccountButton() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest('.dropdown')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', closeDropdown);
    return () => document.removeEventListener('mousedown', closeDropdown);
  }, []);

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="btn btn-primary">
        Me
      </button>
      {showDropdown && (
        <div className="dropdown-content">
          <Link to="/usercreated">Created Deals</Link>
          <Link to="/userliked">Liked Deals</Link>
        </div>
      )}
    </div>
  );
};