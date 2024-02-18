#!/bin/bash

# Database credentials and details
DB_USER="postgres"
DB_PASSWORD="postgres"
DB_HOST="localhost"
DB_PORT="5000"
DB_NAME="auth"

# Export password to avoid the prompt by psql
export PGPASSWORD=$DB_PASSWORD

# Check if the database exists
db_exists=$(psql -U $DB_USER -h $DB_HOST -p $DB_PORT -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'")

# Create the database if it doesn't exist
if [ "$db_exists" != "1" ]; then
    echo "Database does not exist. Creating..."
    createdb -U $DB_USER -h $DB_HOST -p $DB_PORT $DB_NAME
else
    echo "Database already exists."
fi

# Run migrations
migrate -path="../Mig" -database postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME?sslmode=disable up
