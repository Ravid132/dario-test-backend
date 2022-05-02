const dbService = require('../../services/db.service');
const asyncLocalStorage = require('../../services/als.service');
const { ObjectId } = require('mongodb');

async function query() {
  try {
    const collection = await dbService.getCollection('users');

    var users = await collection.find({}).toArray();
    return users;
  } catch (err) {
    logger.error('cannot find countries', err);
    throw err;
  }
}

module.exports = {
  query,
};
