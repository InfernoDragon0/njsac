

function checkRefund(transactionId) {

    var Connection = require('tedious').Connection;//mssql library module
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
            console.log('\nConnection Successful!\n')
            requestSearch = new Request(
                "select transactType from jpay.transactions where transactionsId = '" + transactionId + "' and transactType = '1' or transactType =''", function (err, rowCount, rows) {
                    if (err) {
                        console.log(err)
                    }
                    if (rowCount == 0) {
                        console.log('there is no such transaction or transaction has been already paid...\n')
                        process.exit();
                    }
                    if(rowCount == 1){
                        console.log('transaction can be refunded...\n')
                    }
                    else{
                        console.log('transaction is already refunded...\n')
                    }
                }
            );

            connection.execSql(requestSearch);
        }
    }
    );
};

function updateRefund(transactionId) {

    var Connection = require('tedious').Connection;//mssql library module
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
            requestUpdate = new Request(
                "update jpay.transactions set transactType = '2' where transactionsId = '" + transactionId + "'", function (err, rowCount, rows) {
                    if (err) {
                        console.log(err)
                    }
                    console.log('transaction successfully refunded...\n');
                    process.exit();
                }
            );

            connection.execSql(requestUpdate);
        }
    }
    );
};

checkRefund('4')