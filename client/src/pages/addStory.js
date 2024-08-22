import React from 'react';
import { useNavigate } from 'react-router-dom';
import StoryForm from '../components/StoryForm';
import { useStory } from '../context/StoryContext';

const StoryAdd = () => {
  const { storyData, updateStoryData } = useStory(); 
  const navigate = useNavigate();

  const handleSave = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/api/stories', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        navigate('/story'); 
      } else {
        console.error('Failed to save story:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving story:', error);
    }
  };

  const handleCancel = () => {
    navigate('/story');
  };


  return (
    <StoryForm
      story={{}}
      readOnly={false} 
      onSave={handleSave} 
      onCancel={handleCancel}
    />
  );
};

export default StoryAdd;
