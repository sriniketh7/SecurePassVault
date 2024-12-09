import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("AuthToken"); // Get token from localStorage

  if (!token) {
    // Redirect to login if no token is found
    return <Navigate to="/login" />;
  }

  // Optionally: You can also verify the token by sending it to the backend.

  return children;
};

export default ProtectedRoute;
