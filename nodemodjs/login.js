
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

// Create connection to database
var config =
    {
        userName: 'accountant', // update me
        password: 'Abcd1234', // update me
        server: 'jedb.database.windows.net', // update me
        options:
        {
            database: 'testDB' //update me
            , encrypt: true
        }
    }
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function (err) {
    if (err) {
        console.log(err)
    }
    else {
        queryLogin('username','password');
    }
}
);

function queryLogin(loginUser, loginPass) {
    request = new Request(
        "select * from jpay.adminaccount where adminName ='" + loginUser + "' and adminPassword ='" + loginPass + "'",
        function (err, rowCount, rows, res) {
            if (rowCount == 1) {
                console.log('Login Successfully!');
            }
            else {
                console.log('Login Credentials Invalid!');
            }
            process.exit();
        }
    );
    request.on('row', function (columns) {
        columns.forEach(function (column) {
        });
    });
    connection.execSql(request);
};

module.exports.queryLogin = queryLogin;