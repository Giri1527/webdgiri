// import React, { useState } from "react";
// import axios from "axios";

// function Registration() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     institution: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post("http://localhost:5000/api/register", formData)
//       .then((response) => alert(response.data))
//       .catch((error) => console.error(error));
//   };

//   return (
//     <div className="container">
//       <h1>Author Registration</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="institution"
//           placeholder="Institution"
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export default Registration;

import React, { useState } from "react";
import axios from "axios";

function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/register", formData)
      .then((response) => alert(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <h1>Author Registration</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="institution"
          placeholder="Institution"
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Registration;
