const { Router } = require("express");
const { postOccupation } = require("../Controllers/postOccupation");
const { getOccupation } = require("../Controllers/getOccupation");
const router = Router();

router.post("", postOccupation);
router.get("", getOccupation);

module.exports = router;
