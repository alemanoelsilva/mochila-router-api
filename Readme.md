# Configuration by run application


## To initialize the application. 

### Create an `.env` file 

```
NODE_ENV=development

POSTGRES_DATABASE=mochilarouter
POSTGRES_DATABASE_TEST=mochilarouter_test
POSTGRES_USER=postgres
POSTGRES_PASS=postgres123

PORT=4000
```

## Working with Postgres on Docker

### Create an image of Personalize Postgres

```bash
docker build -t your_username_dockerhub/postgres .
```

### Execute to command

```bash
docker run --name alemanoelsilva-postgres -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres123 -d alemanoelsilva/postgres
```

### Postgres 

#### To conect with Docker 

```bash
docker exec -it name_image_postgres bash

psql -h localhost -U user_postgres -W

# password required
```

#### How to change of database by line comand

```
\l --> to list of databases
\c database_name --> to change of database
\d --> to list of tables
```
