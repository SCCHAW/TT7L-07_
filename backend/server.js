const express = require('express');
const sqlite = require('better-sqlite3');
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;
const dbPath = '../src/db/database.db'; // database

// Middleware to parse JSON request bodies
app.use(express.json());

// Initialize SQLite database
const db = initDatabase(dbPath);
console.log('db', db);

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
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        productName TEXT NOT NULL,
        productDescription TEXT NOT NULL,
        productPrice REAL NOT NULL,
        productYear INTEGER NOT NULL,
        productCategory TEXT NOT NULL,
        productImage TEXT
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

// Middleware to check if the users and products tables exist and create them if not
app.use((req, res, next) => {
  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        productName TEXT NOT NULL,
        productDescription TEXT NOT NULL,
        productPrice REAL NOT NULL,
        productYear INTEGER NOT NULL,
        productCategory TEXT NOT NULL,
        productImage TEXT
      );
    `);
    next();
  } catch (error) {
    console.error('Error ensuring tables exist:', error);
    res.status(500).json({ error: 'Database initialization error' });
  }
});

// Define API endpoints for users
app.get('/api/users', (req, res) => {
  const users = db.prepare('SELECT * FROM users').all();
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  res.json(user);
});

app.post('/api/users', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
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
    res.status(201).json({ message: 'User created successfully', userId: result.lastInsertRowid });
  } catch (error) {
    console.error('Error inserting user into database:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  res.status(200).json({ message: 'Login Successful', userId: user.id, firstName: user.firstName, lastName:user.lastName, email:user.email});
});

// Define API endpoints for products
// get all product endpoint
app.get('/api/products', (req, res) => {
  const products = db.prepare('SELECT * FROM products').all();
  res.json(products);
});

// get a single product endpoint
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
  res.json(product);
});

// create product endpoint
app.post('/api/products', (req, res) => {
  const { productName, productDescription, productPrice, productYear, productCategory, productImage } = req.body;
  if (!productName || !productDescription || !productPrice || !productYear || !productCategory) {
    return res.status(400).json({ error: 'All fields except productImage are required' });
  }

  const sql = `
    INSERT INTO products (productName, productDescription, productPrice, productYear, productCategory, productImage)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  try {
    const result = db.prepare(sql).run(productName, productDescription, productPrice, productYear, productCategory, productImage);
    res.status(201).json({ message: 'Product created successfully', productId: result.lastInsertRowid });
  } catch (error) {
    console.error('Error inserting product into database:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

// Update product endpoint
app.put('/api/updateProduct/:id', (req, res) => {
  const { id } = req.params;
  const { productName, productDescription, productPrice, productYear, productCategory, productImage } = req.body;
  if (!productName || !productDescription || !productPrice || !productYear || !productCategory) {
    return res.status(400).json({ error: 'All fields except productImage are required' });
  }

  const sql = `
    UPDATE products
    SET productName = ?, productDescription = ?, productPrice = ?, productYear = ?, productCategory = ?, productImage = ?
    WHERE id = ?
  `;
  try {
    db.prepare(sql).run(productName, productDescription, productPrice, productYear, productCategory, productImage, id);
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product in database:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

// delete product endpoint
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  try {
    db.prepare('DELETE FROM products WHERE id = ?').run(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product from database:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});