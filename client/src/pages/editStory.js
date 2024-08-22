import React, { useState, useEffect } from 'react';
import StoryForm from '../components/StoryForm';
import { useParams, useNavigate } from 'react-router-dom';
import { useStory } from '../context/StoryContext';

const EditStory = () => {
  const { storyData } = useStory()
  const { storyId } = useParams();
  const [story, setStory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStory = async () => {
      try {
        console.log("storyid", storyId)
        const response = await fetch(`http://localhost:5000/api/stories/${storyId}`);
        const data = await response.json();
        
        console.log("asd: ", data, storyData)
        if (data.id == storyData.id){
          setStory({...storyData, coverImage: data.coverImage})
        } else {
          setStory(data);
        }
      } catch (error) {
        console.error('Error fetching story:', error);
      }
    };

    fetchStory();
  }, [storyId]);

  const handleSave = async (formData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/stories/${storyId}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        navigate('/story');
      } else {
        console.error('Failed to update story:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating story:', error);
    }
  };

  const handleCancel = () => {
    navigate('/story');
  };

  return story ? (
    <StoryForm story={story} onSave={handleSave} onCancel={handleCancel} />
  ) : (
    <div>Loading...</div>
  );
};

export default EditStory;