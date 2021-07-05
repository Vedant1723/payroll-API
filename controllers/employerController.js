const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employer = require('../models/Employer');
require('dotenv').config();

//Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    var user = await Employer.findOne({ email });
    if (user) {
      const validpw = await bcrypt.compare(password, user.password);
      if (validpw) {
        const payload = {
          user: {
            id: user.id,
          },
        };
        jwt.sign(
          payload,
          process.env.jwtSecret,
          { expiresIn: 3600000000 },
          (err, token) => {
            if (err) throw err;
            //Send response to client

            return res.json({
              statusCode: 200,
              message: 'Logged in',
              user: user,
              token: token,
            });
          }
        );
      } else {
        res.json({ statusCode: 400, message: 'Incorrect credentials' });
      }
    } else {
      res.json({ statusCode: 400, message: 'Incorrect credentials' });
    }
  } catch (error) {
    console.log(error.message);
  }
};

//Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //Check if user already exists
    var user = await Employer.findOne({ email });
    if (user) {
      return res.json({ statusCode: 400, message: 'User already exists' });
    }

    //Create new user
    user = new Employer({ name, email, password });
    //Password Hashing
    //Step-1 of password hashing=>Salt Generation
    const salt = await bcrypt.genSalt(10);
    //Step-2 of password hashing=>Modifying the DB password
    user.password = await bcrypt.hash(password, salt);
    //Save user to DB
    await user.save();
    //Token generation
    //Step-1 creation of payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    //Step-2 Token generation
    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: 3600000000 },
      (err, token) => {
        if (err) throw err;
        //Send response to client

        return res.json({
          statusCode: 200,
          message: 'User Registered',
          user: user,
          token: token,
        });
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};
