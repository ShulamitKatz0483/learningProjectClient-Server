const db = require('../models');
const pendingLesson = db.pendingLesson;

exports.findAll = async () => {
    return await pendingLesson.findAll();
}
exports.findOneById = async (id) => {
    return await pendingLesson.findOne({ where: { idPendingLesson: id } });
}
exports.delete = async (id) => {
    return await pendingLesson.destroy({ where: { idPendingLesson: id } });
}
exports.create = async (newpendingLesson) => {
    return await pendingLesson.create(newpendingLesson);
}

exports.update = async (newpendingLesson, id) => {
    return await pendingLesson.update(newpendingLesson, { where: { idPendingLesson: id } });
}
