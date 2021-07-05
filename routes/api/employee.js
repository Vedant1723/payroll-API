const employeeController = require('../controllers/employeeController');
const router = require('express').Router();
//@POST route
//@DESC User signup
router.post('/signup', employeeController.signup);
//@POST route
//@DESC User login
router.post('/login', employeeController.login);

module.exports = router;
