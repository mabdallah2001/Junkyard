INSERT INTO USERS (UID, EMAIL) VALUES('useruidhere123', 'test@test.com');

INSERT INTO GARAGES(ID, NAME, IMAGE_URL, ADDRESS1, ADDRESS2, CITY, COUNTRY, POSTCODE, DESCRIPTION,UID )
    VALUES(NEXTVAL('users_seq'), 'A garage', 'img.com', '123 Street St', 'Second address', 'Camperdown', 'Australia', '2006', ' Description', 'useruidhere123');

INSERT INTO ITEMS(ID, NAME, QUANTITY, IMAGE_URL, DESCRIPTION, PRICE, GARAGE_ID, UID)
    VALUES(NEXTVAL('items_seq'), 'Clothes', 2,
        'https://www.cccreationsusa.com/wp-content/uploads/2017/12/clothes-hanging-862x493.jpg',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        3.5, 1, 'useruidhere123');


INSERT INTO ITEMS(ID, NAME, QUANTITY, IMAGE_URL, DESCRIPTION, PRICE, GARAGE_ID, UID)
    VALUES(NEXTVAL('items_seq'), 'Bike', 1,
        'https://vamosbikes.com.au/wp-content/uploads/el-hefe-beach-cruiser-e-bike-australia-767x575.jpg',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        14, 1, 'useruidhere123');