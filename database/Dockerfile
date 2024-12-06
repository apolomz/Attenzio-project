FROM postgres:14
COPY ./db/databases.sql /docker-entrypoint-initdb.d/00_databases.sql
COPY ./db/schema.sql /docker-entrypoint-initdb.d/01_schema.sql
COPY ./db/plpsql.sql /docker-entrypoint-initdb.d/02_data.sql