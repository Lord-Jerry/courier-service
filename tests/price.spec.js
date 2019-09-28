/* eslint-disable no-unused-vars */
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
