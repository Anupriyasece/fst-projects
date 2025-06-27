const express = require('express');
const router = express.Router();

// Mock data
const shows = [
  { id: 1, name: 'Rock Night', location: 'New York', date: '2025-06-01' },
  { id: 2, name: 'Jazz Evening', location: 'Chicago', date: '2025-06-15' },
];

// Get all shows
router.get('/', (req, res) => {
  res.json(shows);
});

module.exports = router;