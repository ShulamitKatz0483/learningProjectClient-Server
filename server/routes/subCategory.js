const express = require('express');
const verifyJWT = require('../middleware/verifyJWT.js');
const subCategory = require('../controllers/subCategory.js');
const router = express.Router();

router.route('/')
    .get(subCategory.findAll)
    .post(subCategory.create)
    .put(subCategory.update);
    
router.route('/:id')
    .get(subCategory.findOneById)
    .delete(subCategory.delete);

module.exports = router;
