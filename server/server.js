const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, client-side JS)
app.use(express.static('public'));

// Endpoint to get mole data
app.get('/api/moles', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).send('Error reading mole configuration');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});