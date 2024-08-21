const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('storyku', 'root', 'qwerty', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
