import React, { useState } from "react";
import "../App.css";

const CheckPasswordStrength = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [message, setMessage] = useState("");

  const calculateStrength = (password) => {
    let score = 0;

    // Password strength checks
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    // Update the strength and message
    setStrength(score);
    updateMessage(score);
  };

  const updateMessage = (score) => {
    let newMessage = "";
    switch (score) {
      case 0:
        newMessage = "This password is as weak as a wet noodle!";
        break;
      case 1:
        newMessage = "Not bad, but it needs a little muscle!";
        break;
      case 2:
        newMessage = "You're getting there! Just add a bit more spice!";
        break;
      case 3:
        newMessage =
          "Strong as Thor's hammer! But can you make it even better?";
        break;
      case 4:
      case 5:
        newMessage =
          "Your password could survive a zombie apocalypse! Well done!";
        break;
      default:
        break;
    }
    setMessage(newMessage);
  };

  return (
    <div className="passwrd-strength">
      <div className="password-strength-container">
        <h2>Check Password Strength</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            calculateStrength(e.target.value);
          }}
          className="password-input"
          placeholder="Enter your password"
        />
        <div className={`strength-message score-${strength}`}>{message}</div>
      </div>
    </div>
  );
};

export default CheckPasswordStrength;
