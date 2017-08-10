
var Connection = require("tedious").Connection;
var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;
var async = require("async");

// Create connection to database
var config = {
    userName: 'accountant',
    password: 'Abcd1234',
    server: 'jedb.database.windows.net',
    options: { 
        database: 'testDB', encrypt: true }
};

var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function (err) {
    if (err) {
        console.log(err);
        console.log("Error");
    }
        console.log("Connected!");
});

