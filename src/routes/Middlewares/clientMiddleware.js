const { Router } = require("express");
const { postClient } = require("../Controllers/postClient");
const router = Router();

router.post('', postClient);

module.exports = router;
