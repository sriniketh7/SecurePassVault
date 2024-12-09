import React, { useEffect, useState, useContext } from "react";
import axios from "../axiosInstance";
import { AuthContext } from "./AuthContext";
import { Link } from "react-router-dom";
import "../UpdatePassword.css"; 

const UpdatePassword = () => {
  const { authState } = useContext(AuthContext);
  const [application, setApplication] = useState("");
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    if (!authState.isLoggedIn) {
      setIsAuthorized(false);
    }
  }, [authState.isLoggedIn]);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!isAuthorized) return;

    setLoading(true);
    setMessage("");
    setError("");
    const token = sessionStorage.getItem("AuthToken");
    try {
      const response = await axios.put(
        `passwords/update-password`,
        {
          application,
          username,
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Update password response:", response.data);

      setMessage("Password updated successfully!");
      setApplication("");
      setUsername("");
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to update password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="container access-denied-container">
        <h2 className="access-denied-title">Access Denied</h2>
        <p className="access-denied-message">
          You need to be logged in to update your password.
        </p>
        <p className="access-denied-redirect">
          Please go to the{" "}
          <Link to="/login" className="access-denied-link">
            login page
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="update-password-container">
      <h2 className="form-title">Update Password</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleUpdatePassword} className="update-password-form">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Application Name"
            value={application}
            onChange={(e) => setApplication(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className={`btn ${loading ? "btn-loading" : "btn-primary"}`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
