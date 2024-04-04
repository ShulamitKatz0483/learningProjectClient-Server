const dbConfig = require('../config/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: 0,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)
const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user')(sequelize, DataTypes);
db.category = require('./category')(sequelize, DataTypes);
db.subCategory = require('./subCategory')(sequelize, DataTypes);
db.lesson = require('./lesson')(sequelize, DataTypes);
db.pendingLesson = require('./pendingLesson')(sequelize, DataTypes);
db.studentInLesson = require('./studentInLesson')(sequelize, DataTypes);
db.daven = require('./daven')(sequelize, DataTypes);

module.exports = db;