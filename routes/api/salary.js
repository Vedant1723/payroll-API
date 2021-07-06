const salaryController = require('../../controllers/salaryController');
const router = require('express').Router();

//@GET route
//@DESC GET all Allowances
router.get('/get-all-allowances', salaryController.getAllAllowances);

//@GET route
//@DESC GET Allowance
router.get('/get-allowance/:id', salaryController.getAllowance);

//@POST route
//@DESC ADD Allowance
router.post('/add-allowance', salaryController.addAllowance);

//@PUT route
//@DESC UPDATE Allowance
router.put('/update-allowance/:id', salaryController.updateAllowance);

//@DELETE route
//@DESC DELETE Allowance
router.delete('/delete-allowance/:id', salaryController.deleteAllowance);

//@GET route
//@DESC GET CUTS
router.get('/get-all-cuts', salaryController.getAllCuts);

//@GET route
//@DESC GET CUTS
router.get('/get-cuts/:id', salaryController.getCuts);

//@POST route
//@DESC ADD CUTS
router.post('/add-cuts', salaryController.addCuts);

//@PUT route
//@DESC UPDATE CUTS
router.put('/update-cuts/:id', salaryController.updateCuts);

//@DELETE route
//@DESC DELETE CUTS
router.delete('/delete-cuts/:id', salaryController.deleteCuts);
