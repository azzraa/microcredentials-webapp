const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 4000;
const SECRET = 'your_secret_key';
const db = new sqlite3.Database(':memory:');

app.use(cors());
app.use(express.json({ type: ['application/json', 'application/ld+json'] }));

const upload = multer({ dest: 'uploads/' });

// Initialize database
db.serialize(() => {
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT,
    role TEXT
  )`);
  db.run(`CREATE TABLE credentials (id INTEGER PRIMARY KEY AUTOINCREMENT, jsonld TEXT)`);
  db.run(`CREATE TABLE applications (id INTEGER PRIMARY KEY AUTOINCREMENT, credentialId INTEGER, userName TEXT, comment TEXT, filePath TEXT, status TEXT)`);

  // Insert users with roles
  db.run(`INSERT INTO users (username, password, role) VALUES ('evaluator', 'password', 'evaluator')`);
  db.run(`INSERT INTO users (username, password, role) VALUES ('creator', 'password', 'creator')`);
  db.run(`INSERT INTO users (username, password, role) VALUES ('user', 'password', 'user')`);
});

db.all('SELECT * FROM users', (err, rows) => {
  if (err) {
    console.error('DB Fehler beim Lesen der Nutzer:', err);
  } else {
    console.log('Benutzer in DB:', rows);
  }
});

// JWT Auth Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Login Route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', username, password);
  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, user) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ error: 'DB error' });
    }
    if (user) {
      console.log('User found:', user);
      const token = jwt.sign({ username: user.username, role: user.role }, SECRET, { expiresIn: '1h' });
      console.log('Token created:', token);
      res.json({ token });
    } else {
      console.log('Invalid credentials for:', username);
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});


// Credential CRUD
app.post('/api/credentials', authenticateToken, (req, res) => {
  const jsonld = JSON.stringify(req.body);
  db.run('INSERT INTO credentials (jsonld) VALUES (?)', [jsonld], function (err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.status(201).json({ id: this.lastID });
  });
});

app.get('/api/credentials', (req, res) => {
  db.all('SELECT id, jsonld FROM credentials', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(rows.map(row => ({ id: row.id, ...JSON.parse(row.jsonld) })));
  });
});

// Application Submit with File Upload
app.post('/api/credentials/:id/applications', upload.single('file'), (req, res) => {
  const { userName, comment } = req.body;
  const filePath = req.file ? req.file.path : null;
  db.run('INSERT INTO applications (credentialId, userName, comment, filePath, status) VALUES (?, ?, ?, ?, ?)', [req.params.id, userName, comment, filePath, 'pending'], function(err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.status(201).json({ id: this.lastID });
  });
});

// Evaluator GET and PATCH
app.get('/api/applications', authenticateToken, (req, res) => {
  db.all(`SELECT applications.id, userName, comment, filePath, status, credentials.jsonld as credential FROM applications JOIN credentials ON applications.credentialId = credentials.id WHERE status = 'pending'`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(rows.map(row => ({
      id: row.id,
      userName: row.userName,
      comment: row.comment,
      filePath: row.filePath,
      status: row.status,
      credentialName: JSON.parse(row.credential).name
    })));
  });
});

app.patch('/api/applications/:id', authenticateToken, (req, res) => {
  const { status } = req.body;
  db.run('UPDATE applications SET status = ? WHERE id = ?', [status, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ success: true });
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
