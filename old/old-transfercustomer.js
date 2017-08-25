//////////////NOT IN USE////////////////////// (useable)

function transfer() {
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

            // request.on('row', function (columns) {
            //     columns.forEach(function (column) {
            //         var transid = column.value;
            //         console.log(column.value);
            //         transfer1Db(transid);
            //     });
            // });

            // column value got problem


            function transfer1Db() {
                const docdbClient = require("documentdb").DocumentClient;
                const client = new docdbClient('https://jetransact.documents.azure.com:443/', { masterKey: 'jXxaBwnQTqxkR1igcvDWPy02qjGfJJW3aceLte9FL89hllZSUKMpecFtRIPOEaFs0y6YWXbyT783KbpQf9teFA==' });

                const databaseUrl = `dbs/jElement`;
                const collectionUrlcustomerBTDetail = `${databaseUrl}/colls/customerBTDetail`;
                client.queryDocuments(collectionUrlcustomerBTDetail,
                    "SELECT * FROM c").toArray((err, results) => {
                        if (err) {
                            console.log(JSON.stringify(err));
                        }
                        else {
                            // console.log(tid);
                            var counter = 0;
                            for (let result of results) {
                                // $myarray = [result["transaction_id"], result["btTransaction_id"], result["merchant_id"], "", result["customer_id"]
                                //     , result["datetime"], result["order_id"], result["amount"], "N"];
                                // console.log(myarray);
                                var customerId = result["customer_id"];
                                var btWallet = result["customer_BTwalletToken"];
                                var contactNo = result["contact_No"];
                                var walletId = result["wallet_id"];
                                var walletAmt = result["wallet_amt"];
                                var pinHash = result["pin_6digit"];

                                    counter = counter + 1;
                                    console.log("Transferring "+transactionsId+" in progress...");
                                    addtransact(customerId,btWallet,contactNo,walletId,walletAmt,pinHash);
                                
                            };
                            console.log(counter +" transactions transferred");
                        };
                        process.exit();
                    });
            };

        };
        connection.execSql(request);
    });
};


transfer();

function addtransact(customerId1,btWallet1,contactNo1,walletId1,walletAmt1,pinHash1) {
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
            console.log('Connection Successful!');
            request1 = new Request(
                // console.log(transactionId, brainId, merchantId, transaction);
                "insert into jpay.transactions values ('" + transactionsId1 + "', '" + brainId1 + "', '" + merchantId1 + "', '" + branchId1 + "', '" + customerId1 + "', '" + transactDate1 + "', '" + transactDesc1 + "', '" + transactAmt1 + "', '" + transactCheck1 + "')", function (err, rowCount, rows) {
                    console.log("transferring transaction id = " + transactionsId1);
                    console.log('1 transaction inserted!');
                    // console.log(err);
                });
            connection.execSql(request1);
        }

    });
};
