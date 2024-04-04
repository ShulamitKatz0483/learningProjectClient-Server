const express = require('express');
const verifyJWT = require('../middleware/verifyJWT.js');
const lesson = require('../controllers/lesson.js');
const router = express.Router();

router.route('/')
    .get(lesson.findAll)
    .post(lesson.create)
    .put(lesson.update);
    
router.route('/:id')
    .get(lesson.findOneById)
    .delete(lesson.delete);

module.exports = router;
