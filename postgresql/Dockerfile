FROM postgres:alpine

WORKDIR /docker-entrypoint-initdb.d 
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=ride_hailing_db
COPY ./data .