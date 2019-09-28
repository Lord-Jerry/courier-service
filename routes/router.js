const router = require('express').Router();
const validator = require('../middlewares/validator');
// eslint-disable-next-line no-unused-vars
const authenticate = require('../middlewares/authentication');
const authController = require('../controllers/auth');

const url = '/api/v1';

// POST REQUESTS

router
  .route(`${url}/register`)
  .post(
    validator.checkBodyContains('first name', 'last name', 'email', 'gender', 'password', 'password2'),
    validator.checkBodyNotEmpty('first name', 'last name', 'email', 'gender', 'password'),
    validator.checkBodyValidString('first name', 'last name', 'gender'),
    validator.checkBodyMinValue(3, 'first name', 'last name'),
    validator.checkBodyMinValue(4, 'gender'),
    validator.checkBodyMinValue(6, 'password'),
    validator.checkBodyMaxValue(30, 'first name', 'last name', 'password'),
    validator.checkBodyMaxValue(6, 'gender'),
    validator.checkGenderValid,
    validator.checkEmailValid,
    validator.checkEmailExists,
    validator.checkPasswordsMatch,
    authController.createAccount,
  );

router
  .route(`${url}/login`)
  .post(
    validator.checkBodyContains('email', 'password'),
    validator.checkBodyNotEmpty('email', 'password'),
    validator.checkEmailValid,
    authController.loginUser,
  );

module.exports = router;
