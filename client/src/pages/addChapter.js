import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChapterForm from '../components/ChapterForm';
import { useStory } from '../context/StoryContext';

const AddChapter = () => {
  const { addChapter } = useStory(); 
  const navigate = useNavigate();

  const handleSave = (newChapter) => {
    addChapter(newChapter);
    navigate('/story/add');
  };

  const handleCancel = () => {
    navigate('/story/add');
  };

  return (
    <ChapterForm onSave={handleSave} onCancel={handleCancel} />
  );
};

export default AddChapter;