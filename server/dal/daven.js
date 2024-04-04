const db = require('../models');
const daven = db.daven;

exports.findAll = async () => {
    return await daven.findAll();
}
exports.findOneById = async (id) => {
    return await daven.findOne({ where: { idDaven: id } });
}
exports.delete = async (id) => {
    return await daven.destroy({ where: { idDaven: id } });
}
exports.create = async (newdaven) => {
    return await daven.create(newdaven);
}

exports.update = async (newdaven, id) => {
    return await daven.update(newdaven, { where: { idDaven: id } });
}
