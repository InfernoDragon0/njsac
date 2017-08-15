

function queryLogin(loginUser, loginPass) {
    return new Promise((resolve, reject) => {
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
                console.log('Connection Successful!')
                request = new Request(
                    "select * from jpay.adminaccount where adminName ='" + loginUser + "' and adminPassword ='" + loginPass + "'",
                    function (err, rowCount, rows) {
                        if (rowCount == 1) {
                            console.log('Valid Credentials!');
                            console.log('There are "' + rowCount + '" in the database');
                        }
                        else {
                            console.log('Invalid Credentials!');
                            console.log('There are "' + rowCount + '" in the database');
                        }
                        resolve(rowCount);
                        reject(rowCount);
                        // process.exit();
                    }

                );
                request.on('row', function (columns) {
                    columns.forEach(function (column) {
                    });
                });
                connection.execSql(request);
            }
        }
        )
    }) // close promise
    connection.exit();
};

module.exports.queryLogin = queryLogin;
//
