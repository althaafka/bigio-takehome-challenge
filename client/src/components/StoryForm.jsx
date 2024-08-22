import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import DropdownForm from '../components/DropdownForm';
import { PlusIcon } from '../components/icons/PlusIcon';
import { VerticalDotsIcon } from '../components/icons/VerticalDotsIcon';
import { useStory } from '../context/StoryContext';

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

const StoryForm = ({ story = {}, readOnly = false, onSave, onCancel }) => {
  const { storyData, updateStoryData, addChapter, updateChapter } = useStory();
  const navigate = useNavigate();

  const [title, setTitle] = useState(story.title || storyData.title);
  const [writer, setWriter] = useState(story.writer || storyData.writer);
  const [synopsis, setSynopsis] = useState(story.synopsis || storyData.synopsis);
  const [category, setCategory] = useState(story.category || storyData.category);
  const [status, setStatus] = useState(story.status || storyData.status);
  const [tags, setTags] = useState(story.keywords ? JSON.parse(story.keywords) : storyData.tags);
  const [coverImage, setCoverImage] = useState(story.coverImage || null);
  const [chapters, setChapters] = useState(story.chapters || storyData.chapters);


  useEffect(() => {
    if (!readOnly) {
      updateStoryData({ title, writer, synopsis, category, status, tags, chapters });
    }
  }, [])

  useEffect(() => {
    if (!readOnly) {
      updateStoryData({ title, writer, synopsis, category, status, tags, chapters });
    }
  }, [title, writer, synopsis, category, status, tags, readOnly, chapters]);

  const handleDeleteTag = (i) => {
    setTags(tags.filter((_, index) => index !== i));
  };

  const handleAddTag = (tag) => {
    setTags([...tags, tag]);
  };

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSave = async () => {
    if (onSave) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('author', writer);
      formData.append('synopsis', synopsis);
      formData.append('category', category);
      formData.append('status', status);
      formData.append('tags', JSON.stringify(tags));
      formData.append('chapters', JSON.stringify(chapters));
      if (coverImage && typeof coverImage !== 'string') {
        formData.append('coverImage', coverImage);
      }
      await onSave(formData);
    }
  };

  const handleAddChapter = () => {
    if (!readOnly) navigate('/chapter/add');
  };

  const handleEditChapter = (chapterId) => {
    if (!readOnly) navigate(`/story/${story.id}/chapter/${chapterId}/edit`);
  };

  const handleDeleteChapter = (chapterId) => {
    if (!readOnly) {
      setChapters(chapters.filter(chapter => chapter.id !== chapterId));
    }
  };

  return (
    <div className="container mx-auto px-6">
      <h2 className="text-2xl font-bold mb-4">{readOnly ? 'Story Details' : 'Add Stories'}</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 block w-full border rounded"
              type="text"
              placeholder="Title"
              disabled={readOnly}
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
              disabled={readOnly}
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
            disabled={readOnly}
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="w-full">
            <DropdownForm
              label="Category"
              options={categoryOptions}
              selectedValue={category}
              onSelect={setCategory}
              disabled={readOnly}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tags/Keywords Story</label>
            <ReactTags
              tags={tags}
              handleDelete={handleDeleteTag}
              handleAddition={handleAddTag}
              placeholder='Add new tag'
              readOnly={readOnly}
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
            {coverImage && typeof coverImage === 'string' && (
              <div className="mb-2">
                <img src={`http://localhost:5000/uploads/${coverImage}`} alt="Cover" className="w-full h-auto rounded" />
              </div>
            )}
            <input
              className="mt-1 p-1 block w-full border rounded"
              type="file"
              onChange={handleFileChange}
              disabled={readOnly}
            />
          </div>
          <div>
            <DropdownForm
              label="Status"
              options={statusOptions}
              selectedValue={status}
              onSelect={setStatus}
              disabled={readOnly}
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
                          <Button isIconOnly size="sm" variant="light" disabled={readOnly}>
                            <VerticalDotsIcon className="text-default-300" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                          <DropdownItem disabled={readOnly} onClick={() => handleEditChapter(chapter.id)}>Edit</DropdownItem>
                          <DropdownItem disabled={readOnly} onClick={() => handleDeleteChapter(chapter.id)}>Delete</DropdownItem>
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
            onClick={onCancel}
          >
            Cancel
          </button>
          {!readOnly && (
            <button
              type="submit"
              className="bg-orange1 text-white px-6 py-2 rounded-full"
            >
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StoryForm;