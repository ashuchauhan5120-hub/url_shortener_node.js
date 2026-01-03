const express = require("express");
const { shortenUrlForm , getShortenUrl} = require("../controllers/shortenController")
const {sendToOriginalUrl} = require("../controllers/redirectController")
const router = express.Router();

router.get("/", shortenUrlForm)
router.get("/:shortcode", sendToOriginalUrl)
router.post("/", getShortenUrl)

module.exports = router