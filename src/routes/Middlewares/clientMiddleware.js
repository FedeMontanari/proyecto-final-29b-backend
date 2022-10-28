const { Router } = require("express");
const { getClient } = require("../Controllers/getClient.js");
const { postClient } = require("../Controllers/postClient.js");
const router = Router();

router.get("", getClient);
router.post("", postClient);

module.exports = router;
