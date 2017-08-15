

function createAdmin(newUser, newPass) {
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
            request = new Request('select * from jpay.adminaccount',
                function (err, rowCount, rows) {
                    var newId = rowCount + 1;
                    // console.log('Error 1: '+ JSON.stringify(err));
                    console.log(newId);
                    var user = newUser;
                    var pass = newPass;
                    createNewAdmin2(newId, user, pass);
                }
            );
            connection.execSql(request);
            function createNewAdmin2(newIdId, newUser1, newPass1) {
                request1 = new Request("insert into jpay.adminaccount values ('" + newIdId + "','" + newUser1 + "','" + newPass1 + "')",
                    function (err, rowCount, rows) {
                        // console.log('Error 2: ' + err);
                        console.log("New Admin Account Created!");
                        console.log("Account ID = " + newIdId + " \ Username = " + newUser1 + " \ Password = " + newPass1)
                    }
                );
                connection.execSql(request1);
            }

        }
    }
    )
};

// createAdmin('sagesg', 'sagesg');

module.exports.createAdmin = createAdmin;

