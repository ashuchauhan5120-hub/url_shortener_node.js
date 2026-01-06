const express = require("express");
const { requireRole } = require("../middleware/requireRole")
const router = express.Router();

router.get("/admin/dashboard", requireRole("admin"), (req, res,) => {
    res.send("Hello Adminds")
})

module.exports = router