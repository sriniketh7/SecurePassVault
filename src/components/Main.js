import React, { useState, useEffect } from "react";
import image1 from "../Backendslide1.jpg";
import image2 from "../Informmultistageverfication.jpg";
import image3 from "../multistage.jpg";
import image4 from "../Strongpassword.jpg";

const slides = [
  {
    image: image1,
    text: "This platform ensures the highest level of security for user credentials by utilizing cutting-edge encryption technology. From the moment a user submits their information, such as passwords and personal data, it is immediately encrypted, transforming sensitive details into a secure, unreadable format. This encryption ensures that even in the unlikely event of a data breach, the information remains completely protected and inaccessible to unauthorized individuals.",
  },
  {
    image: image2,
    text: "By implementing robust security measures to safeguard user data from cyber threats like XSS and SQL injection. By utilizing parameterized queries and strict input validation, we prevent malicious code from infiltrating our database. Multi-factor authentication (MFA) adds an extra layer of security, while secure session management protects against hijacking. Sensitive data, including passwords, is encrypted both in transit and at rest with HTTPS enforced for secure communication. Regular security audits and continuous monitoring help identify vulnerabilities and prevent brute force attacks. Our commitment to industry-standard encryption ensures that user data remains secure and reliable.",
  },
  {
    image: image3,
    text: "The platform strengthens security by using a double-step verification process for viewing and storing passwords. This ensures only authorized users can access or modify sensitive password data, reducing the risk of unauthorized access. After the initial login, an additional authentication step, like a one-time password (OTP) or biometric verification, is required to view stored passwords. This second layer ensures that even if someone gains account access, they cannot view sensitive information without completing verification. The same applies when storing new passwords, ensuring the integrity of password data and providing a robust defense against security breaches",
  },
  {
    image: image4,
    text: "The platform uses advanced algorithms to evaluate password strength, ensuring optimal security for all accounts. It analyzes various factors like length, complexity, special characters, and case sensitivity, identifying weak passwords in real time. When creating or updating passwords, users receive instant feedback, with ratings of weak, medium, strong, or very strong. The system guides users to enhance password security by incorporating a mix of letters, numbers, symbols, and capitalizations. This proactive approach not only helps users create resilient passwords but also reduces the risk of unauthorized access, empowering them to protect their accounts and personal information confidently",
  },
];

const MainPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000); // Slide moves every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="main-container">
      <div className="slider">
        <div className="slide">
          <img
            src={slides[currentSlide].image}
            alt={`Slide ${currentSlide + 1}`}
            className="slide-image"
          />
          <div className="slide-data">
            <div className="scrollable-text">
              <h2>{slides[currentSlide].text}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
