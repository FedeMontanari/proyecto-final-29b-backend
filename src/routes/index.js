const { Router } = require('express');
const userMiddleware = require('./Middlewares/userMiddleware');
const router = Router();


router.use('/user', userMiddleware)



module.exports = router;