import React, { useState, useEffect } from 'react';
import DropdownForm from '../components/DropdownForm';
import { WithContext as ReactTags } from 'react-tag-input';
import { VerticalDotsIcon } from '../components/icons/VerticalDotsIcon';
import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { PlusIcon } from '../components/icons/PlusIcon';
import { useStory } from '../context/StoryContext'; 
import { useNavigate } from 'react-router-dom';

const categoryOptions = [
    { name: "Adventure", uid: "adventure" },
    { name: "Mystery", uid: "mystery" },
    { name: "Romance", uid: "romance" },
    { name: "Science", uid: "science" },
    { name: "Fantasy", uid: "fantasy" },
    { name: "History", uid: "history" },
    { name: "Action", uid: "action" },
    { name: "Strategy", uid: "strategy" },
  ];
  

const statusOptions = [
  { name: 'Publish', uid: 'publish' },
  { name: 'Draft', uid: 'draft' },
];

const AddStory = () => {
  const { chapters, storyData, updateStoryData } = useStory();
  const navigate = useNavigate();

  const [title, setTitle] = useState(storyData.title);
  const [writer, setWriter] = useState(storyData.writer);
  const [synopsis, setSynopsis] = useState(storyData.synopsis);
  const [category, setCategory] = useState(storyData.category);
  const [status, setStatus] = useState(storyData.status);
  const [tags, setTags] = useState(storyData.tags);
  const [coverImage, setCoverImage] = useState(null);

  useEffect(() => {
    updateStoryData({ title, writer, synopsis, category, status, tags });
  }, [title, writer, synopsis, category, status, tags]);

  const handleDelete = (i) => {
    setTags(tags.filter((_, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSaveStory = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', writer);
    formData.append('synopsis', synopsis);
    formData.append('category', category);
    formData.append('status', status);
    formData.append('tags', JSON.stringify(tags));
    formData.append('chapters', JSON.stringify(chapters));
    if (coverImage) {
      formData.append('coverImage', coverImage);
    }

    try {
      const response = await fetch('http://localhost:5000/api/stories', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.json();
        navigate('/story')
      } else {
        console.error('Failed to save story:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving story:', error);
    }
  };

  const handleAddChapter = () => {
    navigate('/story/add-chapter');
  }

  const handleCancel = () => {
  };

  return (
    <div className="container mx-auto px-6">
      <h2 className="text-2xl font-bold mb-4">Add Stories</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSaveStory(); }} className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 block w-full border rounded"
              type="text"
              placeholder="Title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Writer Name</label>
            <input
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
              className="mt-1 p-2 block w-full border rounded"
              type="text"
              placeholder="Writer Name"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Synopsis</label>
          <textarea
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            className="mt-1 p-2 block w-full border rounded"
            rows="4"
            placeholder="Synopsis"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="w-full">
            <DropdownForm
              label="Category"
              options={categoryOptions}
              selectedValue={category}
              onSelect={setCategory}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tags/Keywords Story</label>
            <ReactTags
              tags={tags}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              placeholder='Add new tag'
              classNames={{
                tagsInput: 'mt-1 p-2 w-full border rounded',
                tag: 'bg-orange-500 text-white rounded-full px-3 py-1 mr-2 mb-2 inline-flex items-center',
                tagText: 'text-white',
                remove: 'ml-2 text-white cursor-pointer',
                input: 'w-full p-2 rounded border',
              }}
              maxTags={5}
              inputFieldPosition="bottom"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-4">
          <div>
            <label className="block text-sm font-medium">Cover Image</label>
            <input
              className="mt-1 p-1 block w-full border rounded"
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <DropdownForm
              label="Status"
              options={statusOptions}
              selectedValue={status}
              onSelect={setStatus}
            />
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-4 flex justify-end">
            <Button color="primary" endContent={<PlusIcon />} className="bg-orange1 rounded-full !important" onClick={handleAddChapter}>
              Add New
            </Button>
          </div>
          <table className="min-w-full bg-white border rounded text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left font-medium">Title</th>
                <th className="px-4 py-2 text-left font-medium">Last Updated</th>
                <th className="px-4 py-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {chapters.map((chapter, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-t">{chapter.title}</td>
                  <td className="px-4 py-2 border-t">{chapter.lastUpdated}</td>
                  <td className="px-4 py-2 border-t text-right">
                    <div className="relative flex justify-end items-center gap-2">
                      <Dropdown>
                        <DropdownTrigger>
                          <Button isIconOnly size="sm" variant="light">
                            <VerticalDotsIcon className="text-default-300" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                          <DropdownItem>Edit</DropdownItem>
                          <DropdownItem>Delete</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="button"
            className="mr-4 bg-gray-300 text-black px-4 py-2 rounded-full"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-orange1 text-white px-6 py-2 rounded-full"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStory;
