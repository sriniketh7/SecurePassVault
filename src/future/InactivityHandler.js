import { useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Ensure jwt-decode is installed

const InactivityHandler = ({ onLogout }) => {
  const navigate = useNavigate();
  const timerRef = useRef(null); // Use a ref to keep track of the timer

  // Memoize the resetTimer function to avoid re-creation on every render
  const resetTimer = useCallback(() => {
    clearTimeout(timerRef.current); // Clear the previous timer
    timerRef.current = setTimeout(() => {
      onLogout(); // Call the logout function passed as a prop
      navigate("/login"); // Redirect to login page
    }, 300000); // 5 minutes of inactivity
  }, [navigate, onLogout]); // Include navigate and onLogout as dependencies

  const checkTokenExpiration = (token) => {
    if (!token) return true; // No token means expired
    const { exp } = jwtDecode(token); // Decode the token to get expiration
    return Date.now() >= exp * 1000; // Check if the current time is greater than the token expiration
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Retrieve token from local storage
    if (checkTokenExpiration(token)) {
      alert(checkTokenExpiration(token));
      onLogout(); // If expired, call the logout function
      navigate("/login"); // Redirect to login page
    }

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer(); // Initialize the timer when the component mounts

    return () => {
      clearTimeout(timerRef.current); // Clear the timer on cleanup
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [resetTimer, onLogout, navigate]); // Include resetTimer, onLogout, and navigate as dependencies

  return null; // This component doesn't render anything
};

export default InactivityHandler;
