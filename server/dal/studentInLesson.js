const db = require('../models');
const studentInLesson = db.studentInLesson;

exports.findAll = async () => {
    return await studentInLesson.findAll();
}
exports.findOneById = async (id) => {
    return await studentInLesson.findOne({ where: { idStudentInLesson: id } });
}
exports.findAllByIdUser = async (IdUser1) => {
    return await studentInLesson.findAll({ where: { idUser: IdUser1 } });
}
exports.delete = async (id) => {
    return await studentInLesson.destroy({ where: { idStudentInLesson: id } });
}
exports.create = async (newstudentInLesson) => {
    return await studentInLesson.create(newstudentInLesson);
}

exports.update = async (newstudentInLesson, id) => {
    return await studentInLesson.update(newstudentInLesson, { where: { idStudentInLesson: id } });
}
