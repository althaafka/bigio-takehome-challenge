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
