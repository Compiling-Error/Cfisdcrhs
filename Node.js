const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

app.get('/getCsrfToken', async (req, res) => {
    try {
        const response = await fetch('https://launchpad.classlink.com/cfisd', { credentials: 'include' });
        const text = await response.text();
        const match = text.match(/"Csrf-Token":"(.*?)"/);
        const csrfToken = match ? match[1] : null;
        
        res.json({ csrfToken });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch CSRF token' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
