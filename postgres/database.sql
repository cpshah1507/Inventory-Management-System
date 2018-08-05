CREATE DATABASE wms
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

COMMENT ON DATABASE wms
    IS 'Warehouse Management System';


CREATE TABLE INVENTORY (
	ID 				integer PRIMARY KEY,
	SKU 			text NOT NULL,
	Quantity 		integer,
	Location 		text
);

CREATE TABLE ORDERS (
	ID 				integer PRIMARY KEY,
	Orderline		text NOT NULL,
	SKU	 			text NOT NULL,
	Quantity 		integer
);
