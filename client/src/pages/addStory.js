import React, { useState } from 'react';
import DropdownForm from '../components/DropdownForm';
import { WithContext as ReactTags } from 'react-tag-input';
import { VerticalDotsIcon } from '../components/icons/VerticalDotsIcon';
import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { PlusIcon } from '../components/icons/PlusIcon';
import { useStory } from '../context/StoryContext'; 
import { useNavigate } from 'react-router-dom';

const categoryOptions = [
  { name: 'Financial', uid: 'financial' },
  { name: 'Technology', uid: 'technology' },
  { name: 'Health', uid: 'health' },
];

const statusOptions = [
  { name: 'Publish', uid: 'publish' },
  { name: 'Draft', uid: 'draft' },
];

const AddStory = () => {
  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [tags, setTags] = useState([]);
  const { chapters } = useStory(); 
  const navigate = useNavigate();

  const handleDelete = (i) => {
    setTags(tags.filter((_, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleSaveStory = () => {
    const data = {
      title,
      writer,
      synopsis,
      category,
      status,
      tags,
      chapters, 
    };
    console.log(data);
  };

  const handleAddChapter = () => {
    navigate('/story/add-chapter')
  }

  const handleCancel = () => {
    // Add logic to handle cancellation
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
