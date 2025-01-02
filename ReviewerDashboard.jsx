import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ReviewerDashboard() {
  const [papers, setPapers] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch papers assigned to the reviewer
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/papers", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPapers(response.data);
      })
      .catch((error) => console.error("Error fetching papers:", error));
  }, []);

  // Handle reviewing (Accept/Reject)
  const handleReview = (paperId, status) => {
    axios
      .put(
        "http://localhost:5000/api/review-paper",
        { paper_id: paperId, status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        alert(`Paper ${status} successfully`);
        setPapers(
          papers.map((paper) =>
            paper.id === paperId ? { ...paper, status } : paper
          )
        );
      })
      .catch((error) => console.error("Error reviewing paper:", error));
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="container">
      <h1>Reviewer Dashboard</h1>

      <div>
        <h2>Papers Assigned to You</h2>
        <ul>
          {papers.map((paper) => (
            <li key={paper.id}>
              <h3>{paper.title}</h3>
              <p>Status: {paper.status}</p>
              <p>File Path: {paper.file_path}</p>

              {/* Button to accept or reject the paper */}
              {paper.status === "Pending" && (
                <div>
                  <button
                    onClick={() => handleReview(paper.id, "accepted")}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReview(paper.id, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default ReviewerDashboard;
