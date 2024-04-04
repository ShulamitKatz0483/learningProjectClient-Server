const db = require('../models');
const categorys = db.category;

exports.findAll = async () => {
    return await categorys.findAll();
}
exports.findOneById = async (id) => {
    return await categorys.findOne({ where: { idCategory: id } });
}
exports.delete = async (id) => {
    return await categorys.destroy({ where: { idCategory: id } });
}
exports.create = async (category) => {
    return await categorys.create(category);
}

exports.update = async (category, id) => {
    return await categorys.update(category, { where: { idCategory: id } });
}

// exports.findOne = async (condition) => {
//     return await Users.findOne(condition);
// }
// // exports.findOneByIDNumber = async (idNumber) => {
// //     return await Users.findOne({ where: { idNumber: idNumber } });
// // }
// exports.findOneByPassword = async (password) => {
//     return await Users.findOne({ where: { password: password } });

