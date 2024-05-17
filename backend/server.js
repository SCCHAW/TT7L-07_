// server.js
const express = require('express');
const sqlite = require('better-sqlite3');
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcrypt');


const app = express();
const PORT = process.env.PORT || 3000;
const dbPath = '../src/db/database.db'; //databse

// Middleware to parse JSON request bodies
app.use(express.json());

// Initialize SQLite database
const db = initDatabase(dbPath);
console.log('db', db)


function initDatabase(dbPath) {
    // Check if the database file exists
    if (!fs.existsSync(dbPath)) {
      console.log('Creating database...');
      // If it doesn't exist, create the database file and the necessary tables
      const newDb = sqlite(dbPath);
      newDb.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          firstName TEXT NOT NULL,
          lastName TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        );
      `);
      newDb.close(); // Close the database connection
      console.log('Database created successfully');
    }
    // Return the database instance
    return sqlite(dbPath);
  }

  const corsOptions = {
    origin: '*',
  };
  
  app.use(cors(corsOptions));
  app.use(express.json());

  // Middleware to check if the users table exists and create it if not
app.use((req, res, next) => {
    try {
        db.prepare(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        );`).run();
        next();
    } catch (error) {
        console.error('Error ensuring users table exists:', error);
        res.status(500).json({ error: 'Database initialization error' });
    }
});


// Define API endpoints
app.get('/api/users', (req, res) => {
  const users = db.prepare('SELECT * FROM users').all();
  res.json(users);
});


app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  res.json(user);
});


// Define route to handle POST requests to create new users
app.post('/api/users', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password ) {
      return res.status(400).json({ error: 'All fields are required' }); // request contains bad syntax or cannot be fulfull
    }

     // Check if the email already exists in the database
  const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (existingUser) {
    return res.status(409).json({ error: 'Email already exists, use another email' });
  }

   // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    
    
    // Insert the new user into the database
    const sql = `
      INSERT INTO users (firstName, lastName, email, password)
      VALUES (?, ?, ?, ?)
    `;
    try {
      const result = db.prepare(sql).run(firstName, lastName, email, hashedPassword);
      res.status(201).json({ message: 'User created successfully', userId: result.lastInsertRowid, firstName: result });
    } catch (error) {
      console.error('Error inserting user into database:', error);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  });


  //define the route to Login the user using email & password
  app.post('/api/login', async (req, res)=> {
       const {email, password} = req.body;
       if(!email || !password){
        return res.status(400).json({ error: 'Email and password are required' }); 
       }

       const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
       if(!user){
        return res.status(401).json({error: "Invalid email or password"})
       }

       const passwordMatch = await bcrypt.compare(password, user.password)
       if(!passwordMatch){
        return res.status(401).json({error: 'Invalid email or password'})
       }

       res.status(200).json({message: 'Login Successful', userId: user.id, firstName: user.firstName})

  });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});