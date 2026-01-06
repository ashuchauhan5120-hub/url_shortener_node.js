const express = require("express");
const { showSignupForm , addSignupUserToDB} = require("../controllers/signupController")
const router = express.Router();

router.get("/", showSignupForm)
router.post("/", addSignupUserToDB)


module.exports = router