import React from "react";
import ReactDOM from "react-dom/client"; // Use ReactDOM.createRoot for React 18+
import App from "./App"; // Import your App component
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./index.css"; // Import your custom CSS file
import Footer from "./components/Footer";

const root = ReactDOM.createRoot(document.getElementById("root")); // Get the root element

root.render(
  <React.StrictMode>
    <App /> {/* Render the App component */}
    <Footer />
  </React.StrictMode>
);
