const { Router } = require("express");
const { postAdmin } = require("../Controllers/postAdmin");
const { getAdmin } = require("../Controllers/getAdmin");
const router = Router();

router.post("", postAdmin);
router.get("", getAdmin);

module.exports = router;
