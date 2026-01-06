const express = require("express");
const { showLoginForm , loginUser} = require("../controllers/loginRouter")
const router = express.Router();

router.get("/", showLoginForm)
router.post("/", loginUser)


module.exports = router