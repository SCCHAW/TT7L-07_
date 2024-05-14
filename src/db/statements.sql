CREATE TABLE users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name TEXT NOT NULL,
   age INTEGER
)

INSERT INTO users (name , age)
VALUES 
       ("Tobi", 22),
       ("Niclolas",24),
       ("Peggy",70),
       ("Ruby",56)

UPDATE users
SET name = "Tobias"
WHERE name = "Tobi"

DELETE FROM users
WHERE name = "Niclolas"

SELECT * FROM users



