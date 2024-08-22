import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { StoryProvider } from './context/StoryContext';
import AddChapter from './pages/addChapter';
import AddStory from './pages/addStory';
import EditChapter from './pages/editChapter';
import EditStory from './pages/editStory';
import Layout from './pages/layout';
import StoryDetail from './pages/storyDetail';
import StoryList from './pages/storyList';

function App() {
  return (
    <StoryProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path='story' element={<StoryList />} />
            <Route path='story/add' element={<AddStory />} />
            <Route path='story/:storyId' element={<StoryDetail />} />
            <Route path="story/:storyId/edit" element={<EditStory />} />
            <Route path='story/chapter/add' element={<AddChapter />} />
            <Route path='story/:storyId/chapter/:chapterId/edit' element={<EditChapter />} />
          </Route>
        </Routes>
      </Router>
    </StoryProvider>
  );
}

export default App;
