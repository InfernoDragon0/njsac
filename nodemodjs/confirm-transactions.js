function confirmPayment(column1, item1) {// update transaction Check

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
            requestUpdate = new Request(
                "update jpay.transactions set transactType = '4' where " + column1 + " = '" + item1 + "' and braintreeId != 'Payment Pending' and transactType = '1'", function (err, rowCount, rows) {
                    console.log('transaction(s) with ' + column1 + ' = ' + item1 + ' changed to paid');
                    process.exit();
                }
            );

            connection.execSql(requestUpdate);
        }
    }
    );
};

confirmPayment('merchantId', '-1'); // add column and item to update transactions to paid

function revertConfirm(column1, item1) {// update transaction Check

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
            requestUpdate = new Request(
                "update jpay.transactions set transactType = '1' where " + column1 + " = '" + item1 + "' and braintreeId != 'Payment Pending' and transactType = '4'", function (err, rowCount, rows) {
                    console.log('transaction(s) with ' + column1 + ' = ' + item1 + ' changed to unpaid');
                    process.exit();
                }
            );

            connection.execSql(requestUpdate);
        }
    }
    );
};

// revertConfirm ('merchantId', '123'); //add conditions to revert confirmed transactions