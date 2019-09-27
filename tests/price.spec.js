/* eslint-disable no-console */
/* eslint-disable no-undef */
const chai = require('chai');
// const { expect, done } = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const server = require('../server');

const url = '/api/v1/set-price';

chai.use(chaiHttp);
chai.should();

describe('validate setting price for courier service', () => {
  it('check if users that are not authenticated can set price', (done) => {
    chai.request(server)
      .post(url)
      .set('token', '')
      .send({
        email: '',
        password: '',
      })
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(401);
        done();
      });
  });
});
