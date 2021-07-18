const employeeController = require("../../controllers/employeeController");
const auth = require("../../middleware/auth");
const router = require("express").Router();

//@GET route
//@DESC GET Employee
router.get("/all", auth, employeeController.getEmployees);

// @GET Route
// @DESC Get Specific Employee
router.get("/:id", auth, employeeController.getSpecificEmployee);

//@POST route
//@DESC CREATE Employee
router.post("/create-employee", auth, employeeController.createEmployee);

//@PUT route
//@DESC UPDATE Employee

router.put("/update-employee/:id", employeeController.updateEmployee);

//@DELETE route
//@DESC DELETE Employee
router.delete("/delete-employee/:id", employeeController.deleteEmployee);

// /*-----------------***Routes exported**-----------------------*/
module.exports = router;
