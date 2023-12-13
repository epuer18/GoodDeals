import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export function MyAccountButton() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setShowDropdown(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [dropdownRef]);

  // useEffect(() => {
  //   const handleEscapeKey = (event) => {
  //     if (event.key === "Escape") {
  //       setShowDropdown(false);
  //     }
  //   };
  //   document.addEventListener("keydown", handleEscapeKey);
  //   return () => document.removeEventListener("keydown", handleEscapeKey);
  // }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="btn btn-primary">
        My Account
      </button>
      {showDropdown && (
        <div className="dropdown-content">
          <Link to="/usercreated">Posted Deals</Link>
          <Link to="/userliked">Liked Deals</Link>
        </div>
      )}
    </div>
  );
}
