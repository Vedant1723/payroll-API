const employerController = require('../controllers/employerController');
const router = require('express').Router();
// /*-----------------***SIGNUP**-----------------------*/
//@POST route
//@DESC User signup
router.post('/signup', employerController.signup);

// /*-----------------***LOGIN**-----------------------*/
//@POST route
//@DESC User login
router.post('/login', employerController.login);

// /*-----------------***Routes exported**-----------------------*/
module.exports = router;
