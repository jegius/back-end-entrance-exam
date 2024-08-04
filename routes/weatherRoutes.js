const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

/**
 * @swagger
 * /weather:
 *   get:
 *     summary: Получить информацию о погоде
 *     parameters:
 *       - in: query
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Запрос успешен
 */
router.get('/weather', weatherController.getWeather);

/**
 * @swagger
 * /cache/clear:
 *   post:
 *     summary: Очистить кеш
 *     responses:
 *       200:
 *         description: Кеш очищен
 */
router.post('/cache/clear', weatherController.clearCache);

/**
 * @swagger
 * /cache/size:
 *   post:
 *     summary: Установить размер кеша
 *     parameters:
 *       - in: query
 *         name: size
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Размер кеша обновлен
 */
router.post('/cache/size', weatherController.setCacheSize);

module.exports = router;
