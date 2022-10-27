const { Router } = require("express");
const { getProfessional } = require("../Controllers/getProfessional.js");
const { postProfessional } = require("../Controllers/postProfessional.js");
const router = Router();

router.get("", getProfessional);
router.post("", postProfessional);

module.exports = router;
