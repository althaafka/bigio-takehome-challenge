import React from 'react';
import ChapterForm from '../components/ChapterForm';
import PageHeader from '../components/PageHeader';
import { useNavigate } from 'react-router-dom';
import { useStory } from '../context/StoryContext';

const AddChapter = () => {
  const { addChapter } = useStory();
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: 'Stories Management', path: '/story', active: false },
    { label: 'Add Stories', path: '/story/add', active: false },
    { label: 'Add Chapter', path: '', active: true },
  ];

  const handleSave = (newChapter) => {
    addChapter(newChapter);
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-6">
      <PageHeader breadcrumbItems={breadcrumbItems} title="Add Chapter" />
      <ChapterForm onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
};

export default AddChapter;