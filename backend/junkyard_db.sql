DROP DATABASE junkyarddb;

CREATE DATABASE junkyarddb WITH template=template0;
\connect junkyarddb;

ALTER DEFAULT PRIVILEGES GRANT ALL ON tables TO postgres;
ALTER DEFAULT PRIVILEGES GRANT ALL ON sequences TO postgres;

CREATE TABLE USERS (
id INTEGER PRIMARY KEY NOT NULL,
name VARCHAR(50) not null,
phone_number VARCHAR(30) NOT NULL,
email VARCHAR(30) NOT NULL,
password text NOT NULL
);

CREATE SEQUENCE users_seq increment 1 start 1;