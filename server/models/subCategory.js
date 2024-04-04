const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
const Subcategory = sequelize.define('Subcategory', {
  idSubCategory: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  subCategoryName: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  idCategory: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'category',
      key: 'idCategory'
  }
  }
}, {
  tableName: 'subcategory',
  timestamps: false
});

return Subcategory;
}

