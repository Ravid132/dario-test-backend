const express = require('express');
const {
  requireAuth,
  requireAdmin,
} = require('../../middlewares/requireAuth.middleware');
const { log } = require('../../middlewares/logger.middleware');
const { getUsers } = require('./user.controller');
const router = express.Router();

// router.get('/', log, getReviews);
router.get('/', getUsers);

module.exports = router;
