const employerController = require("../../controllers/employerController");
const router = require("express").Router();
// /*-----------------***Auth**-----------------------*/

//@POST route
//@DESC User Signup
router.post("/register", employerController.signup);

//@POST route
//@DESC User login
router.post("/login", employerController.login);

// @POST Route
// @DESC Confirm OTP
router.post("/confirm-otp", employerController.confirmOTP);

// /*-----------------***/Auth**-----------------------*/

module.exports = router;
