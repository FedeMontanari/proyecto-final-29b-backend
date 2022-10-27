const { Router } = require("express");
const { getClients } = require("../Controllers/getClients");
const router = Router();

router.get("", getClients);

module.exports = router;
