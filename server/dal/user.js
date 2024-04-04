const db = require('../models');
const user = db.user;

exports.findAll = async () => {
    return await user.findAll();
}
exports.findOneById = async (id) => {
    return await user.findOne({ where: { idUser: id } });
}
exports.findOneByEmail = async (email1) => {
    return await user.findOne({ where: { email: email1 } });
}
exports.delete = async (id) => {
    return await user.destroy({ where: { idUser: id } });
}
exports.create = async (newUser) => {
    return await user.create(newUser);
}

exports.update = async (newUser, id) => {
    return await user.update(newUser, { where: { idUser: id } });
}
