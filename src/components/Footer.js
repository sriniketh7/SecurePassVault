import React from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Footer() {
  return (
    <footer className="footer py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h4 className="footer-logo">
              SecurePass<span>Vault</span>
            </h4>
            <p>
              Provides robust password management solutions to keep your
              credentials safe and accessible.
            </p>
            {/* Social Media Icons */}
            <div className="social-icons">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Blogs</a>
              </li>
              <li>
                <a href="#">Portfolio</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4">
            <h5 className="footer-title">Contact Info</h5>
            <ul className="contact-info">
              <li>
                <i className="fas fa-phone"></i> +91 6281493536
              </li>
              <li>
                <i className="fas fa-envelope"></i>{" "}
                securepassvault.a354@gmail.com
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i> Hyderabad
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
