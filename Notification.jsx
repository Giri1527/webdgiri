// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function Notification() {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/notifications")
//       .then((response) => setNotifications(response.data))
//       .catch((error) => console.error(error));
//   }, []);

//   return (
//     <div className="container">
//       <h1>Conference Notifications</h1>
//       <ul>
//         {notifications.map((notification, index) => (
//           <li key={index}>{notification.message}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Notification.css"; // Import your custom CSS file

function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/notifications")
      .then((response) => setNotifications(response.data))
      .catch((error) => console.error(error));
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Formats the date to a readable format
  };

  return (
    <div className="container">
      <h1>Conference Notifications</h1>
      <div className="notifications-container">
        <ul className="notifications-list">
          {notifications.map((notification, index) => (
            <li key={index} className="notification-item">
              <strong>{notification.message}</strong>
              <p className="notification-time">
                <em>{formatDate(notification.created_at)}</em>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Notification;
