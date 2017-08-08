
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var config = {
    userName: 'accountant',
    password: 'Abcd1234',
    server: 'jedb.database.windows.net',
    options: { database: 'testDB', encrypt: true }
};

var connection = new Connection(config);

connection.on('connect', function (err) {
    if (err) {
        console.log(err);
        console.log("Error");
    }
    else {
        console.log("Successful");
    }
close();
});


