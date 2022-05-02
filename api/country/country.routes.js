const express = require('express');
const {
  requireAuth,
  requireAdmin,
} = require('../../middlewares/requireAuth.middleware');
const { log } = require('../../middlewares/logger.middleware');
const { getCountries } = require('./country.controller');
const router = express.Router();

// router.get('/', log, getReviews);
router.get('/', getCountries);

module.exports = router;
