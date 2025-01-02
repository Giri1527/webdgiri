import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AuthorDashboard() {
  const [papers, setPapers] = useState([]);
  const [newPaper, setNewPaper] = useState({
    title: "",
    description: "",
    file: null,
  });
  const navigate = useNavigate();

  // Fetch papers on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/papers", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setPapers(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Handle changes to new paper form
  const handleNewPaperChange = (e) => {
    const { name, value, files } = e.target;
    setNewPaper({
      ...newPaper,
      [name]: files ? files[0] : value,
    });
  };

  // Handle submitting a new paper
  const handleSubmitPaper = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", newPaper.title);
    formData.append("description", newPaper.description);
    formData.append("file", newPaper.file);

    axios
      .post("http://localhost:5000/api/submit-paper", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setPapers([...papers, { ...response.data, status: "Pending" }]); // Add new paper with pending status
        setNewPaper({ title: "", description: "", file: null }); // Reset form
      })
      .catch((error) => console.error(error));
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="container">
      <h1>Your Submitted Papers</h1>
      <ul>
        {papers.map((paper) => (
          <li key={paper.id}>
            {paper.title} - Status: {paper.status}
          </li>
        ))}
      </ul>

      {/* Paper submission form */}
      <h2>Submit a New Paper</h2>
      <form onSubmit={handleSubmitPaper}>
        <input
          type="text"
          name="title"
          placeholder="Paper Title"
          value={newPaper.title}
          onChange={handleNewPaperChange}
          required
        />
        <textarea
          name="description"
          placeholder="Paper Description"
          value={newPaper.description}
          onChange={handleNewPaperChange}
          required
        />
        <input
          type="file"
          name="file"
          onChange={handleNewPaperChange}
          required
        />
        <button type="submit">Submit Paper</button>
      </form>

      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AuthorDashboard;
