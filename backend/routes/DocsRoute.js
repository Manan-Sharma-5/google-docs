const express = require('express');
const router = express.Router();
const Authenticator = require('../middlewares/Authenticator');

const {create, read, update, remove} = require('../controllers/DocsControl');

router.post('/create', Authenticator, create);
router.get('/read', Authenticator, read);
router.put('/update', Authenticator, update);
router.delete('/remove', Authenticator, remove);

module.exports = router;