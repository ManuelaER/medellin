DROP DATABASE IF EXISTS medellin;
CREATE DATABASE medellin;

\connect medellin

DROP TABLE IF EXISTS activities;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

-- Stores info about each activity
CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL
);

-- Tracks which user favorited which activity
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER  NOT NULL REFERENCES users (id),
    activity_id INTEGER NOT NULL REFERENCES activities (id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
