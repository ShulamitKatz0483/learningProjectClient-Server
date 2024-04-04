const db = require('../models');
const lesson = db.lesson;

exports.findAll = async () => {
    return await lesson.findAll();
}
exports.findOneById = async (id) => {
    return await lesson.findOne({ where: { idLesson: id } });
}
exports.delete = async (id) => {
    return await lesson.destroy({ where: { idLesson: id } });
}
exports.create = async (newlesson) => {
    return await lesson.create(newlesson);
}

exports.update = async (newlesson, id) => {
    return await lesson.update(newlesson, { where: { idLesson: id } });
}

// exports.findOne = async (condition) => {
//     return await Users.findOne(condition);
// }
// // exports.findOneByIDNumber = async (idNumber) => {
// //     return await Users.findOne({ where: { idNumber: idNumber } });
// // }
// exports.findOneByPassword = async (password) => {
//     return await Users.findOne({ where: { password: password } });

