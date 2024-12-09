import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import MyPasswords from "./components/MyPasswords";
import AddPassword from "./components/AddPassword";
import UpdatePassword from "./components/UpdatePassword";
import { AuthContext, AuthProvider } from "./components/AuthContext"; // Import AuthContext
import Main from "./components/Main";
import ProtectedRoute from "./components/ProtectedRoute";
import CheckPasswordStrength from "./components/passwordstrength";
import OTPPage from "./components/OtpPage";
function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-passwords"
              element={
                <ProtectedRoute>
                  <MyPasswords />
                </ProtectedRoute>
              }
            />
            <Route path="/add-password" element={<AddPassword />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route
              path="/check-password-strength"
              element={<CheckPasswordStrength />}
            />
            <Route path="/otp" element={<OTPPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

// Navbar component to dynamically show login/register or username/logout
function Navbar() {
  const { authState, logout } = useContext(AuthContext); // Get authState from context

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          SecurePassVault
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {!authState.isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {authState.username}
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="userDropdown">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          logout();
                          window.location.href = "/"; // Redirect to main page
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default App;
