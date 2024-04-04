const express = require('express');
const verifyJWT = require('../middleware/verifyJWT.js');
const category = require('../controllers/category.js');
const router = express.Router();

router.route('/')
    .get(category.findAll)
    .post(category.create)
    .put(category.update);
    
router.route('/:id')
    .get(category.findOneById)
    .delete(category.delete);

module.exports = router;
