class DataSource {

	constructor(tradingData) {
		this._tradingData = tradingData;
	}

	get tradingData() {
		return this._tradingData;
	}

	set tradingData(tradingData) {
		this._tradingData = tradingData;
	}
}

module.exports = DataSource;
