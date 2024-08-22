import React, { createContext, useContext, useState } from 'react';

const StoryContext = createContext();

export const useStory = () => useContext(StoryContext);

export const StoryProvider = ({ children }) => {
  const [storyData, setStoryData] = useState({
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
    console.log("updated chapter: ", updatedChapter, storyData)
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

  return (
    <StoryContext.Provider value={{ storyData, addChapter, updateChapter, updateStoryData }}>
      {children}
    </StoryContext.Provider>
  );
};
