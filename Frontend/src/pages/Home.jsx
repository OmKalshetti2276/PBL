import React from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";



const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      {/* Navbar */}
      {/* <nav className="navbar">
        <div className="logo">HormoAI</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>About</li>
          <li>Features</li>
          <li>Contact</li>
        </ul>
      </nav> */}

      {/* Hero Section */}
      <div className="hero">
        <h1 className="hero-text">
          AI Powered <span>Hormonal Disease Detection</span>
        </h1>

    <button className="start-btn" onClick={() => navigate("/predict")}>
      Get Started
    </button>
      </div>
      {/* Info Cards Section */}
<div>
<h2 className="symptoms">Key Symptoms</h2>
  {/* Info Cards Section */}
{/* Info Cards Section */}
<div className="cards-section">
  <div className="card">
    <h2>PCOS</h2>
    <div className="tags">
      <span>Irregular periods</span>
      <span>Facial hair</span>
      <span>Acne</span>
      <span>Weight gain</span>
    </div>
  </div>

  <div className="card">
    <h2>Thyroid Disorder</h2>
    <div className="tags">
      <span>Fatigue</span>
      <span>Weight changes</span>
      <span>Hair thinning</span>
      <span>Mood swings</span>
    </div>
  </div>

  <div className="card">
    <h2>Diabetes</h2>
    <div className="tags">
      <span>Frequent urination</span>
      <span>High thirst</span>
      <span>Weight loss</span>
      <span>Slow healing</span>
    </div>
  </div>
</div>
</div>

      {/* Footer */}
      <footer className="footer">
  <div className="footer-container">

    {/* Brand */}
    <div className="footer-section">
      <h3>HormoAI</h3>
      <p>AI-powered platform for early detection of hormonal disorders.</p>
    </div>

    {/* Quick Links */}
    <div className="footer-section">
      <h4>Quick Links</h4>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Features</li>
        <li>Contact</li>
      </ul>
    </div>

    {/* Contact */}
    <div className="footer-section">
      <h4>Contact</h4>
      <p>Email: support@hormoai.com</p>
      <p>Phone: +91 98765 43210</p>
    </div>

  </div>

  <div className="footer-bottom">
    © 2026 HormoAI. All rights reserved.
  </div>
</footer>

    </div>
  );
};

export default Home;