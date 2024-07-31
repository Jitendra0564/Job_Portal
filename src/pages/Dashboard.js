import React from "react";
import Layout from "../components/Layout/Layout.js";
import videoClip from "../../src/assets/videos/video.mp4";
import "../../src/styles/Dashboard.css"; // Create this CSS file for Dashboard-specific styles

const Dashboard = () => {
  return (
    <Layout>
      <div className="dashboard-container">
        <h1>Job-Portal Page</h1>
        <div className="video-container">
          <video autoPlay muted loop id="background-video">
            <source src={videoClip} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
