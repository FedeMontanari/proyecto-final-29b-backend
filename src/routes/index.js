const { Router } = require("express");
const professionalMiddleware = require("./Middlewares/professionalMiddleware");
const adminMiddleware = require("./Middlewares/adminMiddleware");
const occupationMiddleware = require("./Middlewares/occupationMiddleware");
const clientMiddleware = require('./Middlewares/clientMiddleware');
const router = Router();

router.use("/professional", professionalMiddleware);
router.use("/admin", adminMiddleware);
router.use("/occupation", occupationMiddleware);
router.use('/client', clientMiddleware);

module.exports = router;
