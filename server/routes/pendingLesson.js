const express = require('express');
const pendingLesson = require('../controllers/pendingLesson.js');
const router = express.Router();

router.route('/')
    .get(pendingLesson.findAll)
    .post(pendingLesson.create)
    .put(pendingLesson.update);
    
router.route('/:id')
    .get(pendingLesson.findOneById)
    .delete(pendingLesson.delete);

module.exports = router;
