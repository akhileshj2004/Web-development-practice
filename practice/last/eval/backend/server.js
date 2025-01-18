const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const eventsRoutes = require('./routes/events');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/events', eventsRoutes);

// Start server
app.listen(3002, () => {
  console.log('Server running on http://localhost:3002');
});
