import React from "react";
import { Navigate } from "react-router-dom";

// Assuming isAuthenticated is a boolean that determines if the user is logged in
const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token"); // Or however you're storing the auth token

  return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default PrivateRoute;
