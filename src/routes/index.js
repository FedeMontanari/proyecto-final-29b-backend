const { Router } = require("express");
const adminMiddleware = require("./admin");
const categoryMiddleware = require("./category");
const userMiddleware = require("./user");
const specializationMiddleware = require("./specialization");
const reviewMiddleware = require("./review");
const router = Router();

router.use("/admin", adminMiddleware);
router.use("/category", categoryMiddleware);
router.use("/user", userMiddleware);
router.use("/specialization", specializationMiddleware);
router.use("/review", reviewMiddleware);

module.exports = router;
