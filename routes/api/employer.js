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

// *----------------***Task***----------------------*/

// @GET Route
// @DESC Get all the tasks of Logged in Employer
router.get("/tasks/all", auth, employerController.getTasks);

// @POST Route
// @DESC Create Task
router.post("/task/create-task", auth, employerController.createTask);

// @PUT Route
// @DESC Update Task
router.put("/task/update-task/:id", auth, employerController.updateTask);

// @DELETE Route
// @DESC Delete Task
router.delete("/task/delete-task/:id", auth, employerController.deleteTask);
// *----------------***Task***----------------------*/

module.exports = router;
