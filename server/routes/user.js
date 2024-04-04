const express = require('express');
const user = require('../controllers/user.js');
const router = express.Router();

router.route('/')
    .get(user.findAll)
    .post(user.create)
    .put(user.update);
router.route('/email')
    .get(user.findOneByEmail)

router.route('/:id')
    .get(user.findOneById)
    .delete(user.delete);

module.exports = router;
