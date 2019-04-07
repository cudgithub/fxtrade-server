const express = require('express');
const router = express.Router();
const { randomize } = require('../lib/trading-randomizer');

module.exports = (dataSource) => {

	/* GET trading listing. */
	function getTrading(req, res, next) {
		const randomizedData = randomize(dataSource.tradingData);
		res.send(randomizedData);
	}

	router.get('/', getTrading);

	return router;
};
