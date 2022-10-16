# ELEC5619 - Junkyard


## Functionalities
### User
- User is able to sign up
- User is able to log in
- User is able to log out
- User is able to edit name and email

### Garage
- User is able to list all garages
- User is able to delete a garage

### Item
- User is able to list all items
- User is able to view an item details
- User is able to create an item
- User is able to edit an item
- User is able to delete an item
- User is able to search an item from search bar in homepage

### Comments
- User is able to create a comment
- User is able to edit a comment
- User is able to delete a comment
- User is able to list all comments

## Getting Started
### Client side
1. Install all dependencies at project root folder
```
npm install
```
or
```
yarn install
```
2. Turn server on localhost:3000
```
npm start
```
or
```
yarn start
```

### Server side
##### Running database locally

1. Install postgresql with homebrew
```
brew install postgresql
```

2. Restart postgresql server
```
brew services start postgresql 

### or to have it not restart at boot time
brew services run postgresql
```

3. Set `postgres` as superuser
```
createuser postgres -s
```

4. Run postgres script
```
psql -U postgres --file junkyard_db.sql
```

5. Check whether the databasa has been succesfully created
```
psql postgres
\connect junkyarddb
```

#### Running database with Docker
1. Run postgresql container
```
docker container run --name postgresdb -e POSTGRES_PASSWORD=admin -d -p 5432:5432 postgres
```

2. Check if the container is running
```
docker container ls
```

3. Run postgresql file into postgres image
```
docker cp junkyard_db.sql postgresdb:/
docker container exec -it postgresdb bash
ls
psql -U postgres --file junkyard_db.sql 
```

#### Seed database
1. Navigate to backend folder
2. Run this script
```
psql junkyarddb < junkyard_db_seed.sql
```
#### Running service in editor (which must wait the database is connected locally)
1. Navigate to backend folder
2. Run this script
```
./mvnw spring-boot:run
```

## Libraries and dependencies
### Server side
- Spring Boot: 2.7.4 (Java v17)
- Spring Web: 5.3.22
- JDBC API: 2.7.3
- Postgres Driver: 42.3.6
- Spring Boot DevTools: 2.7.3
- Jackson FasterXML: 2.13.3
- Apache HTTPcomponents: 4.5.13
- Spring Framework Security: 5.7.3

### Client side
- @emotion/react: 11.10.4
- @emotion/styled: 11.10.4
- @mui/icons-material: 5.10.3
- @mui/joy: 5.0.0-alpha.49
- @mui/material: 5.10.4
- @mui/styled-engine-sc: 5.10.3
- @testing-library/jest-dom: 5.16.5
- @testing-library/react: 13.4.0
- @testing-library/user-event: 13.5.0
- axios: 1.0.0
- firebase: 9.10.0
- react: 18.2.0
- react-dom: 18.2.0
- react-router-dom: 6.3.0
- react-scripts: "5.0.1
- react-toastify: 9.0.8
- styled-components: 5.3.5
- web-vitals: 2.1.4
