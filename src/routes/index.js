const { Router } = require("express");
const adminMiddleware = require("./admin");
const occupationMiddleware = require("./occupation");
const userMiddleware = require("./user")
const router = Router();

router.use("/admin", adminMiddleware);
router.use("/occupation", occupationMiddleware);
router.use("/user", userMiddleware)

module.exports = router;