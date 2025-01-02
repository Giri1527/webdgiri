// // backend/server.js
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const mysql = require("mysql2");

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "faculty_conclave",
// });

// db.connect((err) => {
//   if (err) throw err;
//   console.log("Connected to MySQL");
// });

// // Fetch conference notifications
// app.get("/api/notifications", (req, res) => {
//   const query = "SELECT * FROM notifications";
//   db.query(query, (err, results) => {
//     if (err) res.status(500).send(err);
//     else res.send(results);
//   });
// });

// // Register author
// app.post("/api/register", (req, res) => {
//   const { name, email, institution } = req.body;
//   const query =
//     "INSERT INTO authors (name, email, institution) VALUES (?, ?, ?)";
//   db.query(query, [name, email, institution], (err) => {
//     if (err) res.status(500).send(err);
//     else res.send("Registration successful");
//   });
// });

// // Submit paper
// app.post("/api/submit-paper", (req, res) => {
//   const { title, author_id, file_path } = req.body;
//   const query =
//     "INSERT INTO papers (title, author_id, file_path) VALUES (?, ?, ?)";
//   db.query(query, [title, author_id, file_path], (err) => {
//     if (err) res.status(500).send(err);
//     else res.send("Paper submitted successfully");
//   });
// });

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });
/*
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "faculty_conclave",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

app.get("/api/notifications", (req, res) => {
  const query = "SELECT * FROM notifications";
  db.query(query, (err, results) => {
    if (err) res.status(500).send(err);
    else res.send(results);
  });
});

app.post("/api/register", (req, res) => {
  const { name, email, institution } = req.body;
  const query =
    "INSERT INTO authors (name, email, institution) VALUES (?, ?, ?)";
  db.query(query, [name, email, institution], (err) => {
    if (err) res.status(500).send(err);
    else res.send("Registration successful");
  });
});

app.post("/api/submit-paper", (req, res) => {
  const { title, author_id, file_path } = req.body;
  const query =
    "INSERT INTO papers (title, author_id, file_path) VALUES (?, ?, ?)";
  db.query(query, [title, author_id, file_path], (err) => {
    if (err) res.status(500).send(err);
    else res.send("Paper submitted successfully");
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});*/
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "faculty_conclave",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

// JWT Secret
const JWT_SECRET = "your_secret_key";

// Middleware for Role-Based Authentication
const authenticate = (roles) => (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Access Denied");

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid Token");
    if (!roles.includes(user.role)) return res.status(403).send("Forbidden");

    req.user = user;
    next();
  });
};

// Set up file storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store files in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add a timestamp to the filename
  },
});

const upload = multer({ storage: storage });

// Register Endpoint
app.post("/api/register", async (req, res) => {
  const { username, password, role, name, email, phone } = req.body;

  if (!username || !password || !role || !name || !email || !phone) {
    return res.status(400).send("All fields are required");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      "INSERT INTO users (username, password, role, name, email, phone) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(
      query,
      [username, hashedPassword, role, name, email, phone],
      (err, results) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).send("Username or email already exists");
          }
          return res.status(500).send(err);
        }
        res.send("User registered successfully");
      }
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Login Endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).send("All fields are required");

  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0)
      return res.status(401).send("Invalid credentials");

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return res.status(401).send("Invalid credentials");

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token, role: user.role });
  });
});

// Submit Paper (Author Only)
app.post(
  "/api/submit-paper",
  authenticate(["author"]),
  upload.single("file"),
  (req, res) => {
    const { title, description } = req.body;
    const filePath = req.file ? req.file.path : null; // Get file path from uploaded file
    const authorId = req.user.id;

    const query =
      "INSERT INTO papers (title, description, author_id, file_path, status) VALUES (?, ?, ?, ?, ?)";
    db.query(
      query,
      [title, description, authorId, filePath, "Pending"],
      (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({
          id: result.insertId,
          title,
          description,
          status: "Pending",
          file_path: filePath,
        });
      }
    );
  }
);

// Get Papers (Author and Reviewer)
app.get("/api/papers", authenticate(["author", "reviewer"]), (req, res) => {
  let query;
  const params = [];

  if (req.user.role === "author") {
    query = "SELECT * FROM papers WHERE author_id = ?";
    params.push(req.user.id);
  } else if (req.user.role === "reviewer") {
    query = "SELECT * FROM papers WHERE reviewer_id = ?";
    params.push(req.user.id);
  }

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).send(err);
    else res.send(results);
  });
});

// Review Paper (Reviewer Only)
app.put("/api/review-paper", authenticate(["reviewer"]), (req, res) => {
  const { paper_id, status } = req.body;

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).send("Invalid status");
  }

  const query = "UPDATE papers SET status = ? WHERE id = ?";
  db.query(query, [status, paper_id], (err) => {
    if (err) return res.status(500).send(err);
    else res.send(`Paper ${status} successfully`);
  });
});

// Endpoint to get all notifications
app.get("/api/notifications", (req, res) => {
  const query = "SELECT * FROM notifications ORDER BY created_at DESC"; // Get notifications ordered by creation time
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results); // Send the list of notifications as response
  });
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
