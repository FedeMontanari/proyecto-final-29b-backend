const {Router} = require('express');
const {postAdmin} = require('../Controllers/postAdmin.js');
const router = Router();

router.post('', postAdmin);

module.exports = router;