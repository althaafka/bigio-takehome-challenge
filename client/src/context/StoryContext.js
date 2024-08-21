import React, { createContext, useContext, useState } from 'react';

const StoryContext = createContext();

export const useStory = () => useContext(StoryContext);

export const StoryProvider = ({ children }) => {
  const [chapters, setChapters] = useState([]);

  const addChapter = (chapter) => {
    setChapters((prevChapters) => [...prevChapters, chapter]);
  };

  return (
    <StoryContext.Provider value={{ chapters, addChapter }}>
      {children}
    </StoryContext.Provider>
  );
};
