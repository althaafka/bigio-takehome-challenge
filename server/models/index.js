const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Story = require('./story');

const models = {
    Story: Story(sequelize, Sequelize.DataTypes),
};

Object.keys(models).forEach((key) => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

models.sequelize = sequelize;

module.exports = models;