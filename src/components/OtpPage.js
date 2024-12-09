import React, { useState } from "react";
import axios from "../axiosInstance"; // Adjust the path as necessary
import { useLocation } from "react-router-dom"; // Import useLocation
import "../App.css"; // Import updated CSS

const OTPPage = () => {
  const location = useLocation(); // Use useLocation to access state
  const { email: registeredEmail } = location.state || {}; // Get registered email from state
  const [email, setEmail] = useState(""); // New state for email input
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Check if entered email matches the registered email
    if (email !== registeredEmail) {
      setErrorMessage("Email does not match the registered email.");
      return;
    }

    try {
      const response = await axios.post("/otp/verify", {
        email,
        otp,
      });

      if (response.status === 200) {
        alert("OTP verified successfully!");
        const token = response.data.token;
        const userName = response.data.username;
        sessionStorage.setItem("AuthToken", token);
        sessionStorage.setItem("username", userName);
        // Example of storing the token
        window.location.href = "/dashboard"; // Adjust as needed
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="otp-verification-container">
      <div className="otp-content">
        <h1>OTP Verification</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
            maxLength="6"
          />
          <button type="submit" className="submit-button">
            Verify OTP
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default OTPPage;
