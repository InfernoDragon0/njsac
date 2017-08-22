function createAdmin(user, pass, read, write, status) { // parameters for creating admin

    return new Promise((resolve, reject) => { // link back to main

        var Connection = require('tedious').Connection; // mssql library function
        var Request = require('tedious').Request; //mssql library function

        var config =
            {
                userName: 'accountant', // database owner namem
                password: 'Abcd1234', // database owner password
                server: 'jedb.database.windows.net', // database server host
                options:
                {
                    database: 'testDB' //database name
                    , encrypt: true
                }
            }
        var connection = new Connection(config); // set-up connection

        connection.on('connect', function (err) {
            if (err) {
                console.log('connection to database unsuccessful...') // database connection failed
                connection.close();
                process.exit();
            } else {
                console.log('\n');
                console.log('connection to database successful...\n') // database connection confirmation

                requestCheckAdmin = new Request("select * from jpay.adminaccount where adminName= '" + user + "'", function (err, rowCount, rows) {
                    if (err) {
                        console.log(err)
                    };

                    if (rowCount >= 1) {
                        console.log('Name is already taken\n')// Name is already registered in database
                        connection.close();
                        process.exit();
                    } else {
                        console.log('There is no relevant user...\n')// Name is not registered in database

                        requestId = new Request("select accountId from jpay.adminaccount order by accountId asc", function (err1, rowCount1, rows1) { //check accountId

                            console.log(rowCount1 + ' rows returned...\n');  // check rows of results  

                            if (rowCount1 == 0) {
                                console.log('there is no data in the table...\n')
                                var id = '1';// declare id as 1
                                insertAdmin(id, user, pass, read, write, status);
                                connection.close();
                            }
                            else {
                                var newId = String(rowCount1 + 1); // create new ID when all id taken
                                insertAdmin(newId, user, pass, read, write, status);// call create function    
                            };

                        });

                        var id; //declare column value into variable
                        var idCheck = 0;
                        requestId.on('row', function (columns) {
                            columns.forEach(function (column) {
                                console.log('column value = ' + column.value + '\n');
                                id = parseInt(String(column.value));// convert value to string;
                                idCheck++;
                                if (id === idCheck) {//id already used
                                } if (id != idCheck) {
                                    console.log('Creating admin...\n');
                                    insertAdmin(String(idCheck), user, pass, read, write, status);// call create function
                                } else {
                                    console.log('id already in used\n')
                                }
                            });
                            // console.log(newId,idCheck,id);
                            // console.log('Creating admin...\n');
                            // insertAdmin(newId, user, pass, read, write, status);// call create function
                        });
                        connection.execSql(requestId); //activate 1st sql query
                    };
                });
                connection.execSql(requestCheckAdmin); // activate 2nd sql query

            };

        });

    }); // close promise
};

// Add admin account function
function insertAdmin(id2, user2, pass2, read2, write2, status2) {

    var Connection = require('tedious').Connection; // mssql library function
    var Request = require('tedious').Request; //mssql library function

    var config =
        {
            userName: 'accountant', // database owner namem
            password: 'Abcd1234', // database owner password
            server: 'jedb.database.windows.net', // database server host
            options:
            {
                database: 'testDB' //database name
                , encrypt: true
            }
        }
    var connection = new Connection(config); // set-up connection

    connection.on('connect', function (err) {
        if (err) {
            console.log('connection to database unsuccessful...') // database connection failed
            connection.close();
            process.exit();
        } else {
            console.log('connection to database successful...\n') // database connection confirmation

            request1 = new Request("insert into jpay.adminaccount values ('" + id2 + "','" + user2 + "','" + pass2 + "','" + read2 + "', '" + write2 + "', '" + status2 + "')",
                function (err, rowCount, rows) {
                    if (err) { console.log(err) };
                    console.log(user2 + ' successfully created...\n');// show created account confirmation
                    connection.close();
                    process.exit();
                });
            connection.execSql(request1);
        }
    });
};

createAdmin('beer', 'sage', 'Y', 'N', '1');