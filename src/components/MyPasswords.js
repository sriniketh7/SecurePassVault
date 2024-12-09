import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../axiosInstance";
import { AuthContext } from "./AuthContext";
import "../MyPasswords.css"; // Importing the new CSS

const MyPasswords = () => {
  const { authState } = useContext(AuthContext);
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    if (!authState.isLoggedIn) {
      setIsAuthorized(false);
    } else {
      const fetchPasswords = async () => {
        const token = sessionStorage.getItem("AuthToken");
        try {
          const response = await axios.get("/passwords/getPasswords", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setPasswords(response.data);
        } catch (error) {
          alert(error);
          setError("Failed to fetch passwords. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchPasswords();
    }
  }, [authState.isLoggedIn]);

  const toggleVisibility = (id) => {
    setVisiblePasswords((prevVisiblePasswords) => ({
      ...prevVisiblePasswords,
      [id]: !prevVisiblePasswords[id],
    }));
  };

  const copyToClipboard = (password) => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  if (!isAuthorized) {
    return (
      <div className="container mt-5 access-denied">
        <h2 className="access-denied-title">Access Denied</h2>
        <p className="access-denied-message">
          You need to be logged in to view your passwords.
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
    <div className="container mt-5 passwords-container">
      <h1 className="title">My Passwords</h1>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && passwords.length === 0 && <div>No passwords found.</div>}
      {passwords.length > 0 && (
        <table className="table table-hover custom-table">
          <thead>
            <tr>
              <th>Application</th>
              <th>Username</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {passwords.map((password) => (
              <tr key={password._id}>
                <td>{password.application}</td>
                <td>{password.username}</td>
                <td>
                  {visiblePasswords[password._id] ? (
                    password.password
                  ) : (
                    <span className="masked-password">••••••••</span>
                  )}
                  <button
                    onClick={() => toggleVisibility(password._id)}
                    className="btn btn-link visibility-toggle"
                  >
                    {visiblePasswords[password._id] ? (
                      <i className="fas fa-eye-slash"></i>
                    ) : (
                      <i className="fas fa-eye"></i>
                    )}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => copyToClipboard(password.password)}
                    className="btn btn-outline-primary copy-btn"
                  >
                    Copy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyPasswords;
