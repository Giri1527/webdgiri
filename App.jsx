// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <div>
// //         <a href="https://vite.dev" target="_blank">
// //           <img src={viteLogo} className="logo" alt="Vite logo" />
// //         </a>
// //         <a href="https://react.dev" target="_blank">
// //           <img src={reactLogo} className="logo react" alt="React logo" />
// //         </a>
// //       </div>
// //       <h1>Vite + React</h1>
// //       <div className="card">
// //         <button onClick={() => setCount((count) => count + 1)}>
// //           count is {count}
// //         </button>
// //         <p>
// //           Edit <code>src/App.jsx</code> and save to test HMR
// //         </p>
// //       </div>
// //       <p className="read-the-docs">
// //         Click on the Vite and React logos to learn more
// //       </p>
// //     </>
// //   )
// // }

// // export default App

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Notification from "./components/Notification";
// import Registration from "./components/Registration.jsx";
// import PaperSubmission from "./components/PaperSubmission.jsx/index.js";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Notification />} />
//         <Route path="/register" element={<Registration />} />
//         <Route path="/submit-paper" element={<PaperSubmission />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Notification from "./components/Notification";
// import Registration from "./components/Registration";
// import PaperSubmission from "./components/PaperSubmission";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Notification />} />
//         <Route path="/register" element={<Registration />} />
//         <Route path="/submit-paper" element={<PaperSubmission />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
/*
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Notification from "./components/Notification";
import Registration from "./components/Registration";
import PaperSubmission from "./components/PaperSubmission";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <h1>Faculty Conclave Conference Management System</h1>
      </header>
      <Router>
        <nav>
          <a href="/">Home</a>
          <a href="/register">Register</a>
          <a href="/submit-paper">Submit Paper</a>
          <a href="/notifications">Notifications</a>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/submit-paper" element={<PaperSubmission />} />
          <Route path="/notifications" element={<Notification />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
///user has to know his user id to fill the form of paper submission right!!!!!!
*/
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthorDashboard from "./components/AuthorDashboard";
import ReviewerDashboard from "./components/ReviewerDashboard";
import Notifications from "./components/Notification";
import "./App.css";

function App() {
  const [role, setRole] = useState(null);

  const handleLogin = (userRole) => {
    setRole(userRole);
  };

  return (
    <Router>
      <div>
        {/* Header and Navigation */}
        <header>
          <h1>Conference Management System</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/notifications">Notifications</Link>
          </nav>
        </header>

        {/* Routes */}
        <Routes>
          {/* Redirect "Home" to Login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notifications" element={<Notifications />} />

          {/* Role-Based Routes */}
          {role === "author" && (
            <Route path="/author-dashboard" element={<AuthorDashboard />} />
          )}
          {role === "reviewer" && (
            <Route path="/reviewer-dashboard" element={<ReviewerDashboard />} />
          )}

          {/* Default Route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
