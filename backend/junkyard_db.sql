DROP DATABASE junkyarddb;

CREATE DATABASE junkyarddb WITH template=template0;
\connect junkyarddb;

ALTER DEFAULT PRIVILEGES GRANT ALL ON tables TO postgres;
ALTER DEFAULT PRIVILEGES GRANT ALL ON sequences TO postgres;

CREATE TABLE USERS (
uid VARCHAR(50) PRIMARY KEY NOT NULL,
email VARCHAR(30) NOT NULL,
type INTEGER NOT NULL DEFAULT 0
);

CREATE SEQUENCE users_seq increment 1 start 1;


CREATE TABLE GARAGES(
id INTEGER PRIMARY KEY NOT NULL,
name VARCHAR(50) NOT NULL,
image_url VARCHAR(200),
address1 VARCHAR(100) NOT NULL,
address2 VARCHAR(100),
city VARCHAR(20) NOT NULL,
country VARCHAR(20) NOT NULL,
postcode INTEGER NOT NULL,
description VARCHAR(500) NOT NULL,
uid VARCHAR(50) REFERENCES USERS(uid)
);

CREATE SEQUENCE garage_seq increment 1 start 1;

CREATE TABLE COMMENTS(
id INTEGER PRIMARY KEY NOT NULL,
content VARCHAR(200) NOT NULL,
garageID INTEGER REFERENCES GARAGES(id),
uid VARCHAR(50) REFERENCES USERS(uid)
);

CREATE SEQUENCE items_seq increment 1 start 1;


CREATE TABLE ITEMS(
id INTEGER PRIMARY KEY NOT NULL,
name VARCHAR(50) NOT NULL,
quantity INTEGER NOT NULL,
image_url VARCHAR(500) NOT NULL,
description VARCHAR(500) NOT NULL,
price NUMERIC NOT NULL DEFAULT 0.0,
garage_id INTEGER REFERENCES GARAGES(id),
uid VARCHAR(50) REFERENCES USERS(uid)
);