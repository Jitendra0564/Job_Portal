import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios"; // Ensure you have axios installed
import avtar from "../../../src/assets/avatar.png";

const UserProfile = () => {
  const { userId } = useParams(); // Get user ID from URL params
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/v1/user/get-user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }); // Adjust URL as needed
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!user) return <p>Loading...</p>; // Display loading text while fetching data
  console.log("user:", user);
  return (
    <Container>
      <Row>
        <Col md={4}>
          <img
            src={user.profilePicture || avtar} // Use avatar as fallback image
            alt={`${user.data.name}'s profile`}
            className="img-fluid rounded-circle"
          />
        </Col>
        <Col md={8}>
          <h1>{user.data.name}</h1>
          <p>
            <strong>UserId:</strong> {user.data._id}
          </p>
          <p>
            <strong>Email:</strong> {user.data.email}
          </p>
          <p>
            <strong>Location:</strong> {user.data.location || "Not specified"}
          </p>
          <Button variant="primary" href={`/messages/${user._id}`}>
            Send Message
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
