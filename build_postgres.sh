#!/bin/bash

docker build -t alemanoelsilva/postgres_mochila_router ./scripts

docker run --name postgres -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres123 -d alemanoelsilva/postgres_mochila_router
