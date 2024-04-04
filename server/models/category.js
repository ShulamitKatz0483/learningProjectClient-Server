const { DataTypes } = require('sequelize');
//const sequelize = require('../db');


module.exports = (sequelize, Sequelize) => {

  const Category = sequelize.define('Category', {
    idCategory: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    categoryName: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }
    , {
      tableName: 'category',
      timestamps: false
    });
  return Category;
}

