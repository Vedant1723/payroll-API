const employerController = require('../controllers/employerController');
const router = require('express').Router();
//@POST route
//@DESC User signup
router.post('/signup', employerController.signup);
//@POST route
//@DESC User login
router.post('/login', employerController.login);

module.exports = router;
