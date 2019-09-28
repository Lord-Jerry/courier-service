const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

class Auth {
  /**
   * create user account
   * @param {object} req - api request
   * @param {object} res - api response
   * @param {function} next - next middleware function
   * @return {json}
   */
  static async createAccount(req, res, next) {
    const {
      firstname,
      lastname,
      email,
      gender,
    } = req.body;
    let { password } = req.body;
    let isAdmin = false;
    password = bcrypt.hashSync(password, 10);

    // if no user exist in database, make first user to register admin
    const checkAdmin = await Users.findAll();
    if (checkAdmin.length === 0) isAdmin = true;

    try {
      // eslint-disable-next-line no-unused-vars
      const data = await Users.create({
        firstname,
        lastname,
        email,
        isAdmin,
        gender,
        password,
      });
    } catch (error) {
      const err = new Error();
      err.message = 'error occured';
      err.details = error;
      err.statusCode = 500;
      return next(err);
    }

    return res.status(201).json({
      message: 'user account created successfully',
      statusCode: 201,
    });
  }

  /**
   * Log user in
   * @param {object} req - api request
   * @param {object} res - api response
   * @param {function} next - next middleware function
   * @return {json}
   */
  static async loginUser(req, res, next) {
    const { email, password } = req.body;
    const result = await Users.findOne({
      where: {
        email,
      },
    });

    if (!result) {
      const err = new Error();
      err.message = 'invalid email or password';
      err.statusCode = 401;
      return next(err);
    }

    const compare = await bcrypt.compare(password, result.password);

    if (!compare) {
      const err = new Error();
      err.message = 'invalid email or password';
      err.statusCode = 401;
      return next(err);
    }

    // sign user token
    const token = jwt.sign({
      id: result.id,
      level: result.level,
    },
    process.env.SECRET_KEY, { expiresIn: '30d' });

    // unset user password
    result.password = undefined;

    return res.status(200).json({
      message: 'logged in',
      statusCode: 200,
      token,
      result,
    });
  }
}

module.exports = Auth;
