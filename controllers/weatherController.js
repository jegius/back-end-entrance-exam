const axios = require('axios');
const Cache = require('../services/cacheService');
const cache = new Cache(10);

exports.getWeather = async (req, res) => {
  const { city } = req.query;
  if (cache.get(city)) {
    console.log('Получаем информацию о городе из кеша:', city);
    return res.json(cache.get(city));
  }
  try {
    console.log('Получаем информацию о городе с API:', city);
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const response = await axios.get(
      'http://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          q: city,
          appid: apiKey,
        },
      }
    );
    cache.set(city, response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Ошибка получения информацию о городе с API:', error.message);
    res.status(500).send('Ошибка получения данных');
  }
};

exports.clearCache = (req, res) => {
  cache.clear();
  res.send('Кеш очищен');
};

exports.setCacheSize = (req, res) => {
  const { size } = req.query;
  cache.setSize(Number(size));
  res.send('Размер кеша обновлён');
};
