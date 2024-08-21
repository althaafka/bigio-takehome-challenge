import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './pages/layout';
import StoryList from './pages/storyList'
import AddStory from './pages/addStory';
import AddChapter from './pages/addChapter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path='story' element={<StoryList />} />
          <Route path='story/add' element={<AddStory />} />
          <Route path='story/add-chapter' element={<AddChapter />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
