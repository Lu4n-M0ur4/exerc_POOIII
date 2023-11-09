-- Active: 1699379731993@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        created_at TEXT NOT NULL
    );

INSERT INTO
    users (id, name, created_at)
VALUES (
        'u001',
        'Fulano',
        '2023-10-30T21:15:45.120Z'
    ), (
        'u002',
        'Beltrana',
        '2023-10-30T21:16:20.420Z'
    );

CREATE TABLE
    courses (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT UNIQUE NOT NULL,
        leasons INTEGER NOT NULL
    );
DROP TABLE courses;
INSERT INTO
    courses (id, name, leasons)
VALUES ('c001', 'Javascript', 5), ('c002', 'React', 10), ('c003', 'Typescript', 15);