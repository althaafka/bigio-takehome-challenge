module.exports = (sequelize, DataTypes) => {
    const Story = sequelize.define('Story', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        synopsis: {
            type: DataTypes.TEXT,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        coverImage: {
            type: DataTypes.STRING,
        },
        tags: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
        },
        status: {
            type: DataTypes.ENUM('Publish', 'Draft'),
            defaultValue: 'Draft',
        },
    });

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

    Story.hasMany(Chapter, { as: 'chapters', foreignKey: 'storyId' });
    Chapter.belongsTo(Story, { foreignKey: 'storyId' });

    return Story;
};
