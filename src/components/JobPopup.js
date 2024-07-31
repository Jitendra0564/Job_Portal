import React from "react";
import { Modal, Button } from "react-bootstrap";
import "../styles/Layout.css"; // Ensure this path is correct

const JobPopup = ({ show, data, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Job Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data.length > 0 ? (
          <>
            <p>Total Jobs: {data.length}</p>
            <ul>
              {data.map((job) => (
                <li key={job._id}>
                  <h5>Company: {job.company}</h5>
                  <p>Position: {job.position}</p>
                  <p>Status: {job.status}</p>
                  <p>Work-Location: {job.workLocation}</p>
                  <p>Work-Type: {job.workType}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>No jobs available.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default JobPopup;
