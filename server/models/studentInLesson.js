const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {

  const StudentInLesson = sequelize.define('StudentInLesson', {
    idStudentInLesson: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    idLesson: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'lesson',
        key: 'idLesson'
      }
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'idUser'
      }
    }
  }, {
    tableName: 'studentinlesson',
    timestamps: false
  });

  return StudentInLesson;
}