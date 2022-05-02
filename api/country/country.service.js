const dbService = require('../../services/db.service');
const asyncLocalStorage = require('../../services/als.service');
const { ObjectId } = require('mongodb');

async function query() {
  try {
    // const criteria = _buildCriteria(filterBy);
    const collection = await dbService.getCollection('countries');

    var countries = await collection.find({}).toArray();
    return countries;
  } catch (err) {
    logger.error('cannot find countries', err);
    throw err;
  }
}

// function _buildCriteria(filterBy) {
//   // const { toyId, userId } = filterBy;
//   console.log(filterBy);
//   const { startDate, endDate } = filterBy;

//   //   console.log('start', startDate);
//   //   console.log('end', endDate);

//   const criteria = [];

//   //   criteria.push({ log_created: { $gte: startDate, $lte: endDate } });
//   //   if (!startDate && !endDate) return {};
//   // if (toyId) {
//   //   criteria.push({ toyId: ObjectId(toyId) });
//   // }
//   // if (userId) {
//   //   criteria.push({ userId: ObjectId(userId) });
//   // }
//   //   criteria.push({ num_id: ObjectId('626d03262e8b8212903751dd') });
//   return { $and: criteria };
//   //   return criteria;
// }

// async function remove(reviewId) {
//   try {
//     const store = asyncLocalStorage.getStore();
//     const { userId, isAdmin } = store;
//     const collection = await dbService.getCollection('review');
//     const criteria = { _id: ObjectId(reviewId) };
//     if (!isAdmin) criteria.userId = ObjectId(userId);
//     await collection.deleteOne(criteria);
//   } catch (err) {
//     logger.error(`cannot remove review ${reviewId}`, err);
//     throw err;
//   }
// }

// async function add(review) {
//   try {
//     const reviewToAdd = {
//       userId: ObjectId(review.userId),
//       toyId: ObjectId(review.toyId),
//       comment: review.comment,
//       rating: review.rating,
//       createdAt: new Date(),
//     };
//     const collection = await dbService.getCollection('review');
//     await collection.insertOne(reviewToAdd);
//     return reviewToAdd;
//   } catch (err) {
//     logger.error('cannot insert review', err);
//     throw err;
//   }
// }

module.exports = {
  query,
};
