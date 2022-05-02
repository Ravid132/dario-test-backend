const logger = require('../../services/logger.service');
// const userService = require('../user/user.service');
// const reviewService = require('./review.service');
// const toyService = require('../toy/toy.service');
// const messageService = require('../message/message.service');
const messageService = require('./message.service');

// getMessages();
async function getMessages(req, res) {
  try {
    var { params } = req.query;
    const messages = await messageService.query(JSON.parse(params));
    res.send(messages);
  } catch (err) {
    logger.error('Cannot get messages', err);
    // res.status(500).send({ err: 'Failed to get messages' });
  }
}

module.exports = {
  getMessages,
};
