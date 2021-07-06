const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.header("x-api-key");

    if (!token) {
      return res.json({
        statusCode: 400,
        message: "No Token, Authorization Denied!",
      });
    }

    const decoded = jwt.verify(token, process.env.jwtSecret);
    req.emp = decoded.emp;
    next();
  } catch (error) {
    return res.json({ statusCode: 400, message: "Token is invalid!" });
  }
};
