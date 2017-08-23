function transferTransactions() {

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

            requestTransactionId = new Request(
                "select transactionsId from jpay.transactions order by transactionsId asc", function (err, rowCount, rows) {
                    console.log(rowCount + ' row(s) returned\n');
                    if (rowCount == 0) {
                        console.log('there is no data in the table...\n')
                        retrieveCosmos('0');
                    }
                });

            requestTransactionId.on('row', function (columns) {// find the transaction id from the SQL
                columns.forEach(function (column) {
                    var id = column.value;
                    retrieveCosmos(id);
                });
            });
            connection.execSql(requestTransactionId);// execute sql query
            
        }
    });
};

function retrieveCosmos(id1) { //get the results from cosmos database

    const docdbClient = require("documentdb").DocumentClient; //get module from package
    const client = new docdbClient('https://jetransact.documents.azure.com:443/', { masterKey: 'jXxaBwnQTqxkR1igcvDWPy02qjGfJJW3aceLte9FL89hllZSUKMpecFtRIPOEaFs0y6YWXbyT783KbpQf9teFA==' }); // initiate link to database server

    const databaseUrl = `dbs/jElement`;
    const collectionUrltransactionDetail = `${databaseUrl}/colls/transactionDetail`;

    client.queryDocuments(collectionUrltransactionDetail,
        "SELECT * FROM c").toArray((err, results) => {
            if (err) {
                console.log(JSON.stringify(err));
            }
            else {
                var counter = 0;
                for (let result of results) {

                    // var myarray = [];
                    // myarray.push(result['transaction_id'], result['customer_id'], result['merchant_id'],'', result['btTransaction_id'],
                    // result['datetime'], result['amount'], result['order_id'], '' , 'N');

                    // console.log(JSON.stringify(myarray)+'\n');

                    var transactionsId = result['transaction_id'];
                    var customerId = result['customer_id'];
                    var merchantId = result['merchant_id'];
                    var branchId = ''; //haven't assigned a branch
                    var braintreeId = result['btTransaction_id'];
                    var transactDate = result['datetime'];
                    var transactAmt = result['amount'];
                    var transactDesc = result['order_id'];
                    var transactStatus = ''; //haven't assigned a status
                    var transactCheck = 'N';

                    if (transactionsId === id1) {
                        console.log('transaction has already been transferred..\n')
                    } else {
                        counter = counter + 1;
                        console.log('transferring ' + transactionsId + ' in progress...\n');
                        transferSQL(transactionsId, customerId, merchantId, branchId, braintreeId, transactDate, transactAmt, transactDesc, transactStatus, transactCheck);
                        // transferSQL (myarray);
                    };
                };
                // console.log(transactionsId + '\n');
                console.log(counter + ' transactions in database\n');
            };
        });
};

function transferSQL(transactionId2, customerId2, merchantId2, branchId2, braintreeId2, transactDate2, transactAmt2, transactDesc2, transactStatus2, transactCheck2) {

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

            requestTransfer = new Request(
                "insert into jpay.transactions values ('" + transactionId2 + "','" + customerId2 + "','" + merchantId2 + "','" + branchId2 + "', '" + braintreeId2 + "', '" + transactDate2 + "', '" + transactAmt2 + "', '" + transactDesc2 + "', '" + transactStatus2 + "', '" + transactCheck2 + "')", function (err, rowCount, rows) {
                process.exit();
                });
            connection.execSql(requestTransfer);
        }
    });
};

transferTransactions();