const express = require('express');
const router = express.Router();

const ads = require('../controllers/ads.controller');

router.get('/ads', ads.getAll);
router.post('/ads', ads.addAd);
router.get('/ads/:id', ads.getById);
router.delete('/ads/:id', ads.Delete);
router.put('/ads/:id', ads.Edit);
router.get('/ads/search/:id', ads.Search);

module.exports = router;