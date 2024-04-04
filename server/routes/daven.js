const express = require('express');
const daven = require('../controllers/daven.js');
const router = express.Router();

router.route('/')
    .get(daven.findAll)
    .post(daven.create)
    .put(daven.update);
    
router.route('/:id')
    .get(daven.findOneById)
    .delete(daven.delete);

module.exports = router;
