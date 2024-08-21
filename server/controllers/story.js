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

exports.addStory = async (req, res) => {
    const { title, author, synopsis, category, coverImage, tags, status, chapters } = req.body;

    try {
        const newStory = await Story.create(
            {
                title,
                author,
                synopsis,
                category,
                coverImage,
                tags,
                status,
                chapters,
            },
            {
                include: [{ model: Chapter, as: 'chapters' }],
            }
        );

        res.status(201).json(newStory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
