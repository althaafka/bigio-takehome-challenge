const { Story, Chapter } = require('../models');

exports.getStories = async (req, res) => {
    try {
        const stories = await Story.findAll({
            attributes: [
                'id',
                ['title', 'title'],
                ['author', 'writer'],      
                ['category', 'category'],
                ['tags', 'keywords'], 
                ['status', 'status']
            ],
        });
        res.status(200).json(stories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });

exports.addStory = [
  upload.single('coverImage'), 
  async (req, res) => {
    const { title, author, synopsis, category, tags, status, chapters } = req.body;
    const coverImage = req.file ? req.file.filename : null; 

    try {
      const newStory = await Story.create(
        {
          title,
          author,
          synopsis,
          category,
          coverImage, 
          tags: JSON.parse(tags), 
          status,
          chapters: JSON.parse(chapters),
        },
        {
          include: [{ model: Chapter, as: 'chapters' }],
        }
      );

      res.status(201).json(newStory);
    } catch (err) {
      console.log('Error:', err.message);
      res.status(500).json({ message: err.message });
    }
  }
];

exports.getStoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const story = await Story.findOne({
      where: { id },
      attributes: [
        'id',
        ['title', 'title'],
        ['author', 'writer'],
        ['category', 'category'],
        ['tags', 'keywords'],
        ['status', 'status'],
        'synopsis',
        'coverImage',
      ],
      include: [{
        model: Chapter,
        as: 'chapters',
        attributes: ['id', 'title', 'content', 'lastUpdated'], 
      }],
    });

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    res.status(200).json(story);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateStory = [
  upload.single('coverImage'),
  async (req, res) => {
    const { id } = req.params;
    const { title, author, synopsis, category, tags, status, chapters } = req.body;
    const coverImage = req.file ? req.file.filename : null;

    try {
      const story = await Story.findOne({ where: { id } });

      if (!story) {
        return res.status(404).json({ message: 'Story not found' });
      }

      story.title = title || story.title;
      story.author = author || story.author;
      story.synopsis = synopsis || story.synopsis;
      story.category = category || story.category;
      story.status = status || story.status;
      if (tags) {
        story.tags = JSON.parse(tags);
      }
      if (coverImage) {
        story.coverImage = coverImage;
      }

      if (chapters) {
        const parsedChapters = JSON.parse(chapters);

        for (const chapter of parsedChapters) {
          if (chapter.id){
            const existingChapter = await Chapter.findOne({ where: { id: chapter.id, storyId: id } });
            if (existingChapter) {
              await existingChapter.update(chapter);
            } else {
              await Chapter.create({ ...chapter, storyId: id });
            }
          } else {
            await Chapter.create({ ...chapter, storyId: id });
          }
        }
      }

      await story.save();

      res.status(200).json({ message: 'Story updated successfully', story });
    } catch (err) {
      console.log('Error:', err);
      res.status(500).json({ message: err.message });
    }
  }
];