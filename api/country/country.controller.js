const logger = require('../../services/logger.service');
const countryService = require('./country.service');

async function getCountries(req, res) {
  try {
    // console.log(JSON.parse(params));
    const countries = await countryService.query();
    res.send(countries);
  } catch (err) {
    logger.error('Cannot get countries', err);
    // res.status(500).send({ err: 'Failed to get messages' });
  }
}

module.exports = {
  getCountries,
};
