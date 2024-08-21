import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddChapter = () => {
  const [content, setContent] = useState('');

  const modules = {
    toolbar: [
      [{ 'color': [] }, { 'background': [] }, 'bold', 'italic', 'underline', 'strike'], 
      [{ 'size': [] }],                      
      [{ 'align': [] }],              
      [{ 'header': 1 }, { 'header': 2 }], 
      [{ 'list': 'ordered' }, { 'list': 'bullet' }], 
      ['link', 'code-block', 'image'],   
    ],
  };

  return (
    <div className="container mx-auto px-6">
      <h2 className="text-2xl font-bold mb-4">Add Chapter</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            className="mt-1 p-2 block w-full border rounded"
            placeholder="Title"
          />
        </div>
        <div className="mb-16">
          <label className="block text-sm font-medium">Story</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={modules}
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
