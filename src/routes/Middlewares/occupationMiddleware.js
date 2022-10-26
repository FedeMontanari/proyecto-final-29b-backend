const {Router} = require('express');
const { postOccupation } = require('../Controllers/postOccupation')
const router = Router();

router.post('', postOccupation);

module.exports = router;