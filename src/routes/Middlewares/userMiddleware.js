const {Router} = require('express');
const {postUser} = require('../Controllers/postUser.js');
const router = Router();

router.post('', postUser);

module.exports = router;