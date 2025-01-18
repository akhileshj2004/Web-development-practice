const express = require("express");
const mysql = require("mysql"); 
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5001;


app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yourpassword", 
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");

  const createDatabaseQuery = "CREATE DATABASE IF NOT EXISTS event_registration_db";
  db.query(createDatabaseQuery, (err) => {
    if (err) {
      console.error("Error creating database:", err);
      return;
    }
    console.log("Database created or already exists");

    db.changeUser({ database: "event_registration_db" }, (err) => {
      if (err) {
        console.error("Error switching database:", err);
        return;
      }

      const createTableQuery = `
      CREATE TABLE IF NOT EXISTS registrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        event_name VARCHAR(255) NOT NULL,
        registration_date DATE DEFAULT CURRENT_DATE
      )`;

      db.query(createTableQuery, (err) => {
        if (err) {
          console.error("Error creating table:", err);
        } else {
          console.log("Table created or already exists");
        }
      });
    });
  });
});


app.post("/add", (req, res) => {
  const { name, email, phone, event_name, registration_date } = req.body;


  if (!name || !email || !phone || !event_name) {
    return res.status(400).send("All fields except registration_date are required.");
  }

  const query =
    "INSERT INTO registrations (name, email, phone, event_name, registration_date) VALUES (?, ?, ?, ?, ?)";
  db.query(
    query,
    [name, email, phone, event_name, registration_date || new Date()],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error inserting registration");
      } else {
        res.status(200).send("Registration added successfully");
      }
    }
  );
});


app.get("/registrations", (req, res) => {
  const query = "SELECT * FROM registrations";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching registrations");
    } else {
      res.status(200).json(results);
    }
  });
});


app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, phone, event_name, registration_date } = req.body;


  if (!name || !email || !phone || !event_name) {
    return res.status(400).send("All fields except registration_date are required.");
  }

  const query =
    "UPDATE registrations SET name = ?, email = ?, phone = ?, event_name = ?, registration_date = ? WHERE id = ?";
  db.query(
    query,
    [name, email, phone, event_name, registration_date || new Date(), id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating registration");
      } else if (result.affectedRows === 0) {
        res.status(404).send("Registration not found");
      } else {
        res.status(200).send("Registration updated successfully");
      }
    }
  );
});


app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM registrations WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting registration");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Registration not found");
    } else {
      res.status(200).send("Registration deleted successfully");
    }
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
