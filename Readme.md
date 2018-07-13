# Configuration by run application


## To initialize the application. 

### Create an `.env` file 

```
NODE_ENV=development

POSTGRES_DATABASE=mochilaRouter
POSTGRES_USER=postgres
POSTGRES_PASS=postgres123

PORT=4000
```

## Working with Postgres on Docker

### Execute to command

```
docker run --name some-postgres -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres123 -e POSTGRES_DB=mochilaRouter -d postgres
```

### Postgres 

#### To conect with Docker 

```
docker exec -it name_image_postgres bash

psql -h localhost -U user_postgres -W

password required
```

#### How to change of database by line comand

```
\l --> to list of databases
\c database_name --> to change of database
\d --> to list of tables
```
