import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";

const JobStats = () => {
  const [status, setStatus] = useState({
    pending: 0,
    reject: 0,
    interview: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/v1/job/get-Alljob"); // Adjust the URL as needed
        setStatus(response.data.defaultstats);
      } catch (error) {
        console.error("Error fetching job stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <Row>
      <Col md={4}>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Pending Jobs</Card.Title>
            <Card.Text>{status.pending}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Rejected Jobs</Card.Title>
            <Card.Text>{status.reject}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Interview Scheduled</Card.Title>
            <Card.Text>{status.interview}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default JobStats;
