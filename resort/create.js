var mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",   
    user: "root",       
    password: ""         
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL!");

    
    con.query("CREATE DATABASE IF NOT EXISTS RoomBooking", function(err, result) {
        if (err) throw err;
        console.log("Database 'RoomBooking' created or already exists.");
    });

    con.query("USE RoomBooking", function(err) {
        if (err) throw err;
        console.log("Using database 'RoomBooking'.");
    });


    var sql = `
        CREATE TABLE IF NOT EXISTS bookings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            phone VARCHAR(15) NOT NULL,
            roomtype VARCHAR(50) NOT NULL,
            requests TEXT
        )
    `;
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Table 'bookings' created or already exists.");
    });
});
