const express = require('express');
const cors = require('cors'); // Require the CORS package
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors()); // Add CORS middleware

// Serve static files (HTML, CSS, client-side JS) from the 'public' folder
app.use(express.static('public'));
// Endpoint to get mole data
app.get('/api/moles', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data.json'), 'utf8');
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error reading mole configuration');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});