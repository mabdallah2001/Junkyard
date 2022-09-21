DROP DATABASE junkyarddb;

CREATE DATABASE junkyarddb WITH template=template0;
\connect junkyarddb;

ALTER DEFAULT PRIVILEGES GRANT ALL ON tables TO postgres;
ALTER DEFAULT PRIVILEGES GRANT ALL ON sequences TO postgres;

CREATE TABLE USERS (
uid VARCHAR(50) NOT NULL,
email VARCHAR(30) NOT NULL
);

--CREATE SEQUENCE users_seq increment 1 start 1;