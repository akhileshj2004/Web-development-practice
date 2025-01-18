import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: ""
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the MySQL database");

    // Create the database if not exists
    connection.query("CREATE DATABASE IF NOT EXISTS book_db", (err) => {
        if (err) {
            console.error("Error creating database:", err);
            return;
        }
        console.log("Database created or already exists");

        // Use the database
        connection.query("USE book_db", (err) => {
            if (err) {
                console.error("Error using database:", err);
                return;
            }

            // Create the table if not exists
            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS books (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    author VARCHAR(255) NOT NULL,
                    genre VARCHAR(255) NOT NULL,
                    published_year INT NOT NULL
                )
            `;
            connection.query(createTableQuery, (err) => {
                if (err) {
                    console.error("Error creating table:", err);
                    return;
                }
                console.log("Table created or already exists");
            });
        });
    });
});

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 2ndque directory
app.use(express.static(__dirname));

// CRUD operations
app.post('/books', (req, res) => {
    const { title, author, genre, published_year } = req.body;
    const insertQuery = 'INSERT INTO books (title, author, genre, published_year) VALUES (?, ?, ?, ?)';
    connection.query(insertQuery, [title, author, genre, published_year], (err, results) => {
        if (err) {
            console.error("Error inserting data:", err);
            res.status(500).send("Error inserting data");
            return;
        }
        res.status(201).send("Book added successfully");
    });
});

app.get('/books', (req, res) => {
    const selectQuery = 'SELECT * FROM books';
    connection.query(selectQuery, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err);
            res.status(500).send("Error fetching data");
            return;
        }
        res.status(200).json(results);
    });
});

app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const { title, author, genre, published_year } = req.body;
    const updateQuery = 'UPDATE books SET title = ?, author = ?, genre = ?, published_year = ? WHERE id = ?';
    connection.query(updateQuery, [title, author, genre, published_year, id], (err, results) => {
        if (err) {
            console.error("Error updating data:", err);
            res.status(500).send("Error updating data");
            return;
        }
        res.status(200).send("Book updated successfully");
    });
});

app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    const deleteQuery = 'DELETE FROM books WHERE id = ?';
    connection.query(deleteQuery, [id], (err, results) => {
        if (err) {
            console.error("Error deleting data:", err);
            res.status(500).send("Error deleting data");
            return;
        }
        res.status(200).send("Book deleted successfully");
    });
});

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});