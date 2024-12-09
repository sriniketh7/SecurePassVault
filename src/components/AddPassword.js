import React, { useState, useContext } from "react";
import axios from "../axiosInstance";
import { AuthContext } from "./AuthContext";
import "../App.css";

const AddPassword = () => {
  const { authState } = useContext(AuthContext);
  const [application, setApplication] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!authState.isLoggedIn) {
    return (
      <div className="container mt-5 access-denied">
        <h2 className="access-denied-title">Access Denied</h2>
        <p className="access-denied-message">
          You need to be logged in to add a password.
        </p>
        <p className="access-denied-redirect">
          Please go to the{" "}
          <a href="/login" className="access-denied-link">
            login page
          </a>
          .
        </p>
      </div>
    );
  }

  const handleAddPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const token = sessionStorage.getItem("AuthToken");
    try {
      const response = await axios.post(
        "passwords/addPassword",
        {
          application,
          username,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Password added response:", response.data);
      setMessage("Password added successfully!");

      setApplication("");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error(error);

      if (error.response && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("Failed to add password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-password-container">
      <div className="overlay"></div>
      <h2 className="title">Add Password</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleAddPassword}>
        <div className="form-group">
          <label>Application Name</label>
          <input
            type="text"
            className="form-control"
            value={application}
            onChange={(e) => setApplication(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>UserName</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Adding..." : "Add Password"}
        </button>
      </form>
    </div>
  );
};

export default AddPassword;
