const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {

  const PendingLesson = sequelize.define('PendingLesson', {
    idPendingLesson: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'uset',
        key: 'idUser'
      }
    },
    idSubCategory: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'subCategory',
        key: 'idSubCategory'
      }
    },
      idDaven: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'daven',
          key: 'idDaven'
        }
      }
    }, {
    tableName: 'pendinglesson',
    timestamps: false
  });

  return PendingLesson;
}

