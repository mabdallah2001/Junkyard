# ELEC5619 - Junkyard

### Running database
#### 1. Locally

1. Install postgresql with homebrew
```
$ brew install postgresql
```

2. Restart postgresql server
```
$ brew services start postgresql 

### or to have it not restart at boot time
$ brew services run postgresql
```

3. Set `postgres` as superuser
```
$ createuser postgres -s
```

4. Run postgres script
```
$ psql -U postgres --file junkyard_db.sql
```

5. Check whether the databasa has been succesfully created
```
$ psql postgres
$ \connect junkyard_db
```

#### 2. With Docker
1. Run postgresql container
```
$ docker container run --name postgresdb -e POSTGRES_PASSWORD=admin -d -p 5432:5432 postgres
```

2. Check if the container is running
```
$ docker container ls
```

3. Run postgresql file into postgres image
```
$ docker cp junkyard_db.sql postgresdb:/
$ docker container exec -it postgresdb bash
$ ls
$ psql -U postgres --file junkyard_db.sql 
```
