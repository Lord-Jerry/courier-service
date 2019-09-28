/* eslint-disable no-console */
/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';
const chai = require('chai');
// const { expect, done } = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const bcrypt = require('bcryptjs');
const server = require('../server');
const { Users } = require('../models');

const url = '/api/v1/login';
const hash = bcrypt.hashSync;

chai.use(chaiHttp);
chai.should();

const createUser = () => {
  Users.create({
    email: 'john004@gmail.com', password: hash('johnp', 10), firstname: 'John', lastname: 'Doe', gender: 'male', isAdmin: false,
  });
};

describe('User Login', () => {
  before((done) => {
    createUser();
    console.log('before');
    done();
  });

  after((done) => {
    console.log('after');
    Users.destroy({
      where: {},
      truncate: true,
    });
    done();
  });

  it('should check if login is valid if email is empty', (done) => {
    chai.request(server)
      .post(url)
      .send({
        email: '',
        password: '',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.equal('email cannot be empty');
        done();
      });
  });

  it('should check if login is valid if password is empty', (done) => {
    chai.request(server)
      .post(url)
      .send({
        email: faker.internet.email(),
        password: '',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.equal('password cannot be empty');
        done();
      });
  });


  it('should check if login is valid if email is invalid', (done) => {
    chai.request(server)
      .post(url)
      .send({
        email: 'lovinjerry004',
        password: 'test',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.equal('invalid email address');
        done();
      });
  });

  it('should check if login works', (done) => {
    chai.request(server)
      .post(url)
      .send({
        email: 'john004@gmail.com',
        password: 'johnp',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.be.equal('logged in');
        done();
      });
  });
});
