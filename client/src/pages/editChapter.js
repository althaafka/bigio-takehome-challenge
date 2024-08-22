import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChapterForm from '../components/ChapterForm';
import PageHeader from '../components/PageHeader'; // Import PageHeader
import { useStory } from '../context/StoryContext';

const EditChapter = () => {
  const { storyId, chapterId } = useParams();
  const { storyData, updateChapter } = useStory();
  const [chapter, setChapter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundChapter = storyData.chapters.find(chap => chap.id == chapterId);
    if (foundChapter) {
      setChapter(foundChapter);
    }
  }, [chapterId, storyData.chapters]);

  const handleSave = (updatedChapter) => {
    updateChapter({ ...updatedChapter, id: Number(chapterId) });
    navigate(`/story/${storyId}/edit`);
  };

  const handleCancel = () => {
    navigate(`/story/${storyId}/edit`);
  };

  const breadcrumbItems = [
    { label: 'Stories Management', path: '/story', active: false },
    { label: 'Edit Story', path: `/story/${storyId}/edit`, active: false },
    { label: 'Edit Chapter', path: '', active: true },
  ];

  return chapter ? (
    <div className="container mx-auto px-6">
      <PageHeader breadcrumbItems={breadcrumbItems} title="Edit Chapter" />
      <ChapterForm chapter={chapter} onSave={handleSave} onCancel={handleCancel} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default EditChapter;