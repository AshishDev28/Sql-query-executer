const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost', // Replace with your MySQL host
    user: 'root',      // Replace with your MySQL username
    password: 'root',      // Replace with your MySQL password
    database: 'EmployeeManagement' // Replace with your database name
});

// Test Database Connection
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database.');
    }
});

// Endpoint to Execute Queries
app.post('/query', (req, res) => {
    const query = req.body.query; // SQL query from the frontend
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
