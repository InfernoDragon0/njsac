var createtable = {}

//add in end-point from azure portal to host databases online
createtable.endpoint = "";
//add in primary key from azure portal, key access to database
createtable.primarykey = "";

//create database
createtable.database = {
    "id": ""
};

//create table
createtable.collection = {
    "id": ""
};

//to update data to collection

/*
createtable.replaceDocuments = [
    {
        "id": "1",
    }
];
*/

//to delete data from collection

/*
createtable.deleteDocuments = [
    {
        "id": "1",
    }
];
*/

//set default values in branch records table. Table register all records transacted by a branch
createtable.BranchRecordsTabledocuments = [
    {
        "id":"1",
        "recordId":"1",
        "branchId":"1",
        // timestamp this

        //"record_date":"1",

        "description":"Woobuffet",
        "recordAmount":"1",
        "debit":"False"
    }
];

//set default values in customer refund table. Table will record refund transaction by customers
createtable.CustomerRefundTabledocuments = [
    {
        "id":"1",
        "refundId":"1",
        "recordId":"1",
        "reason":"Woobuffet",
        "status":"Woobuffet"
    }
];

//set default values in credit merchant table. Table will calculate seperate amount owe to merchants from their branches at any point of time
createtable.CreditMerchantTabledocuments = [
    {
        "id":"1",
        "merchantId":"1",
        "branchId":"1",
        "creditAmount":"1"
    }
];

//set default values in settlement table. Table only register when settlements have been made to merchants
createtable.SettlementTabledocuments = [
    {
        "id":"1",
        "settlementId":"1",
        // timestamp this

        //"date_settled":"1",

        "merchantId":"1",
        "totalAmount":"1",
    }
];

//set default values in chargeback table. Table will record chargeback transactions by customers
createtable.ChargebackTabledocuments = [
    {
        "id":"1",
        "chargebackId":"1",
        "recordId":"1",
        "customerId":"1",
        "chargebackAmount":"1"
    }
];

module.exports = createtable;