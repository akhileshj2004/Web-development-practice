const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all events
router.get('/', (req, res) => {
  db.query('SELECT * FROM events', (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
});

// Add an event
router.post('/', (req, res) => {
  const { name, date, description, organizer } = req.body;
  db.query(
    'INSERT INTO events (name, date, description, organizer) VALUES (?, ?, ?, ?)',
    [name, date, description, organizer],
    (err, result) => {
      if (err) res.status(500).send(err);
      else res.status(201).json({ id: result.insertId, name, date, description, organizer });
    }
  );
});

// Update an event
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, date, description, organizer } = req.body;
  db.query(
    'UPDATE events SET name = ?, date = ?, description = ?, organizer = ? WHERE id = ?',
    [name, date, description, organizer, id],
    err => {
      if (err) res.status(500).send(err);
      else res.json({ id, name, date, description, organizer });
    }
  );
});

// Delete an event
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM events WHERE id = ?', [id], err => {
    if (err) res.status(500).send(err);
    else res.json({ id });
  });
});

module.exports = router;
