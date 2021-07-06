const employerController = require("../../controllers/employerController");
const auth = require("../../middleware/auth");
const router = require("express").Router();
// *-----------------***Auth**-----------------------*/

//@POST route
//@DESC User Signup
router.post("/register", employerController.signup);

//@POST route
//@DESC User login
router.post("/login", employerController.login);

// @POST Route
// @DESC Confirm OTP
router.post("/confirm-otp", employerController.confirmOTP);

// *----------------***Auth***----------------------*/

// *----------------***Attendance***----------------------*/

// @GET Route
// @DESC Get Attendence of Specific Employee
router.get(
  "/attendance/:month/:empID",
  auth,
  employerController.getAttendanceByMonth
);

// @POST Route
// @DESC Mark Attedance of Specific Employee by Passing Attendance as a Params
router.post(
  "/attendance/mark/:empID/:markAs",
  auth,
  employerController.markAttendance
);

// *----------------***Attendance***----------------------*/

module.exports = router;
