import React, { createContext, useContext, useState } from 'react';

const StoryContext = createContext();

export const useStory = () => useContext(StoryContext);

export const StoryProvider = ({ children }) => {
  const [storyData, setStoryData] = useState({
    id: '',
    title: '',
    writer: '',
    synopsis: '',
    category: '',
    status: '',
    tags: [],
    chapters: [],
  });

  const addChapter = (chapter) => {
    setStoryData((prevData) => ({
      ...prevData,
      chapters: [...prevData.chapters, chapter],
    }));
  };

  const updateChapter = (updatedChapter) => {
    setStoryData((prevData) => ({
      ...prevData,
      chapters: prevData.chapters.map((chapter) =>
        chapter.id == updatedChapter.id ? updatedChapter : chapter
      ),
    }));
  };

  const updateStoryData = (data) => {
    setStoryData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  const resetStoryData = () => {
    setStoryData({
      id: '',
      title: '',
      writer: '',
      synopsis: '',
      category: '',
      status: '',
      tags: [],
      chapters: [],
    })
  }

  return (
    <StoryContext.Provider value={{ storyData, addChapter, updateChapter, updateStoryData, resetStoryData }}>
      {children}
    </StoryContext.Provider>
  );
};
