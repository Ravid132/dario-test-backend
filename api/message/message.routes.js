const express = require('express');
const {
  requireAuth,
  requireAdmin,
} = require('../../middlewares/requireAuth.middleware');
const { log } = require('../../middlewares/logger.middleware');
const { getMessages } = require('./message.controller');
const router = express.Router();

router.get('/', getMessages);

module.exports = router;
