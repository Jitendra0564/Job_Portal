import React, { useState } from "react";
import "../../styles/Layout.css";
import { Usermenu } from "./Menu/Usermenu";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import JobPopup from "../JobPopup.js";
import axios from "axios";

const Layout = ({ children }) => {
  const location = useLocation();
  const sidebarMenu = Usermenu;
  const navigate = useNavigate(); // Changed to lowercase for consistency
  const user = useSelector((state) => state.auth.user);
  const [showJobOptions, setShowJobOptions] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState([]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successfully");
    navigate("/login"); // Changed to lowercase
  };

  const handleJobOptionClick = async (option) => {
    setShowJobOptions(false);
    try {
      const response = await axios.get(
        // Changed to GET request
        `/api/v1/job/get-Alljob?status=${option}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      setPopupData(data.jobs || []); // Added fallback to empty array
      setShowPopup(true);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to fetch jobs"); // Added error notification
    }
  };

  return (
    <div className="row">
      <div className="col-md-3 sidebar">
        <div className="logo">
          <h6>Job Portal</h6>
        </div>
        <hr />
        <p className="text-center text-warning">
          Welcome:{" "}
          {user ? (
            <Link to={`/profile/${user._id}`} className="text-warning">
              {user.name}
            </Link>
          ) : (
            ""
          )}
        </p>
        <hr />
        <div className="menu">
          {sidebarMenu.map((menu) => {
            const isActive = location.pathname === menu.path;
            if (menu.name === "Latest Jobs") {
              return (
                <div key={menu.path}>
                  <div
                    className={`menu-item ${isActive && "active"}`}
                    onClick={() => setShowJobOptions(!showJobOptions)}
                  >
                    <i className={menu.icon}></i>
                    <Link to="#">{menu.name}</Link>
                  </div>
                  {showJobOptions && (
                    <ul className="job-options">
                      <li onClick={() => handleJobOptionClick("reject")}>
                        REJECT
                      </li>
                      <li onClick={() => handleJobOptionClick("interview")}>
                        INTERVIEW
                      </li>
                      <li onClick={() => handleJobOptionClick("pending")}>
                        Pending
                      </li>
                    </ul>
                  )}
                </div>
              );
            }
            return (
              <div
                key={menu.path}
                className={`menu-item ${isActive && "active"}`}
              >
                <i className={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            );
          })}
          <div className={`menu-item`} onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <Link to="/login">Logout</Link>
          </div>
        </div>
      </div>
      <div className="col-md-9">
        {children}
        <JobPopup
          show={showPopup}
          data={popupData}
          onClose={() => setShowPopup(false)}
        />
      </div>
    </div>
  );
};

export default Layout;
