

function createAdmin(newUser, newPass) {
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
            requestCheck = new Request("select * from jpay.adminaccount where adminName= '"+newUser+"'", function (err,rowCount,rows){
                if (rowCount >= 1){
                    console.log('Name is already taken');
                    resolve('Admin name is already taken');
                    // process.exit();
                }else{
                    request = new Request('select * from jpay.adminaccount',
                function (err1, rowCount1, rows1) {
                    var newId = rowCount1 + 1;
                    // console.log(newId);
                    var user = newUser;
                    var pass = newPass;
                    createNewAdmin2(newId, user, pass);
                    console.log('Creating admin...');
                    resolve('Admin successfully added into database');
                    }
            );
            connection.execSql(request);
            function createNewAdmin2(newId2, newUser2, newPass2) {
                request1 = new Request("insert into jpay.adminaccount values ('" + newId2 + "','" + newUser2 + "','" + newPass2 + "')",
                    function (err, rowCount, rows) {
                        // console.log('Error 2: ' + err);
                        console.log('Admin Creation successful');
                        console.log("Account ID = " + newId2 + " \ Username = " + newUser2 + " \ Password = " + newPass2)
                        // process.exit();
                    }
                );
                connection.execSql(request1);
            }
                }
            })
            connection.execSql(requestCheck);
        }
    }
    )
}) // close promise
};
// createAdmin('test', 'sagesg');

module.exports.createAdmin = createAdmin;

