-- this query creates the database and all its tables

DROP DATABASE IF EXISTS phonebook;

CREATE DATABASE phonebook;

USE phonebook;

CREATE TABLE partners (
    partner_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone_number VARCHAR(20)
    -- created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

GRANT ALL PRIVILEGES ON phonebook.* TO 'dupp'@'localhost' IDENTIFIED BY '133769';
GRANT ALL PRIVILEGES ON phonebook.* TO 'dupp'@'%' IDENTIFIED BY '133769';
