const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {

const Daven = sequelize.define('Daven', {
  idDaven: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  davenName: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  davenTime: {
    type: DataTypes.TIME,
    allowNull: true
  }
}
, {
  tableName: 'daven',
  timestamps: false
});
return Daven;
}

