const router = require("express").Router();
const salaryController = require("../../controllers/salaryController");
const auth = require("../../middleware/auth");

// *----------------***Salary***----------------------*/

// @Get Route
// @DESC Get All Allowances of Specific Salary
router.get("/allowances/:salaryID", auth, salaryController.getAllowances);

// @Post Route
// @DESC Create All Allowances of Specific Salary
router.post(
  "/create-allowance/:salaryID",
  auth,
  salaryController.createAllowance
);

// @Put Route
// @DESC Update Specific Allowance
router.put(
  "/update-allowances/:allowanceID",
  auth,
  salaryController.updateAllowance
);

// @Delete Route
// @DESC Delete specific Allowance
router.delete(
  "/delete-allowances/:allowanceID",
  auth,
  salaryController.deleteAllowance
);

// @Get Route
// @DESC Get All cut of Specific Salary
router.get("/cut/:salaryID", auth, salaryController.getCut);

// @Post Route
// @DESC Create All cut of Specific Salary
router.post("/create-cut/:salaryID", auth, salaryController.createCut);

// @Put Route
// @DESC Update Specific Cut
router.put("/update-cut/:cutID", auth, salaryController.updateCut);

// @Delete Route
// @DESC Delete specific Cut
router.delete("/delete-cut/:cutID", auth, salaryController.deleteCut);

// @POST Route
// @DESC Create Salary for Specific Employee
router.post("/create-salary/:empID", auth, salaryController.createSalary);

// @POST Get Route
// @DESC Pay Salary to Specific Employee
router.get("/pay-salary/:empID", auth, salaryController.paySalary);

// @GET Route
// @DESC Get Unpaid Salary of Specific Employee
router.get("/details/:empID", auth, salaryController.getSalary);

// @GET Route
// @DESC Get All Salaries/Transactions
router.get("/all", auth, salaryController.getSalaries);
// *----------------***Salary***----------------------*/

module.exports = router;
