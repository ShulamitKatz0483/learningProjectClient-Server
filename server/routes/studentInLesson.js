const express = require('express');
const studentInLesson = require('../controllers/studentInLesson.js');
const router = express.Router();

router.route('/')
    .get(studentInLesson.findAll)
    .post(studentInLesson.create)
    .put(studentInLesson.update);
    
router.route('/:id')
    .get(studentInLesson.findOneById)
    .delete(studentInLesson.delete);

router.route('/studentId/:id')
    .get(studentInLesson.findAllByStudentId);
module.exports = router;
