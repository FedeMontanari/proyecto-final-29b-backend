const { Router } = require('express');
const userMiddleware = require('./Middlewares/userMiddleware');
const adminMiddleware = require('./Middlewares/adminMiddleware');
const router = Router();


router.use('/user', userMiddleware);
router.use('/admin', adminMiddleware);



module.exports = router;