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
  "/create-allowances/:salaryID",
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

// Same process cut m follow hoga

// *----------------***Salary***----------------------*/

module.exports = router;
