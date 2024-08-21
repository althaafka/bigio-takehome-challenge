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

    Story.associate = (models) => {
        Story.hasMany(models.Chapter, { as: 'chapters', foreignKey: 'storyId' });
    };

    return Story;
};