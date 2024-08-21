const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Story = require('./story');
const Chapter = require('./chapter');

const models = {
    Story: Story(sequelize, Sequelize.DataTypes),
    Chapter: Chapter(sequelize, Sequelize.DataTypes), 
};

Object.keys(models).forEach((key) => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
