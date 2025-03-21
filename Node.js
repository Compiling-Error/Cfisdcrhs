const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/getCsrfToken', async (req, res) => {
    try {
        const response = await fetch('https://launchpad.classlink.com/cfisd', {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': '*/*'
            },
            credentials: 'include'
        });

        const text = await response.text();
        const match = text.match(/"Csrf-Token":"(.*?)"/);
        const csrfToken = match ? match[1] : null;

        res.json({ csrfToken });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch CSRF token' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
