const catFactsService = require('../services/catFactsService');

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message
 *     responses:
 *       200:
 *         description: Welcome to the Cat Facts API!
 */
exports.welcome = (req, res) => {
    res.send('Welcome to the Cat Facts API!');
};

/**
 * @swagger
 * /facts:
 *   get:
 *     summary: Get a random cat fact
 *     responses:
 *       200:
 *         description: A random cat fact
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fact:
 *                   type: string
 *                 source:
 *                   type: string
 */
exports.getCatFact = async (req, res) => {
    try {
        const fact = await catFactsService.getCatFact();
        res.json(fact);
    } catch (error) {
        console.error('Error fetching cat fact:', error);
        res.status(500).json({ error: 'Failed to fetch cat fact' });
    }
};

/**
 * @swagger
 * /clear-cache:
 *   post:
 *     summary: Clear the cache
 *     responses:
 *       200:
 *         description: Cache cleared
 */
exports.clearCache = (req, res) => {
    catFactsService.clearCache();
    res.json({ message: 'Cache cleared' });
};

/**
 * @swagger
 * /resize-cache:
 *   post:
 *     summary: Resize the cache
 *     parameters:
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         required: true
 *         description: New size of the cache
 *     responses:
 *       200:
 *         description: Cache resized
 *       400:
 *         description: Invalid cache size
 */
exports.resizeCache = (req, res) => {
    const newSize = parseInt(req.query.size, 10);
    if (isNaN(newSize) || newSize <= 0) {
        return res.status(400).json({ error: 'Invalid cache size' });
    }
    catFactsService.resizeCache(newSize);
    res.json({ message: `Cache resized to ${newSize}` });
};
