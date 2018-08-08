CREATE DATABASE ims
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

COMMENT ON DATABASE ims
    IS 'Inventory Management System';


CREATE TABLE INVENTORY (
	ID 				serial PRIMARY KEY,
	SKU 			text NOT NULL,
	Quantity 		integer,
	Location 		text
);

CREATE TABLE ORDERS (
	ID 				serial PRIMARY KEY,
	Orderline		text NOT NULL,
	SKU	 			text NOT NULL,
	Quantity 		integer,
	OrderState		text
);
