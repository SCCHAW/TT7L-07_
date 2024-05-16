const db = require('better-sqlite3')('database.db')

const createTable = () => {
    const sql = `
        CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE ,
        password  TEXT NOT NULL,
    )
    ` 
    db.prepare(sql).run()
}

const insertTable = (firstname, lastname, email, password ) => {
    const sql = `
         INSERT INTO users (firstname, lastname, email, password)
         VALUES (?,?,?,?)
    `
    db.prepare(sql).run(firstname, lastname, email, password)

}

insertTable()

const getAllUsers = () => {
    const sql = `
         SELECT * FROM users
    `
    const rows = db.prepare(sql).all()
    console.log(rows);
}

const getUsers = (id) => {
    const sql = `
         SELECT * FROM users
         WHERE id = ?
        `
    
    const rows = db.prepare(sql).all(id)
    console.log(rows);
}


