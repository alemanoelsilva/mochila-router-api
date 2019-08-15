#!/bin/bash
set -e
POSTGRES="psql --username postgres"

echo "Creating database mochilarouter"

$POSTGRES <<EOSQL
CREATE DATABASE mochilarouter OWNER postgres;
EOSQL

echo "Creating database mochilarouter_test"

$POSTGRES <<EOSQL
CREATE DATABASE mochilarouter_test OWNER postgres;
EOSQL