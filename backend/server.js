const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 5000;

// SQLite-Datenbankverbindung
const db = new sqlite3.Database('./credentials.db');

// Middleware
app.use(express.json());

// Tabelle für Microcredentials erstellen
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS credentials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      category TEXT,
      skills TEXT,
      eqfLevel INTEGER
    )
  `);
});

// POST-Route für das Speichern eines neuen Microcredentials
app.post('/api/credentials', (req, res) => {
  const { title, description, category, skills, eqfLevel } = req.body;

  const stmt = db.prepare('INSERT INTO credentials (title, description, category, skills, eqfLevel) VALUES (?, ?, ?, ?, ?)');
  stmt.run(title, description, category, skills.join(','), eqfLevel, function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, title, description, category, skills, eqfLevel });
  });
  stmt.finalize();
});

// Server starten
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
