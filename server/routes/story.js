const express = require('express');
const router = express.Router();
const storyController = require('../controllers/story');

router.get('/', storyController.getStories);
router.post('/', storyController.addStory);
router.get('/:id', storyController.getStoryById);

module.exports = router;
