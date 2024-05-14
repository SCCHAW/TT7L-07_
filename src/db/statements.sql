CREATE TABLE users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name TEXT NOT NULL,
   age INTEGER
)

INSERT INTO users (name , age)
VALUES 
       ("Tobi", 22),
       ("Niclolas",24)

UPDATE users
SET name = "Tobias"
WHERE name = "Tobi"

DELETE FROM users
WHERE name = "Hans"

SELECT name FROM users
WHERE id = 2

DROP TABLE users
