const {Router} = require('express');
const {getClients} = require('../Controllers/getClients.js')
const {getProfessionals} = require('../Controllers/getProfessionals.js');
const {postUser} = require('../Controllers/postUser.js');
const router = Router();

router.get('', getClients)
router.get('', getProfessionals)
router.post('', postUser);

module.exports = router;