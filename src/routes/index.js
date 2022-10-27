const { Router } = require("express");
const userMiddleware = require("./Middlewares/userMiddleware");
const clientMiddleware = require("./Middlewares/clientsMiddleware");
const adminMiddleware = require("./Middlewares/adminMiddleware");
const occupationMiddleware = require("./Middlewares/occupationMiddleware");
const router = Router();

router.use("/user", userMiddleware);
router.use("/client", clientMiddleware);
router.use("/admin", adminMiddleware);
router.use("/occupation", occupationMiddleware);

module.exports = router;
