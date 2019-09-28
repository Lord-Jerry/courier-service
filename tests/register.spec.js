/* eslint-disable no-console */
/* eslint-disable no-undef */
const chai = require('chai');
// const { expect, done } = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const bcrypt = require('bcryptjs');
const server = require('../server');
const { Users } = require('../models');

const url = '/api/v1/register';
process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.should();

const hash = bcrypt.hashSync;

const createUser = () => {
  Users.create({
    email: 'john@gmail.com', password: hash('johnp', 10), firstname: 'John', lastname: 'Doe', gender: 'male', isAdmin: false,
  });
};

describe('User Registration', () => {
  before((done) => {
    createUser();
    done();
  });

  after((done) => {
    Users.destroy({
      where: {},
      truncate: true,
    });
    done();
  });

  it('should check if registration is valid without firstname', (done) => {
    chai.request(server)
      .post(url)
      .send({
        lastname: '',
        username: '',
        email: '',
        gender: '',
        password: '',
        password2: '',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.equal('first name is required');
        done();
      });
  });

  it('should check if registration is valid without lastname', (done) => {
    chai.request(server)
      .post(url)
      .send({
        firstname: '',
        username: '',
        email: '',
        gender: '',
        password: '',
        password2: '',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.equal('last name is required');
        done();
      });
  });

  it('should check if registration is valid without email', (done) => {
    chai.request(server)
      .post(url)
      .send({
        firstname: '',
        username: '',
        lastname: '',
        gender: '',
        password: '',
        password2: '',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.equal('email is required');
        done();
      });
  });

  it('should check if registration is valid without gender', (done) => {
    chai.request(server)
      .post(url)
      .send({
        firstname: '',
        username: '',
        email: '',
        lastname: '',
        password: '',
        password2: '',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.equal('gender is required');
        done();
      });
  });

  it('should check if registration is valid without password', (done) => {
    chai.request(server)
      .post(url)
      .send({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        gender: '',
        password2: '',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.equal('password is required');
        done();
      });
  });


  it('should check if registration is valid if firstname is empty', (done) => {
    chai.request(server)
      .post(url)
      .send({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        gender: '',
        password: '',
        password2: '',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.equal('first name cannot be empty');
        done();
      });
  });

  it('should check if registration is valid if lastname is empty', (done) => {
    chai.request(server)
      .post(url)
      .send({
        firstname: faker.name.firstName(),
        lastname: '',
        username: '',
        email: '',
        gender: '',
        password: '',
        password2: '',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.equal('last name cannot be empty');
        done();
      });
  });

  it('should check if registration is valid if email is empty', (done) => {
    chai.request(server)
      .post(url)
      .send({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        email: '',
        gender: '',
        password: '',
        password2: '',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.equal('email cannot be empty');
        done();
      });
  });

  it('should check if registration is valid if gender is empty', (done) => {
    chai.request(server)
      .post(url)
      .send({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        gender: '',
        password: '',
        password2: '',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.equal('gender cannot be empty');
        done();
      });
  });

  it('should check if registration is valid if password is empty', (done) => {
    chai.request(server)
      .post(url)
      .send({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        gender: 'male',
        password: '',
        password2: '',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.equal('password cannot be empty');
        done();
      });
  });

  it('should check if registration is valid if firstname length is lesser than 3', (done) => {
    chai.request(server)
      .post(url)
      .send({
        firstname: 'je',
        lastname: 'sa',
        username: 'sa',
        email: 'sa',
        gender: 'ma',
        password: 'ja',
        password2: '',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.equal('minimum length for first name is 3');
        done();
      });
  });

  it('should check if registration is valid if lastname length is lesser than 3', (done) => {
    chai.request(server)
      .post(url)
      .send({
        firstname: 'jeremiah',
        lastname: 'sa',
        username: 'sa',
        email: 'sa',
        gender: 'sa',
        password: 'sa',
        password2: '',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.equal('minimum length for last name is 3');
        done();
      });
  });

  it('should check if registration is valid if gender length is lesser than 4', (done) => {
    chai.request(server)
      .post(url)
      .send({
        firstname: 'jeremiah',
        lastname: 'samuel',
        username: 'sammyjay',
        email: 'sammyjay@yahoo.com',
        gender: 'hgt',
        password: 'sa',
        password2: '',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.equal('minimum length for gender is 4');
        done();
      });
  });

  it('should check if registration is valid if password length is lesser than 3', (done) => {
    chai.request(server)
      .post(url)
      .send({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        gender: 'male',
        password: 'fh',
        password2: '',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.equal('minimum length for password is 6');
        done();
      });
  });

  it('check if registration is valid if gender is an invalid one', (done) => {
    chai.request(server)
      .post(url)
      .send({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        gender: 'fmale',
        password: faker.internet.password(),
        password2: '',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.equal('invalid gender');
        done();
      });
  });

  it('check if registration is valid if email is invalid', (done) => {
    chai.request(server)
      .post(url)
      .send({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        email: 'hdjff',
        gender: 'male',
        password: faker.internet.password(),
        password2: '',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.equal('invalid email address');
        done();
      });
  });

  it('check if registration is valid if passwords do not match', (done) => {
    chai.request(server)
      .post(url)
      .send({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        gender: 'male',
        password: faker.internet.password(),
        password2: faker.internet.password(),
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.equal('passwords do not match');
        done();
      });
  });

  it('check if registration is valid if email already exists', (done) => {
    chai.request(server)
      .post(url)
      .send({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        email: 'john@gmail.com',
        gender: 'male',
        password: 'test009',
        password2: 'test009',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.equal('email already exists');
        done();
      });
  });
});
