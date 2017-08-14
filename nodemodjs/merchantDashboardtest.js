const docdbClient = require("documentdb").DocumentClient;
const date = require('date-and-time');
const moment = require('moment');
const client = new docdbClient('https://jetransact.documents.azure.com:443/', { masterKey: 'jXxaBwnQTqxkR1igcvDWPy02qjGfJJW3aceLte9FL89hllZSUKMpecFtRIPOEaFs0y6YWXbyT783KbpQf9teFA==' });

const databaseUrl = `dbs/jElement`;
const collectionUrlcustomerBTDetail = `${databaseUrl}/colls/customerBTDetail`;
const collectionUrltransactionDetail = `${databaseUrl}/colls/transactionDetail`;

// counterMerchantOwing('123');
// addRefund('12345','123','Refundment','-100','OrderIDNotInUse');
// listTranscaations('123',null,null);  
tester();





function tester (){
let now = new Date();
let now1 = new Date();
let now2 =  Date();
var test;
date.format(now, 'YYYY/MM/DD',test);
date.format(now1, 'HH:mm:ss');
console.log (now);
console.log(now1);
console.log(now2);
console.log(test);
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd;
} 
if(mm<10){
    mm='0'+mm;
} 
var today = dd+'/'+mm+'/'+yyyy;

if (14/08/2017 <= 14/08/2017){
    console.log("yay");
}
else{
    console.log("nah");
}

console.log(today);
};

///////////////////////////////////Function in Use////////////////////////////////////////////////////////

function counterMerchantOwing(merchantID){
countMerchantAmtPaid(merchantID);
countMerchantAmtUnPaid(merchantID);
countMerchantRefunds(merchantID);
};

function countMerchantAmtPaid(merchantID) {
    return new Promise((resolve, reject) => {
        client.queryDocuments(collectionUrltransactionDetail,
            "SELECT * FROM c where c.merchant_id = '"+merchantID+"' and c.transaction_detail = 'Sucessful - Purchase'" ).toArray((err, results) => {
                if (err) {
                    console.log(JSON.stringify(err));
                    resolve('-1');
                }
                else {
                    if (results.length < 1) {
                        console.log("No data found");
                        resolve('-1');
                        return;
                    }
                    var amountOwe = 0;
                    var counter = 0;
                    for (let result of results) {
                        amountOwe = amountOwe + parseInt(result["amount"]);
                        counter = counter + 1;
                    }
                    console.log(" Total Number of Paid Sales : "+counter);
                    console.log(" Total Paid Amount owed to merchant : SGD$"+amountOwe);
                    resolve(amountOwe);
                }
            });
    });
};

function countMerchantAmtUnPaid(merchantID) {
    return new Promise((resolve, reject) => {
        client.queryDocuments(collectionUrltransactionDetail,
            "SELECT * FROM c where c.merchant_id = '"+merchantID+"' and c.transaction_detail = 'Pending - Purchase'").toArray((err, results) => {
                if (err) {
                    console.log(JSON.stringify(err));
                    resolve('-1');
                }
                else {
                    if (results.length < 1) {
                        console.log("No data found");
                        resolve('-1');
                        return;
                    }
                    var amountOwe = 0;
                    var counter = 0;
                    for (let result of results) {
                        amountOwe = amountOwe + parseInt(result["amount"]);
                        counter = counter + 1;
                    }
                    console.log(" Total Number of Unpaid Sales : "+counter);
                    console.log(" Total Unpaid Amount owed to merchant : SGD$"+amountOwe);
                    resolve(amountOwe);
                }
            });
    });
};

function countMerchantRefunds(merchantID) {
    return new Promise((resolve, reject) => {
        client.queryDocuments(collectionUrltransactionDetail,
            "SELECT * FROM c where c.merchant_id = '"+merchantID+"' and c.transaction_detail = 'Refund - Purchase'").toArray((err, results) => {
                if (err) {
                    console.log(JSON.stringify(err));
                    resolve('-1');
                }
                else {
                    if (results.length < 1) {
                        console.log("No data found");
                        resolve('-1');
                        return;
                    }
                    var amountOwe = 0;
                    var counter = 0;
                    for (let result of results) {
                        amountOwe = amountOwe + parseInt(result["amount"]);
                        counter = counter + 1;
                    }
                    console.log(" Total Number of Refunded Sales : "+counter);
                    console.log(" Total Refunded Sale : SGD$"+amountOwe);
                    resolve(amountOwe);
                }
            });
    });
};

// Amount must be negative for refund//
function addRefund(customer_id, merchant_id, btTransaction_id, amount, order_id) {
    return new Promise((resolve, reject) => {
        client.queryDocuments(collectionUrltransactionDetail,
            "Select * from c").toArray((err, results) => {
                if (err) {
                    console.log(JSON.stringify(err));
                }
                else {
                    var id1 = results.length;
                    var id = JSON.stringify(id1 + 1);
                    var transaction_id = id;
                    var datetime = Date();
                    console.log('Transaction Recorded');
                    console.log('Pending Payment - Purchase')
                    console.log('Transaction ID : ' + transaction_id);
                    addTransaction2db({
                        'id': id,
                        'transaction_id': transaction_id,
                        'customer_id': customer_id,
                        'merchant_id': merchant_id,
                        'btTransaction_id': btTransaction_id,
                        'datetime': datetime,
                        'amount': amount,
                        'order_id': order_id,
                        'transaction_detail': 'Refund - Purchase'
                    });

                    resolve(transaction_id);


                };
            });
    });
};

function listTranscaations(merchantID,startDate,endDate){
    return new Promise((resolve, reject) => {
        client.queryDocuments(collectionUrltransactionDetail,
            "SELECT * FROM c where c.merchant_id = '"+merchantID+"' and c.transaction_detail = 'Sucessful - Purchase'").toArray((err, results) => {
                if (err) {
                    console.log(JSON.stringify(err));
                    resolve('-1');
                }
                else {
                    if (results.length < 1) {
                        console.log("No data found");
                        resolve('-1');
                        return;
                    }
                    var dates = new Array;
                    var counter= -1;
                    for (let result of results) {
                        moment(result.datetime).format('L');
                        counter = counter + 1
                        dates[counter]=result.datetime;
                        
                    }
                    console.log(dates);
                    resolve();
                }
            });
});
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////























function createDbIfNotExists() {
    client.readDatabase(databaseUrl, (err, result) => {
        if (err) {
            client.createDatabase(cosmosConfig.database, (err, created) => {
                if (err) {
                    console.log(JSON.stringify(err));

                }
                else {
                    console.log(JSON.stringify(created));
                }
            });
        }
        else {
            console.log(JSON.stringify(result));
        }
    });
};

function createCollectionIfNotExists() {
    client.readCollection(collectionUrlcustomerBTDetail, (err, result) => {
        if (err) {
            client.createCollection(databaseUrl, cosmosConfig.collection, null, (err, created) => {
                if (err) {
                    console.log(JSON.stringify(err));

                }
                else {
                    console.log(JSON.stringify(created));
                }
            });
        }
        else {
            console.log(JSON.stringify(result));
        }
    });
};

// insert documents, edit documents in the config file
function getUserDocument(documents) {
    for (let i = 0; i < documents.length; i++) {
        let documentUrl = `${collectionUrl}/docs/${documents[i].id}`;

        client.readDocument(documentUrl, null, (err, result) => {
            if (err) {
                if (err.code == HttpStatusCodes.NOTFOUND) {
                    client.createDocument(collectionUrl, documents[i], (err, created) => {
                        if (err) {
                            console.log(JSON.stringify(err));

                        }
                        else {
                            console.log(JSON.stringify(created));


                        }
                    });
                }
                else {
                    console.log(JSON.stringify(err));
                }
            }
            else {
                console.log(JSON.stringify(result));
            }
        });
    }
}
//getUserDocument(cosmosConfig.customerBTDetaildocuments);





////////////////////////////////////Functions in Use////////////////////////////////////
// insert new client with new bttoken
function insertNewCustomerDataInput(data) {
    client.createDocument(collectionUrl, data, (err, created) => {
        if (err) {
            console.log(JSON.stringify(err));
        }
        else {
            console.log(JSON.stringify(created));
        }
    });
};
function insertNewCustomer(newcustomer_id, newBTwalletToken) {
    return new Promise((resolve, reject) => {
        client.queryDocuments(collectionUrlcustomerBTDetail,
            "Select * from root r where r.customer_id='" + newcustomer_id + "'").toArray((err, results) => {
                if (err) {
                    console.log(JSON.stringify(err));
                    resolve('-1');
                }
                else {
                    if (results.length < 1) {
                        console.log("No existing customer found, new customer created");
                        insertNewCustomerDataInput({ 'id': newcustomer_id, 'customer_id': newcustomer_id, 'customer_BTwalletToken': newBTwalletToken });
                        resolve('-1');
                        return;
                    }
                    else {
                        console.log("Customer Exists");
                    }

                }
            });
    });
};

// find client token for existing client ID
function findBTtoken(customerID) {
    return new Promise((resolve, reject) => {
        client.queryDocuments(collectionUrlcustomerBTDetail,
            "Select * from root r where r.customer_id='" + customerID + "'").toArray((err, results) => {
                if (err) {
                    console.log(JSON.stringify(err));
                    resolve('-1');
                }
                else {
                    if (results.length < 1) {
                        console.log("No data found");
                        resolve('-1');
                        return;
                    }
                    for (let result of results) {
                        var scustmoer_id = result["customer_id"];
                        var scustomer_BTtoken = result["customer_BTwalletToken"];
                        console.log("----------");
                        console.log("Searching Client ID: " + scustmoer_id);
                        console.log("Coresponding BT Token: " + scustomer_BTtoken);
                        resolve(scustomer_BTtoken);
                    }
                }
            });
    });
};

function addTransaction2db(data) {
    client.createDocument(collectionUrltransactionDetail, data, (err, created) => {
        if (err) {
            console.log(JSON.stringify(err));
        }
        else {
            console.log(JSON.stringify(created));
        }
    });
}
function insertTransaction(customer_id, merchant_id, btTransaction_id, datetime, amount, order_id) {
    return new Promise((resolve, reject) => {
        client.queryDocuments(collectionUrltransactionDetail,
            "Select * from c").toArray((err, results) => {
                if (err) {
                    console.log(JSON.stringify(err));
                }
                else {
                    var id1 = results.length;
                    var id = JSON.stringify(id1 + 1);
                    var transaction_id = id;
                    console.log('Transaction Recorded');
                    console.log('Pending Payment - Purchase')
                    console.log('Transaction ID : ' + transaction_id);
                    addTransaction2db({
                        'id': id,
                        'transaction_id': transaction_id,
                        'customer_id': customer_id,
                        'merchant_id': merchant_id,
                        'btTransaction_id': btTransaction_id,
                        'datetime': datetime,
                        'amount': amount,
                        'order_id': order_id,
                        'transaction_detail': 'Pending - Purchase'
                    });

                    resolve(transaction_id);


                };
            });
    });
};


function paymentSucessful(transaction_id, braintreeID) {
    return new Promise((resolve, reject) => {
        client.queryDocuments(collectionUrltransactionDetail,
            "Select * from c where c.id='" + transaction_id + "'").toArray((err, results) => {
                if (err) {
                    console.log(JSON.stringify(err));
                    resolve('-1');
                }
                else {
                    if (results.length < 1) {
                        console.log('No data found');
                        resolve('-1');
                        return;
                    }
                    for (let result of results) {
                        result.transaction_detail = 'Sucessful - Purchase';
                        result.btTransaction_id = braintreeID;
                        let documentUrl = `${collectionUrltransactionDetail}/docs/${transaction_id}`;
                        client.replaceDocument(documentUrl, result, (err, result) => {
                            if (err) {
                                console.log(JSON.stringify(err));
                            }
                            else {
                                resolve(result);
                            }
                        });
                    };
                }
            });
    });
};
// paymentSucessful('10')



////////////////////////////////////Functions here not in use yet////////////////////////////////////
//Change BT wallet token
function replace(documents, token) {
    let documentUrl = `${collectionUrl}/docs/${documents.customer_id}`;
    documents.id = documents.customer_id;
    documents.customer_BTwalletToken = token;
    console.log("Updated Documents");
    console.log(documents);
    return new Promise((resolve, reject) => {
        client.replaceDocument(documentUrl, documents, (err, result) => {
            if (err) {
                console.log(JSON.stringify(err));
            }
            else {
                resolve(result);
            }
        });
    });
}
// // id = client id 
// // replace(customer_id,token)
//replace({"customer_id": "16"}, "token 16");


//Delete document, change the id in the config file before running the function
function deleteDoc(documents) {
    let documentUrl = `${collectionUrl}/docs/${documents.id}`;
    return new Promise((resolve, reject) => {
        client.deleteDocument(documentUrl, documents, (err, result) => {
            if (err) {
                console.log(JSON.stringify(err));
            }
            else {
                resolve(result);
                console.log("Deleted customer_id: " + documents.id);
            }
        });
    });
}
//deleteDoc(cosmosConfig.deleteDocuments[0]);
