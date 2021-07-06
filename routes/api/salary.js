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

// Same process cut m follow hoga

// *----------------***Salary***----------------------*/

module.exports = router;
