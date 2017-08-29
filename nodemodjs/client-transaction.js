function queryclientTransactions() {
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var query = "select transactions.transactionsId,  merchantinfo.merchantName, branchinfo.branchLocation, transactions.transactDate, transactions.transactDesc, transactions.transactAmt from jpay.transactions, jpay.merchantinfo, jpay.branchinfo where transactions.merchantId = merchantinfo.merchantId and transactions.branchId = branchinfo.branchNo and branchinfo.branchId = transactions.merchantId and transactions.transactCheck = 'N'";// add in conditions for customer/merchants

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
    console.log('Connection Successful!...\n')
    request = new Request(
        query, // query sql database
        function (err, rowCount, rows) {
            console.log('transactions retrieved...\n');
            process.exit();
        }
    );

    request.on('row', function (columns) {
        columns.forEach(function (column) {
            console.log("%s\t%s", column.metadata.colName, column.value); // display result of query
        });
        console.log('\n')
    });
    connection.execSql(request);
}
}
);
};

queryclientTransactions();

