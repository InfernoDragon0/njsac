

-- Create a new database called 'DatabaseName'
-- Connect to the 'master' database to run this snippet

USE master
GO
-- Create the new database if it does not exist already
IF NOT EXISTS (
    SELECT name
        FROM sys.databases
        WHERE name = N'merchantDB'
)
CREATE DATABASE [merchantDB]
GO



/* -- Drop the database 'DatabaseName'
-- Connect to the 'master' database to run this snippet
USE master
GO
-- Uncomment the ALTER DATABASE statement below to set the database to SINGLE_USER mode if the drop database command fails because the database is in use.
-- ALTER DATABASE DatabaseName SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
-- Drop the database if it exists
IF EXISTS (
  SELECT name
   FROM sys.databases
   WHERE name = N'DatabaseName'
)
DROP DATABASE DatabaseName
GO

*/

/* -- Create schema for database
CREATE SCHEMA [jpay] AUTHORIZATION [dbo]
GO
*/

-- Create a new table called 'adminaccount' in schema 'jpay'
-- Drop the table if it already exists
IF OBJECT_ID('jpay.adminaccount', 'U') IS NOT NULL
DROP TABLE jpay.adminaccount
GO
-- Create the table in the specified schema
CREATE TABLE jpay.adminaccount
(
    accountId [NVARCHAR](50) NOT NULL PRIMARY KEY, -- primary key column
    adminName [NVARCHAR](50) NOT NULL,
    adminPassword [NVARCHAR](50) NOT NULL,
    adminRead [NCHAR](1) ,
    adminWrite [NCHAR](1) ,
    adminStatus  INT
    -- specify more columns here
);
GO

-- Drop the table 'adminaccount' in schema 'jpay'
IF EXISTS (
    SELECT *
        FROM sys.tables
        JOIN sys.schemas
            ON sys.tables.schema_id = sys.schemas.schema_id
    WHERE sys.schemas.name = N'jpay'
        AND sys.tables.name = N'adminaccount'
)
    DROP TABLE jpay.adminaccount
GO

-- Drop the table 'adminaccount' in schema 'jpay'
IF EXISTS (
    SELECT *
        FROM sys.tables
        JOIN sys.schemas
            ON sys.tables.schema_id = sys.schemas.schema_id
    WHERE sys.schemas.name = N'jpay'
        AND sys.tables.name = N'adminaccount'
)
    DROP TABLE jpay.adminaccount
GO


-- Create a new table called 'admindetails' in schema 'jpay'
-- Drop the table if it already exists
IF OBJECT_ID('jpay.admindetails', 'U') IS NOT NULL
DROP TABLE jpay.admindetails
GO
-- Create the table in the specified schema
CREATE TABLE jpay.admindetails
(
    adminId INT NOT NULL PRIMARY KEY, -- primary key column
    adminName [NVARCHAR](50) NOT NULL,
    adminContact [NVARCHAR](50) NOT NULL,
    adminPosition [NVARCHAR](50) NOT NULL
    -- specify more columns here
);
GO

-- Insert rows into table 'jpay.admindetails'
INSERT INTO jpay.admindetails
( -- columns to insert data into
 [adminId], [adminName],[adminContact],[adminPosition]
)
VALUES
( -- first row: values for the columns in the list above
 1, N'Ash', N'80000000', N'Administrator'
),
( -- second row: values for the columns in the list above
 2, N'Joy', N'88888888', N'Chansey'
),
( -- second row: values for the columns in the list above
 3, N'Kenneth', N'90000000', N'CEO'
)
-- add more rows here
GO

/*
-- Query the total count of admin
SELECT COUNT(*) as adminCount FROM jpay.adminaccount;
-- Query all admin information
SELECT e.adminAccountId, e.adminId, e.adminName, e.adminPassword 
FROM jpay.adminaccount as e
GO
*/

CREATE SCHEMA [jpay] AUTHORIZATION [dbo]
GO

-- Create a new table called 'merchantinfo' in schema 'jpay'
-- Drop the table if it already exists
IF OBJECT_ID('jpay.merchantinfo', 'U') IS NOT NULL
DROP TABLE jpay.merchantinfo
GO
-- Create the table in the specified schema
CREATE TABLE jpay.merchantinfo
(
    merchantId INT NOT NULL PRIMARY KEY, -- primary key column
    merchantName [NVARCHAR](50) NOT NULL,
    merchantHq [NVARCHAR](50) NOT NULL,
    merchantHotline [NVARCHAR](50) NOT NULL,
    merchantEmail [NVARCHAR](50),
    merchantFax [NVARCHAR](50)
    -- specify more columns here
);
GO

-- Create a new table called 'merchantholders' in schema 'jpay'
-- Drop the table if it already exists
IF OBJECT_ID('jpay.merchantholders', 'U') IS NOT NULL
DROP TABLE jpay.merchantholders
GO
-- Create the table in the specified schema
CREATE TABLE jpay.merchantholders
(
    holdersId INT NOT NULL PRIMARY KEY, -- primary key column
    merchantId [NVARCHAR](50) NOT NULL,
    branchId INT NOT NULL,
    holderRole [NVARCHAR](50) NOT NULL,
    holderName [NVARCHAR](50) NOT NULL
    -- specify more columns here
);
GO

-- Create a new table called 'branchinfo' in schema 'jpay'
-- Drop the table if it already exists
IF OBJECT_ID('jpay.branchinfo', 'U') IS NOT NULL
DROP TABLE jpay.branchinfo
GO
-- Create the table in the specified schema
CREATE TABLE jpay.branchinfo
(
    branchId INT NOT NULL PRIMARY KEY, -- primary key column
    branchNo INT NOT NULL,
    branchLocation [NVARCHAR](50) NOT NULL,
    branchTelephone [NVARCHAR](50) NOT NULL,
    branchEmail [NVARCHAR](50)
    -- specify more columns here
);
GO

-- Create a new database called 'transactionsDB'
-- Connect to the 'master' database to run this snippet
USE master
GO
-- Create the new database if it does not exist already
IF NOT EXISTS (
    SELECT name
        FROM sys.databases
        WHERE name = N'transactionsDB'
)
CREATE DATABASE [transactionsDB]
GO

CREATE SCHEMA [jpay] AUTHORIZATION [dbo]
GO

-- Create a new table called 'settlementrecords' in schema 'jpay'
-- Drop the table if it already exists
IF OBJECT_ID('jpay.settlementrecords', 'U') IS NOT NULL
DROP TABLE jpay.settlementrecords
GO
-- Create the table in the specified schema
CREATE TABLE jpay.settlementrecords
(
    settlementId INT NOT NULL PRIMARY KEY, -- primary key column
    settleDate [NVARCHAR](50) NOT NULL,
    confirmDate [NVARCHAR](50),
    merchantId INT NOT NULL,
    settleAmount [NVARCHAR](50) NOT NULL
    -- specify more columns here
);
GO

-- Create a new table called 'creditmerchant' in schema 'jpay'
-- Drop the table if it already exists
IF OBJECT_ID('jpay.creditmerchant', 'U') IS NOT NULL
DROP TABLE jpay.creditmerchant
GO
-- Create the table in the specified schema
CREATE TABLE jpay.creditmerchant
(
    merchantId INT NOT NULL,
    branchId INT NOT NULL,
    creditAmount [NVARCHAR](50) NOT NULL
    -- specify more columns here
);
GO

-- Create a new table called 'transactions' in schema 'jpay'
-- Drop the table if it already exists
IF OBJECT_ID('jpay.transactions', 'U') IS NOT NULL
DROP TABLE jpay.transactions
GO
-- Create the table in the specified schema
CREATE TABLE jpay.transactions
(
    transactionsId [NVARCHAR](50) NOT NULL PRIMARY KEY, -- primary key column
    brainId [NVARCHAR](50) NOT NULL,
    merchantId [NVARCHAR](50) NOT NULL,
    branchId [NVARCHAR](50) NOT NULL,
    customerId [NVARCHAR](50) NOT NULL,
    transactDate [NVARCHAR](200) NOT NULL,
    transactDesc [NVARCHAR](50) NOT NULL,
    transactAmt [NVARCHAR](50) NOT NULL,
    transactCheck [NCHAR](1) NOT NULL

    -- specify more columns here
);
GO

-- Drop the table 'transactions' in schema 'jpay'
IF EXISTS (
    SELECT *
        FROM sys.tables
        JOIN sys.schemas
            ON sys.tables.schema_id = sys.schemas.schema_id
    WHERE sys.schemas.name = N'jpay'
        AND sys.tables.name = N'transactions'
)
    DROP TABLE jpay.transactions
GO

-- Create a new table called 'refunds' in schema 'jpay'
-- Drop the table if it already exists
IF OBJECT_ID('jpay.refunds', 'U') IS NOT NULL
DROP TABLE jpay.refunds
GO
-- Create the table in the specified schema
CREATE TABLE jpay.refunds
(
    refundId INT NOT NULL PRIMARY KEY, -- primary key column
    transactionId INT NOT NULL,
    refundReason [NVARCHAR](200) NOT NULL,
    refundStatus [NVARCHAR](50) NOT NULL,
    refundCheck [NCHAR](1) NOT NULL
    -- specify more columns here
);
GO

-- Create a new table called 'chargebacks' in schema 'jpay'
-- Drop the table if it already exists
IF OBJECT_ID('jpay.chargebacks', 'U') IS NOT NULL
DROP TABLE jpay.chargebacks
GO
-- Create the table in the specified schema
CREATE TABLE jpay.chargebacks
(
    chargebackId INT NOT NULL PRIMARY KEY, -- primary key column
    transactionId INT NOT NULL,
    customerId [NVARCHAR](50) NOT NULL,
    chargebackAmt [NVARCHAR](50) NOT NULL
    -- specify more columns here
);
GO






