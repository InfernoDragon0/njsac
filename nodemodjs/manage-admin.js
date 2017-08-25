
function searchAdmin(column, item) {// search for admin

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
                "select * from jpay.adminaccount where " + column + " = '" + item + "'", function (err, rowCount, rows) {
                    console.log('\n' + rowCount + ' row(s) returned');
                    process.exit();
                }
            );

            requestSearch.on('row', function (columns) {
                columns.forEach(function (column) {
                    console.log('%s\t%s', column.metadata.colName, column.value);
                });
            });
            connection.execSql(requestSearch);
        }
    }
    );
};

// searchAdmin('adminName','yolo'); // add column and item to search

function updateAdmin(column1, item1, update1, value1) {// update admin status

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
                "update jpay.adminaccount set " + update1 + " = " + value1 + " where " + column1 + " = '" + item1 + "'", function (err, rowCount, rows) {
                    console.log('admin(s) with ' + column1 + ' = ' + item1 + ' has updated their ' + update1 + ' to ' + value1);
                    process.exit();
                }
            );

            connection.execSql(requestUpdate);
        }
    }
    );
};

// updateAdmin('adminName','beer', 'adminStatus', '2'); // add column and item to search and column then value to update

function deleteAdmin(condition2, item2) {// delete admin

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
            requestDelete = new Request(
                "delete from jpay.adminaccount where " + condition2 + " = '" + item2 + "'", function (err, rowCount, rows) {
                    console.log('admin(s) with ' + condition2 + ' = ' + item2 + ' is deleted from database\n');
                    process.exit();
                }
            );

            connection.execSql(requestDelete);
        }
    }
    );
};

// deleteAdmin ('adminWrite','N'); //add column and value as condition to delete

module.exports.searchAdmin = searchAdmin;
module.exports.updateAdmin = updateAdmin;
module.exports.deleteAdmin = deleteAdmin;