/* eslint-disable no-console */
/* eslint-disable no-undef */
const chai = require('chai');
// const { expect, done } = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const server = require('../server');

const url = '/api/v1/login';

chai.use(chaiHttp);
chai.should();

describe('validate login input', () => {
    it('should check if login is valid if email is empty', (done) => {
      chai.request(server)
        .post(url)
        .send({
          email: '',
          password: '',
        })
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(400);
          res.body.message.should.be.equal('email cannot be empty');
          done();
        });
    });
});
  
describe('validate login input', () => {
    it('should check if login is valid if password is empty', (done) => {
      chai.request(server)
        .post(url)
        .send({
          email: faker.internet.email(),
          password: '',
        })
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(400);
          res.body.message.should.be.equal('password cannot be empty');
          done();
        });
    });
});
  
describe('validate login input', () => {
    it('should check if login is valid if email is invalid', (done) => {
      chai.request(server)
        .post(url)
        .send({
          email: 'lovinjerry004',
          password: 'test',
        })
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(400);
          res.body.message.should.be.equal('invalid email address');
          done();
        });
    });
});
  