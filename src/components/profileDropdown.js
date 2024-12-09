import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({ userName }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="profile-dropdown">
      <button
        onClick={toggleDropdown}
        className="btn btn-secondary dropdown-toggle"
      >
        {userName} {/* Display the user's name */}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-item">Profile</div>{" "}
          {/* Placeholder for Profile */}
          <div className="dropdown-item" onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
