import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(true);
  useEffect(() => {
    const token = sessionStorage.getItem("AuthToken");
    if (!token) {
      setIsAuthorized(false);
    } else {
      setUserName(sessionStorage.getItem("userName") || "User");
    }
  }, []);

  if (!isAuthorized) {
    return (
      <div className="dashboard-container">
        <div className="overlay"></div>
        <h1 className="dashboard-title">Access Denied</h1>
        <p className="dashboard-subtitle">
          You need to be logged in to access the dashboard.
        </p>
        <Link to="/login" className="dashboard-btn">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="overlay"></div>
      <h1 className="dashboard-title">Welcome, {userName}!</h1>
      <p className="dashboard-subtitle">
        Manage your passwords securely and easily
      </p>

      <div className="dashboard-buttons">
        <Link to="/my-passwords" className="dashboard-btn">
          My Passwords
        </Link>
        <Link to="/add-password" className="dashboard-btn">
          Add Password
        </Link>
        <Link to="/update-password" className="dashboard-btn">
          Update Password
        </Link>
        <Link to="/check-password-strength" className="dashboard-btn">
          Check Password Strength
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
