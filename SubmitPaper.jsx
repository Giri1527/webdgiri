// import React, { useState } from "react";
// import axios from "axios";

// function PaperSubmission() {
//   const [formData, setFormData] = useState({
//     title: "",
//     author_id: "",
//     file_path: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post("http://localhost:5000/api/submit-paper", formData)
//       .then((response) => alert(response.data))
//       .catch((error) => console.error(error));
//   };

//   return (
//     <div className="container">
//       <h1>Submit Paper</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="title"
//           placeholder="Paper Title"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="author_id"
//           placeholder="Author ID"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="file_path"
//           placeholder="File Path"
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default PaperSubmission;
/*
import React, { useState } from "react";
import axios from "axios";

function PaperSubmission() {
  const [formData, setFormData] = useState({
    title: "",
    author_id: "",
    file_path: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/submit-paper", formData)
      .then((response) => alert(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <h1>Submit Paper</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Paper Title"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author_id"
          placeholder="Author ID"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="file_path"
          placeholder="File Path"
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PaperSubmission;*/
import React, { useState } from "react";
import axios from "axios";

function SubmitPaper() {
  const [formData, setFormData] = useState({ title: "", file_path: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:5000/api/submit-paper", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => alert(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <h1>Submit Paper</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Paper Title"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="file_path"
          placeholder="File Path"
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SubmitPaper;
