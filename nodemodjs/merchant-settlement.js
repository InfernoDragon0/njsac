function querySettle() {
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var query = "select settlementrecords.settlementId, merchantinfo.merchantId, merchantinfo.merchantName, settlementrecords.settleDate, settlementrecords.confirmDate, settlementrecords.settleAmount from jpay.settlementrecords, jpay.merchantinfo where settlementrecords.merchantId = merchantinfo.merchantId;";

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
        query, 
        function (err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
            process.exit();
        }
    );

    request.on('row', function (columns) {
        columns.forEach(function (column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });
    connection.execSql(request);
}
}
);
};

module.exports.querySettle = querySettle;