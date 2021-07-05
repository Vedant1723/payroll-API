const employeeController = require('../controllers/employeeController');
const router = require('express').Router();

//@GET route
//@DESC GET Employee
router.get('/get-employee', employeeController.get);

//@POST route
//@DESC CREATE Employee
router.post('/create-employee', employeeController.create);

//@PUT route
//@DESC UPDATE Employee

router.put('/update-employee/:id', employeeController.update);

//@DELETE route
//@DESC DELETE Employee
router.delete('/delete-employee/:id', employeeController.delete);

// /*-----------------***Routes exported**-----------------------*/
module.exports = router;
