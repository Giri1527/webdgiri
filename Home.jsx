// import React from "react";
// import { Link } from "react-router-dom";

// function Home() {
//   return (
//     <div className="container">
//       <h1>Welcome to the Faculty Conclave</h1>
//       <p>Manage your conference with ease! Explore the options below:</p>
//       <ul>
//         <li>
//           <Link to="/register">Author Registration</Link>
//         </li>
//         <li>
//           <Link to="/submit-paper">Submit a Paper</Link>
//         </li>
//         <li>
//           <Link to="/">Conference Notifications</Link>
//         </li>
//       </ul>
//     </div>
//   );
// }

// export default Home;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/notifications")
      .then((response) => setNotifications(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container">
      <h1>Welcome to the Faculty Conclave</h1>
      <p>Manage your conference activities seamlessly:</p>

      <div className="notification-box">
        <div className="notification-content">
          {notifications.map((notification, index) => (
            <div key={index} className="notification-item">
              {notification.message}
            </div>
          ))}
        </div>
      </div>

      {/* <ul>
        <li>
          <Link to="/register">Author Registration</Link>
        </li>
        <li>
          <Link to="/submit-paper">Submit a Paper</Link>
        </li>
        <li>
          <Link to="/notifications">Conference Notifications</Link>
        </li>
      </ul> */}
    </div>
  );
}

export default Home;
