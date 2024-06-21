const express = require('express');
const sqlite = require('better-sqlite3');
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcrypt');

const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;
const dbPath = '../src/db/database.db'; // database

// Middleware to parse JSON request bodies
app.use(express.json());

// Initialize SQLite database
const db = initDatabase(dbPath);
console.log('db', db);

// Function to check if a column exists
function columnExists(db, tableName, columnName) {
  const stmt = db.prepare(`
    SELECT COUNT(*)
    FROM pragma_table_info('${tableName}')
    WHERE name = '${columnName}'
  `);
  const result = stmt.get();
  return result['COUNT(*)'] > 0;
}

// Add column if it doesn't exist
const tableName = 'products';
const columnName = 'productLink';

if (!columnExists(db, tableName, columnName)) {
  db.prepare(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} TEXT`).run();
}

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
        productImage TEXT,
        productLink TEXT
      );
      CREATE TABLE IF NOT EXISTS password_resets (
        email TEXT NOT NULL,
        token TEXT NOT NULL,
        expiration INTEGER NOT NULL
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
        productImage TEXT,
        productLink TEXT
      );
      CREATE TABLE IF NOT EXISTS password_resets (
        email TEXT NOT NULL,
        token TEXT NOT NULL,
        expiration INTEGER NOT NULL
      );

    `);
    next();
  } catch (error) {
    console.error('Error ensuring tables exist:', error);
    res.status(500).json({ error: 'Database initialization error' });
  }
});

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'sweeneychaw@gmail.com',
    pass: 'talu jmff cfoa myrp'
  },
  tls: {
    rejectUnauthorized: false
  },
  logger: true, 
  debug: true  
});

// Forgot Password Endpoint
app.post('/api/forgot-password', (req, res) => {
  const { email } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const token = crypto.randomBytes(32).toString('hex'); //create a token for the user
  const expiration = Date.now() + 3600000; // 1 hour expiration

  db.prepare('INSERT INTO password_resets (email, token, expiration) VALUES (?, ?, ?)')
    .run(email, token, expiration);

    const imageIcon = 'https://images.unsplash.com/photo-1641359255145-9af4ff37a4f5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  const mailOptions = {
    from: 'sweeneychaw@gmail.com',
    to: email,
    subject: 'Password Reset',
    html: `
    <div style="text-align: center; font-family: Arial, sans-serif;">
      <img src=${imageIcon} alt="Icon" style="width: 200px; height: 200px;" />
      <h2>Treasure Hunt Password Reset Request</h2>
      <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
      <p>Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:</p>
      <a href="http://localhost:3001/reset-password/${token}" style="display: inline-block; padding: 10px 20px; color: white; background-color: blue; text-decoration: none; border-radius: 5px;">Reset Password</a>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
    </div>
  `,
    // text: You requested a password reset. Click the link to reset your password: ${resetLink}
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: 'Error sending email' });
    }
    res.status(200).json({ message: 'Password reset email sent' });
  });
});

// Reset Password Endpoint
app.post('/api/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const resetRequest = db.prepare('SELECT * FROM password_resets WHERE token = ?').get(token);

  if (!resetRequest || resetRequest.expiration < Date.now()) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.prepare('UPDATE users SET password = ? WHERE email = ?')
    .run(hashedPassword, resetRequest.email);

  db.prepare('DELETE FROM password_resets WHERE token = ?').run(token);

  res.status(200).json({ message: 'Password reset successfully' });
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
  const { productName, productDescription, productPrice, productYear, productCategory, productImage, productLink } = req.body;
  if (!productName || !productDescription || !productPrice || !productYear || !productCategory || !productLink ) {
    return res.status(400).json({ error: 'All fields except productImage are required' });
  }

  const sql = `
    INSERT INTO products (productName, productDescription, productPrice, productYear, productCategory, productImage, productLink)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  try {
    const result = db.prepare(sql).run(productName, productDescription, productPrice, productYear, productCategory, productImage, productLink);
    res.status(201).json({ message: 'Product created successfully', productId: result.lastInsertRowid });
  } catch (error) {
    console.error('Error inserting product into database:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});


// Update product endpoint
app.put('/api/updateProduct/:id', (req, res) => {
  const { id } = req.params;
  const { productName, productDescription, productPrice, productYear, productCategory, productImage, productLink } = req.body;
  if (!productName || !productDescription || !productPrice || !productYear || !productCategory || !productLink) {
    return res.status(400).json({ error: 'All fields except productImage are required' });
  }

  const sql = `
    UPDATE products
    SET productName = ?, productDescription = ?, productPrice = ?, productYear = ?, productCategory = ?, productImage = ?, productLink = ?
    WHERE id = ?
  `;
  try {
    db.prepare(sql).run(productName, productDescription, productPrice, productYear, productCategory, productImage, productLink, id);
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