const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const showRoutes = require('./routes/shows');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Concert Booking API!');
});

// Use the shows route
app.use('/api/shows', showRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Proxy configuration
const proxy = "http://localhost:5000";