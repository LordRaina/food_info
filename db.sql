CREATE TABLE user (
    id INTEGER PRIMARY KEY,
    login TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);