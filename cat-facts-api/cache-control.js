const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

class Cache {
    constructor(size) {
        this.size = size;
        this.cache = new Map();
    }

    get(key) {
        if (this.cache.has(key)) {
            return this.cache.get(key);
        }
        return null;
    }

    set(key, value) {
        if (this.cache.size >= this.size) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }

    clear() {
        this.cache.clear();
    }

    resize(newSize) {
        this.size = newSize;
        while (this.cache.size > newSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
    }
}

const cache = new Cache(5);

app.get('/', (req, res) => {
    res.send('Welcome to the Cat Facts API!');
});

app.get('/facts', async (req, res) => {
    const cachedFact = cache.get('facts');
    if (cachedFact) {
        return res.json({fact: cachedFact, source: 'cache'});
    }
    try {
        const response = await axios.get('https://cat-fact.herokuapp.com/facts/random');
        const fact = response.data.text;
        cache.set('facts', fact);
        res.json({fact, source: 'api'});
    } catch (error) {
        console.error('Error fetching cat fact:', error);
        res.status(500).json({error: 'Failed to fetch cat fact'});
    }
});

app.post('/clear-cache', (req, res) => {
    cache.clear();
    res.json({message: 'Cache cleared'});
});

app.post('/resize-cache', (req, res) => {
    const newSize = parseInt(req.query.size, 10);
    if (isNaN(newSize) || newSize <= 0) {
        return res.status(400).json({error: 'Invalid cache size'});
    }
    cache.resize(newSize);
    res.json({message: 'Cache resized to ${newSize}'});
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});