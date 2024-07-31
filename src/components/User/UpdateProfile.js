import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import "../../styles/UpdateProfile.css"; // Import the CSS file

const UpdateProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    // Add more fields as needed
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        location: user.location || "",
        // Set other fields
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "/api/v1/user/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Profile updated successfully");
        dispatch({ type: "UPDATE_USER", payload: response.data.user });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="update-profile-container">
      <h2 className="update-profile-heading">Update Profile</h2>
      <form onSubmit={handleSubmit} className="update-profile-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
