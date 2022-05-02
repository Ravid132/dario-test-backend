const dbService = require('../../services/db.service');
const asyncLocalStorage = require('../../services/als.service');
const { ObjectId } = require('mongodb');

async function query(filterBy = {}) {
  try {
    // const criteria = _buildCriteria(filterBy);
    const collection = await dbService.getCollection('send_log');
    let { startDate, endDate, user, country } = filterBy;

    if (!user || user === undefined) {
      user = '';
    }
    if (!country || country === undefined) {
      country = '';
    }

    var messages = await collection
      .aggregate([
        {
          $lookup: {
            from: 'numbers',
            localField: 'num_id',
            foreignField: 'num_id',
            as: 'numbers',
          },
        },
        {
          $unwind: {
            path: '$numbers',
          },
        },
        {
          $lookup: {
            from: 'countries',
            localField: 'numbers.cnt_id',
            foreignField: 'cnt_id',
            as: 'countries',
          },
        },
        { $unwind: { path: '$countries' } },
        {
          $match: {
            $expr: {
              $cond: [
                { $eq: [country, ''] },
                true,
                { $eq: ['$countries.cnt_id', country.toString()] },
              ],
            },
          },
        },
        {
          $match: {
            $expr: {
              $cond: [
                { $eq: [user, ''] },
                true,
                { $eq: ['$usr_id', user.toString()] },
              ],
            },
          },
        },
        {
          $match: {
            log_created: {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
        {
          $group: {
            _id: { log_created: '$log_created' },
            all_success: {
              $push: '$log_success',
            },
          },
        },
      ])
      .toArray();
    return messages;
  } catch (err) {
    logger.error('cannot find messages', err);
    throw err;
  }
}

module.exports = {
  query,
};
