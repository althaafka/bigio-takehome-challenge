import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { useStory } from '../context/StoryContext'; 

const AddChapter = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const { addChapter } = useStory(); 
  const navigate = useNavigate();

  const handleSave = () => {
    const newChapter = {
      title,
      content,
      lastUpdated: new Date().toISOString(), 
    };

    addChapter(newChapter);
    navigate('/story/add');  
  };

  return (
    <div className="container mx-auto px-6">
      <h2 className="text-2xl font-bold mb-4">Add Chapter</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 block w-full border rounded"
            placeholder="Title"
          />
        </div>
        <div className="mb-16">
          <label className="block text-sm font-medium">Story</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={{
              toolbar: [
                [{ 'color': [] }, { 'background': [] }, 'bold', 'italic', 'underline', 'strike'], 
                [{ 'size': [] }],                      
                [{ 'align': [] }],              
                [{ 'header': 1 }, { 'header': 2 }], 
                [{ 'list': 'ordered' }, { 'list': 'bullet' }], 
                ['link', 'code-block', 'image'],   
              ],
            }}
            className="mt-1"
            style={{ height: '400px' }} 
          />
        </div>
        <div className="flex justify-end">
          <button type="button" className="mr-4 bg-gray-300 text-black px-4 py-2 rounded">
            Cancel
          </button>
          <button type="submit" className="bg-orange1 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddChapter;
