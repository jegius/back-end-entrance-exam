const axios = require('axios');
const Cache = require('../models/cache');

const cache = new Cache(50);

exports.getCatFact = async () => {
    const cachedFact = cache.get('facts');
    if (cachedFact) {
        return { fact: cachedFact, source: 'cache' };
    }
    const response = await axios.get('https://cat-fact.herokuapp.com/facts/random');
    const fact = response.data.text;
    cache.set('facts', fact);
    return { fact, source: 'api' };
};

exports.clearCache = () => {
    cache.clear();
};

exports.resizeCache = (newSize) => {
    cache.resize(newSize);
};
