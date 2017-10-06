import Chai from 'chai';
import ChaiClient from 'chai-http';
import Validator from 'validator';
import ServerConfig from '../src/server/config/ServerConfig';

var Expect = Chai.expect;
Chai.use(ChaiClient);

describe('Website Analyser Test Suit', () => {
  describe('Test without view input.', () => {
    it('should return 200OK', (done) => {
      Chai.request(ServerConfig.SERVER_URL)
        .get('/analyse')
        .end((err, res) => {
          Expect(err).to.be.null;
          Expect(res).to.have.status(200);
          done();
        });
    })
  })
});