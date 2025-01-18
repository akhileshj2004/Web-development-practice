var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL connection for WAMP Server
var con = mysql.createConnection({
    host: "localhost",   
    user: "root",        
    password: "",        
    database: "RoomBooking" 
});


app.post('/submit-booking', function(req, res) {
    const { name, email, phone, roomtype, requests } = req.body;

    var sql = `INSERT INTO bookings (name, email, phone, roomtype, requests) 
               VALUES (?, ?, ?, ?, ?)`;

    con.query(sql, [name, email, phone, roomtype, requests], function(err, result) {
        if (err) {
            res.status(500).send("Error saving booking: " + err.message);
            return;
        }
        res.send("Booking successfully saved!");
    });
});


app.get('/bookings', function(req, res) {
    var sql = "SELECT * FROM bookings";
    con.query(sql, function(err, results) {
        if (err) {
            res.status(500).send("Error retrieving bookings: " + err.message);
            return;
        }

        var displayHTML = `<h1>Room Bookings</h1>
                           <table border="1" style="width: 100%; border-collapse: collapse;">
                               <tr>
                                   <th>ID</th>
                                   <th>Name</th>
                                   <th>Email</th>
                                   <th>Phone</th>
                                   <th>Room Type</th>
                                   <th>Requests</th>
                               </tr>`;
        results.forEach(row => {
            displayHTML += `
                <tr>
                    <td>${row.id}</td>
                    <td>${row.name}</td>
                    <td>${row.email}</td>
                    <td>${row.phone}</td>
                    <td>${row.roomtype}</td>
                    <td>${row.requests}</td>
                </tr>`;
        });
        displayHTML += `</table>`;
        res.send(displayHTML);
    });
});


app.post('/delete-booking', function(req, res) {
    const { id } = req.body;

    var sql = `DELETE FROM bookings WHERE id = ?`;
    con.query(sql, [id], function(err, result) {
        if (err) {
            res.status(500).send("Error deleting booking: " + err.message);
            return;
        }
        if (result.affectedRows === 0) {
            res.send("No booking found with the provided ID.");
        } else {
            res.send("Booking deleted successfully!");
        }
    });
});


app.listen(9000, () => {
    console.log("Server is running at http://localhost:9000");
});
