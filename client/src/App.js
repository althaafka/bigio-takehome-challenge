import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './pages/layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          {/* <Route index element={<Home />} />
          <Route path='story' element={<Story />} />
          <Route path='story/add' element={<StoryAdd />} />
          <Route path='story/add-chapter' element={<StoryAddChapter />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
