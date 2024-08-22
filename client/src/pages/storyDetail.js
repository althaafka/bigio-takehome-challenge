import React, { useState, useEffect } from 'react';
import StoryForm from '../components/StoryForm';
import PageHeader from '../components/PageHeader'; // Import PageHeader
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

  const breadcrumbItems = [
    { label: 'Stories Management', path: '/story', active: false },
    { label: 'View Story', path: '', active: true },
  ];

  return story ? (
    <div className="container mx-auto px-6">
      <PageHeader breadcrumbItems={breadcrumbItems} title="View Story" />
      <StoryForm pageTitle="View Story" story={story} readOnly={true} onCancel={handleCancel} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default StoryDetail;
