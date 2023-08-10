DROP DATABASE IF EXISTS snack_app;

CREATE DATABASE snack_app;

\c snack_app;

DROP TABLE IF EXISTS snacks;


CREATE TABLE snacks (
    id SERIAL PRIMARY KEY, 
    name TEXT NOT NULL,
    fiber INT NOT NULL,
    protein INT NOT NULl,
    added_sugar INT,
    is_healthy BOOLEAN,
    image_url VARCHAR(500)
);

