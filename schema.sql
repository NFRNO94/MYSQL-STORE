DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;
CREATE TABLE products
(
    item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL(10, 2),
    stock_quantity INTEGER,

    PRIMARY KEY (item_id)
);

    