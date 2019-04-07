const pairsConfig = require('../data/currencies-pairs-config');
const DEFAULT_PAIR_CONFIG = { buyFractionDigits: 4, sellFractionDigits: 4 };

function randomizeTradingData(oldTradingData) {

	for (let pair of oldTradingData) {
		const pairConfig = pairsConfig[pair.pair] || DEFAULT_PAIR_CONFIG;
		const trend = Math.random() < 0.5 ? 1 : -1;
		pair.buy = randomizeAmount(pair.buy, trend, pairConfig.buyFractionDigits);
		pair.sell = randomizeAmount(pair.sell, trend, pairConfig.sellFractionDigits);
	}

	return oldTradingData;
}

function randomizeAmount(value, trend, fractionDigits) {
	const randomizedValue = value + value  * Math.random() / 10 * trend;
	const normalizedValue = Number.parseFloat(randomizedValue).toFixed(fractionDigits);
	return parseFloat(normalizedValue);
}

module.exports = {
	randomize: randomizeTradingData,
};
