const logger = require('../../services/logger.service');
const userService = require('./user.service');

async function getUsers(req, res) {
  try {
    const users = await userService.query();
    res.send(users);
  } catch (err) {
    logger.error('Cannot get users', err);
    // res.status(500).send({ err: 'Failed to get messages' });
  }
}

module.exports = {
  getUsers,
};
