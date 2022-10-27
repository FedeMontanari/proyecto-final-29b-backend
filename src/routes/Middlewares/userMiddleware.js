const { Router } = require("express");
const { getProfessionals } = require("../Controllers/getProfessionals.js");
const { postUser } = require("../Controllers/postUser.js");
const router = Router();

router.get("", getProfessionals);
router.post("", postUser);

module.exports = router;
