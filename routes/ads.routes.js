const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');
const ads = require('../controllers/ads.controller');

router.get('/ads', ads.getAll);
router.post('/ads', imageUpload.single('image'), authMiddleware, ads.addAd);
router.get('/ads/:id', ads.getById);
router.delete('/ads/:id', authMiddleware, ads.Delete);
router.put('/ads/:id',imageUpload.single('image'), authMiddleware, ads.Edit);
router.get('/ads/search/:id', ads.Search);

module.exports = router;