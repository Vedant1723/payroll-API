const employeeController = require('../controllers/employeeController');
const router = require('express').Router();

//@GET route
//@DESC GET Employee
router.get('/getemployee', employeeController.get);

//@POST route
//@DESC CREATE Employee
router.get('/createemployee', employeeController.create);
//@GET route
//@DESC GET Employee
router.get('/getemployee', employeeController.get);
//@GET route
//@DESC GET Employee
router.get('/getemployee', employeeController.get);
// /*-----------------***Routes exported**-----------------------*/
module.exports = router;
