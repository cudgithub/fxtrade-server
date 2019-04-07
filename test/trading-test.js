const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);
describe('trading', () => {

	/*
	* Test the /GET route
	*/
	describe('/GET trading', () => {
		it('it should GET all the trading data', (done) => {
			chai.request(server)
				.get('/trading')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(6);
					done();
				});
		});
	});

	describe('/GET trading continuous responses', () => {
		const threshold = 0.1;
		let previousData;

		beforeEach((done) => {
			chai.request(server)
				.get('/trading')
				.end((err, res) => {
					previousData = res.body;
					done();
				});
		});

		for (let i = 0; i<10; i++) {
			it('it should GET all trading data with proper delta', (done) => {
				chai.request(server)
					.get('/trading')
					.end((err, res) => {
						res.should.have.status(200);
						const tradingData = res.body;
						for (let j = 0; j<tradingData.length; j++) {
							tradingData[0].buy.should.be.within(previousData[0].buy - previousData[0].buy * 0.1, previousData[0].buy + previousData[0].buy * threshold);
							tradingData[0].sell.should.be.within(previousData[0].sell - previousData[0].sell * 0.1, previousData[0].sell + previousData[0].sell * threshold);
						}
						
						previousData = tradingData;
						done();
					});
			});
		}
	});
});
