module.exports = (sequelize, DataTypes) => {
    const Chapter = sequelize.define('Chapter', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        lastUpdated: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    });

    Chapter.associate = (models) => {
        Chapter.belongsTo(models.Story, { foreignKey: 'storyId' });
    };

    return Chapter;
};