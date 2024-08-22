import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChapterForm from '../components/ChapterForm';
import { useStory } from '../context/StoryContext';

const AddChapter = () => {
  const { addChapter } = useStory(); 
  const navigate = useNavigate();

  const handleSave = (newChapter) => {
    addChapter(newChapter);
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <ChapterForm onSave={handleSave} onCancel={handleCancel} />
  );
};

export default AddChapter;