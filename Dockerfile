FROM postgres:latest

COPY ./scripts/create_db.sh     /docker-entrypoint-initdb.d/10-create_db.sh
