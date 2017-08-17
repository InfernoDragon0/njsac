

function transferDb() {
    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request;

    var query = "select transactionsId from jpay.transactions";

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
            console.log('Connection Successful!');
            request = new Request(
                query, function (err, rowCount, rows) {
                    console.log(rowCount + ' row(s) returned');
                });
            request.on('row', function (columns) {
                columns.forEach(function (column) {
                    var transid = column.value;
                    console.log(transid);
                    transfer1Db(transid);
                });
            });

            function transfer1Db(tid) {
                const docdbClient = require("documentdb").DocumentClient;
                const client = new docdbClient('https://jetransact.documents.azure.com:443/', { masterKey: 'jXxaBwnQTqxkR1igcvDWPy02qjGfJJW3aceLte9FL89hllZSUKMpecFtRIPOEaFs0y6YWXbyT783KbpQf9teFA==' });

                const databaseUrl = `dbs/jElement`;
                const collectionUrltransactionDetail = `${databaseUrl}/colls/transactionDetail`;
                client.queryDocuments(collectionUrltransactionDetail,
                    "SELECT * FROM c").toArray((err, results) => {
                        if (err) {
                            console.log(JSON.stringify(err));
                        }
                        else {
                            console.log(tid);
                            for (let result of results) {
                                // $myarray = [result["transaction_id"], result["btTransaction_id"], result["merchant_id"], "", result["customer_id"]
                                //     , result["datetime"], result["order_id"], result["amount"], "N"];
                                // console.log(myarray);
                                var transactionsId = result["transaction_id"];
                                var customerId = result["customer_id"];
                                var merchantId = result["merchant_id"];
                                var branchId = "1";
                                var brainId = result["btTransaction_id"];
                                var transactDate = result["datetime"];
                                var transactAmt = result["amount"];
                                var transactDesc = result["order_id"];
                                var transactCheck = "N";

                                if (transactionsId == tid) {
                                    console.log("This transaction has already been transferred..")
                                } else {

                                    addtransact();

                                    function addtransact() {
                                        var Connection = require('tedious').Connection;
                                        var Request = require('tedious').Request;

                                        var query = "select transactionsId from jpay.transactions";

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
                                                console.log('Connection Successful!');
                                                request1 = new Request(
                                                    // console.log(transactionId, brainId, merchantId, transaction);
                                                    "insert into jpay.transactions values ('" + transactionsId + "', '" + brainId + "', '" + merchantId + "', '" + branchId + "', '" + customerId + "', '" + transactDate + "', '" + transactDesc + "', '" + transactAmt + "', '" + transactCheck + "')", function (err, rowCount, rows) {
                                                        console.log("transferring transaction id = " + transactionsId);
                                                        console.log('1 transaction inserted!');
                                                        console.log(err);
                                                    });
                                                connection.execSql(request1);
                                            }

                                        });
                                    };






                                };

                            };
                            process.exit();
                        };
                    });
            };

        };
        connection.execSql(request);

    });
};


transferDb();