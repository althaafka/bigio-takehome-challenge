const { Story, Chapter } = require('../models');

exports.getStories = async (req, res) => {
    try {
        const stories = await Story.findAll({
            attributes: ['title', 'author', 'category', 'tags', 'status'],
        });
        res.status(200).json(stories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
