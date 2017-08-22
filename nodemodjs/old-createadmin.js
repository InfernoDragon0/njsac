

function createAdmin(user, pass, privileges) {
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
            console.log('Connection Successful!\n')
            requestCheck = new Request("select * from jpay.adminaccount where adminName= '"+user+"'", function (err, rowCount, rows){
                if (rowCount >= 1){
                    console.log('Name is already taken');
                    resolve();
                    process.exit();
                }else{
                    request = new Request('select * from jpay.adminaccount', function (err1, rowCount1, rows1) {
                    var id = rowCount1 + 1;
                    // console.log(id);
                    createNewAdmin2(id, user, pass, privileges);
                    console.log('Creating admin...\n');
                    resolve('Admin successfully added into database');
                    }
            );
            connection.execSql(request);

            function createNewAdmin2(id2, user2, pass2, privileges2) {
                request1 = new Request("insert into jpay.adminaccount values ('" + id2 + "','" + user2 + "','" + pass2 + "','" + privileges2 + "')",
                    function (err, rowCount, rows) {
                        // console.log('Error 2: ' + err);
                        console.log('Admin Creation successful\n');
                        console.log("Account ID = " + id2 + " \ Username = " + user2 + " \ Password = " + pass2)
                        reject();
                        process.exit();
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
createAdmin('help', 'sagesg','1');

// module.exports.createAdmin = createAdmin;

