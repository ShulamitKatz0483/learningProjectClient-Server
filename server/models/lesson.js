const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {

const Lesson = sequelize.define('Lesson', {
  idLesson: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  time: {
    type: DataTypes.TIME,
    allowNull: true
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
    allowNull: true,
    references: {
        model: 'daver',
        key: 'idDaven'
    }
  },
  idLecturer: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'user',
        key: 'idUser'
    }
  }
}, {
  tableName: 'lesson',
  timestamps: false
});
 
return Lesson;
}

