import React, { useState, useEffect } from 'react';
import StoryForm from '../components/StoryForm';
import { useParams, useNavigate } from 'react-router-dom';

const StoryDetail = () => {
  const { storyId } = useParams();
  const [story, setStory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/stories/${storyId}`);
        const data = await response.json();
        console.log(data)
        setStory(data);
      } catch (error) {
        console.error('Error fetching story:', error);
      }
    };

    fetchStory();
  }, [storyId]);

  const handleCancel = () => {
    navigate('/story');
  };

  return story ? (
    <StoryForm story={story} readOnly={true} onCancel={handleCancel} />
  ) : (
    <div>Loading...</div>
  );
};

export default StoryDetail;
