const { Router } = require("express");
const adminMiddleware = require("./admin");
const categoryMiddleware = require("./category");
const userMiddleware = require("./user");
const specializationMiddleware = require("./specialization");
const reviewMiddleware = require("./review");
const jobMiddleware = require("./job");
const router = Router();

router.use("/admin", adminMiddleware);
router.use("/category", categoryMiddleware);
router.use("/user", userMiddleware);
router.use("/specialization", specializationMiddleware);
router.use("/review", reviewMiddleware);
router.use("/job", jobMiddleware);

module.exports = router;
