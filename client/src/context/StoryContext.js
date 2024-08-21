import React, { createContext, useContext, useState } from 'react';

const StoryContext = createContext();

export const useStory = () => useContext(StoryContext);

export const StoryProvider = ({ children }) => {
  const [chapters, setChapters] = useState([]);
  const [storyData, setStoryData] = useState({
    title: '',
    writer: '',
    synopsis: '',
    category: '',
    status: '',
    tags: [],
  });

  const addChapter = (chapter) => {
    setChapters((prevChapters) => [...prevChapters, chapter]);
  };

  const updateStoryData = (data) => {
    setStoryData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  return (
    <StoryContext.Provider value={{ chapters, addChapter, storyData, updateStoryData }}>
      {children}
    </StoryContext.Provider>
  );
};
