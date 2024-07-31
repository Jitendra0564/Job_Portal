import React from "react";
import "../index.css";

const HomePage = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav>
        <div className="logo">Job-Portal</div>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          {/* <li>
            <a href="login">Find Jobs</a>
          </li> */}
          {/* <li>
            <a href="login">Post Jobs</a>
          </li> */}
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="login">Sign In</a>
          </li>
          <li>
            <a href="register">Register</a>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <h1>Your Dream Job is Just a Click Away</h1>
        <p>
          Thousands of opportunities are waiting for you. Start your job search
          now.
        </p>
        <div className="search-bar">
          <input type="text" placeholder="Job Title or Keyword" />
          <input type="text" placeholder="Location" />
          <button>Search</button>
        </div>
        <div className="cta-buttons">
          <button>Find Jobs</button>
          <button>Post a Job</button>
        </div>
      </header>

      {/* Footer */}
      <footer>
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
        <div className="social-media">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
          <a href="#">Instagram</a>
        </div>
        <div className="newsletter">
          <input type="email" placeholder="Subscribe to our newsletter" />
          <button>Subscribe</button>
        </div>
        <p>© 2024 Job-Portal. All rights reserved By Jitendra Lawaniya.</p>
      </footer>
    </div>
  );
};

export default HomePage;
