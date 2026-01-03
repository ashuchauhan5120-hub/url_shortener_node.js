const express = require("express");
const { showResult , removeUrlByID} = require("../controllers/redirectController")
const router = express.Router();

router.get("/:shortcode", showResult)
router.delete("/:shortcode/delete/:id", removeUrlByID)


module.exports = router