const { Router } = require("express");
const adminMiddleware = require("./admin");
const occupationMiddleware = require("./occupation");
const userMiddleware = require("./user");
const specializationMiddleware = require("./specialization");
const router = Router();

router.use("/admin", adminMiddleware);
router.use("/occupation", occupationMiddleware);
router.use("/user", userMiddleware);
router.use("/specialization", specializationMiddleware);


module.exports = router;
