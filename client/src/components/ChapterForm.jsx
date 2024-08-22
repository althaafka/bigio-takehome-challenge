import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ChapterForm = ({ chapter = {}, readOnly = false, onSave, onCancel }) => {
  const [content, setContent] = useState(chapter.content || '');
  const [title, setTitle] = useState(chapter.title || '');

  useEffect(() => {
    if (readOnly) {
      setContent(chapter.content || '');
      setTitle(chapter.title || '');
    }
  }, [chapter, readOnly]);

  const handleSave = () => {
    if (onSave) {
      const updatedChapter = {
        title,
        content,
        lastUpdated: new Date().toISOString(),
      };
      onSave(updatedChapter);
    }
  };

  return (
    <div className="container mx-auto px-6">
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 block w-full border rounded"
            placeholder="Title"
            disabled={readOnly}
          />
        </div>
        <div className="mb-16">
          <label className="block text-sm font-medium">Story</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={{
              toolbar: readOnly ? false : [
                [{ 'color': [] }, { 'background': [] }, 'bold', 'italic', 'underline', 'strike'], 
                [{ 'size': [] }],                      
                [{ 'align': [] }],              
                [{ 'header': 1 }, { 'header': 2 }], 
                [{ 'list': 'ordered' }, { 'list': 'bullet' }], 
                ['link', 'code-block', 'image'],   
              ],
            }}
            readOnly={readOnly}
            className="mt-1"
            style={{ height: '400px' }}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="mr-4 bg-gray-300 text-black px-4 py-2 rounded"
            onClick={onCancel}
            disabled={readOnly}
          >
            Cancel
          </button>
          {!readOnly && (
            <button type="submit" className="bg-orange1 text-white px-4 py-2 rounded">
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChapterForm;
