module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define('user', {
        idUser: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        phoneNumber: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true
        },
        email: {
            type: Sequelize.STRING(100),
            defaultValue: null,
            unique: true

        },
        level: {
            type: Sequelize.STRING(45),
            defaultValue: null
        },
        password: {
            type: Sequelize.STRING(45),
            allowNull: false,
        },
        isManager: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }

    },
        {
            freezeTableName: true,
            timestamps: false,

        });

    return user;
};



