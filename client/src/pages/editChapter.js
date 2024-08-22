import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChapterForm from '../components/ChapterForm';
import { useStory } from '../context/StoryContext';

const EditChapter = () => {
  const { storyId, chapterId } = useParams();
  const { storyData, updateChapter } = useStory();
  const [chapter, setChapter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundChapter = storyData.chapters.find(chap => chap.id == chapterId);
    console.log(foundChapter, storyData.chapters, storyData)
    if (foundChapter) {
      setChapter(foundChapter);
    }
  }, [chapterId, storyData.chapters]);

  const handleSave = (updatedChapter) => {
    updateChapter({...updatedChapter, id: Number(chapterId)});
    navigate(`/story/${storyId}/edit`);
  };

  const handleCancel = () => {
    navigate(`/story/${storyId}/edit`);
  };

  return chapter ? (
    <ChapterForm chapter={chapter} onSave={handleSave} onCancel={handleCancel} />
  ) : (
    <div>Loading...</div>
  );
};

export default EditChapter;
