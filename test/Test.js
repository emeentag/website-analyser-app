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
        .post('/analyse')
        .send({
          "webpage": "https://www.immobilienscout24.de/"
        })
        .end((err, res) => {
          Expect(err).to.be.null;
          Expect(res).to.have.status(200);
          done();
        });
    });

    it('should have links.', (done) => {
      Chai.request(ServerConfig.SERVER_URL)
        .post('/analyse')
        .send({
          "webpage": "https://www.immobilienscout24.de/"
        })
        .end((err, res) => {
          Expect(err).to.be.null;
          Expect(res).to.have.status(200);
          Expect(res).to.not.be.empty;
          Expect(res).to.be.json;
          Expect(res.body).to.have.property('links');
          done();
        });
    });

    it('should have version.', (done) => {
      Chai.request(ServerConfig.SERVER_URL)
        .post('/analyse')
        .send({
          "webpage": "https://www.immobilienscout24.de/"
        })
        .end((err, res) => {
          Expect(err).to.be.null;
          Expect(res).to.have.status(200);
          Expect(res).to.not.be.empty;
          Expect(res).to.be.json;
          Expect(res.body).to.have.property('version');
          done();
        });
    });

    it('should have title.', (done) => {
      Chai.request(ServerConfig.SERVER_URL)
        .post('/analyse')
        .send({
          "webpage": "https://www.immobilienscout24.de/"
        })
        .end((err, res) => {
          Expect(err).to.be.null;
          Expect(res).to.have.status(200);
          Expect(res).to.not.be.empty;
          Expect(res).to.be.json;
          Expect(res.body).to.have.property('title');
          done();
        });
    });

    it('should have headings.', (done) => {
      Chai.request(ServerConfig.SERVER_URL)
        .post('/analyse')
        .send({
          "webpage": "https://www.immobilienscout24.de/"
        })
        .end((err, res) => {
          Expect(err).to.be.null;
          Expect(res).to.have.status(200);
          Expect(res).to.not.be.empty;
          Expect(res).to.be.json;
          Expect(res.body).to.have.property('headings');
          done();
        });
    });

    it('should have login form.', (done) => {
      Chai.request(ServerConfig.SERVER_URL)
        .post('/analyse')
        .send({
          "webpage": "https://www.immobilienscout24.de/"
        })
        .end((err, res) => {
          Expect(err).to.be.null;
          Expect(res).to.have.status(200);
          Expect(res).to.not.be.empty;
          Expect(res).to.be.json;
          Expect(res.body).to.have.property('loginForm');
          done();
        });
    });
  });
});