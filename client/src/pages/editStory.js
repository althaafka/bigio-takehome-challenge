import React, { useState, useEffect } from 'react';
import StoryForm from '../components/StoryForm';
import PageHeader from '../components/PageHeader'; 
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
        const response = await fetch(`http://localhost:5000/api/stories/${storyId}`);
        const data = await response.json();
        
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

  const breadcrumbItems = [
    { label: 'Stories Management', path: '/story', active: false },
    { label: 'Edit Story', path: '', active: true },
  ];

  return story ? (
    <div className="container mx-auto px-6">
      <PageHeader breadcrumbItems={breadcrumbItems} title="Edit Story" />
      <StoryForm pageTitle="Edit Story" story={story} onSave={handleSave} onCancel={handleCancel} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default EditStory;
