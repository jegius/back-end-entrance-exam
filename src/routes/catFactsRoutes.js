const express = require('express');
const catFactsController = require('../controllers/catFactsController');

const router = express.Router();

router.get('/', catFactsController.welcome);
router.get('/facts', catFactsController.getCatFact);
router.post('/clear-cache', catFactsController.clearCache);
router.post('/resize-cache', catFactsController.resizeCache);

module.exports = router;
