// utils/tokenUtils.js
import { jwtDecode } from "jwt-decode"; // Correct way to import if named export is used

export const isTokenExpired = (token) => {
  if (!token) return true; // If there's no token, consider it expired.

  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Current time in seconds

  return decoded.exp < currentTime; // Check if the token is expired
};
