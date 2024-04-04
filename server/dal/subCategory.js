const db = require('../models');
const subCategory = db.subCategory;

exports.findAll = async () => {
    return await subCategory.findAll();
}
exports.findOneById = async (id) => {
    return await subCategory.findOne({ where: { idsubCategory: id } });
}
exports.delete = async (id) => {
    return await subCategory.destroy({ where: { idsubCategory: id } });
}
exports.create = async (newsubCategory) => {
    return await subCategory.create(newsubCategory);
}

exports.update = async (newsubCategory, id) => {
    return await subCategory.update(newsubCategory, { where: { idsubCategory: id } });
}
