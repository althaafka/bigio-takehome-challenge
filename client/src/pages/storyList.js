import React, { useState, useMemo, useCallback } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@nextui-org/react';
import { PlusIcon } from '../components/icons/PlusIcon';
import { VerticalDotsIcon } from '../components/icons/VerticalDotsIcon';
import { SearchIcon } from '../components/icons/SearchIcon';
import { FilterIcon } from '../components/icons/FilterIcon';
import DropdownForm from '../components/DropdownForm';

const columns = [
  { name: "No", uid: "nomor" },
  { name: "Title", uid: "title" },
  { name: "Writers", uid: "writer" },
  { name: "Category", uid: "category" },
  { name: "Keyword", uid: "keywords" },
  { name: "Status", uid: "status" },
  { name: "", uid: "actions" },
];

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const statusOptions = [
  { name: "Draft", uid: "draft" },
  { name: "Publish", uid: "publish" },
];

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

const stories = [
  {
    id: 1,
    title: "The Journey Begins",
    writer: "John Doe",
    category: "Adventure",
    keywords: ["journey", "adventure", "begins"],
    status: "publish",
  },
  {
    id: 2,
    title: "Mystery of the Old House",
    writer: "Jane Smith",
    category: "Mystery",
    keywords: ["mystery", "old house", "ghost"],
    status: "draft",
  },
  {
    id: 3,
    title: "Love in the Time of Cholera",
    writer: "Gabriel Garcia Marquez",
    category: "Romance",
    keywords: ["love", "cholera", "romance"],
    status: "publish",
  },
  {
    id: 4,
    title: "The Science of Everything",
    writer: "Isaac Newton",
    category: "Science",
    keywords: ["science", "everything", "physics"],
    status: "publish",
  },
  {
    id: 5,
    title: "Fantasy World",
    writer: "J.K. Rowling",
    category: "Fantasy",
    keywords: ["fantasy", "magic", "wizard"],
    status: "draft",
  },
  {
    id: 6,
    title: "The History of Time",
    writer: "Stephen Hawking",
    category: "History",
    keywords: ["history", "time", "universe"],
    status: "publish",
  },
  {
    id: 7,
    title: "The Last Stand",
    writer: "Chris Evans",
    category: "Action",
    keywords: ["action", "battle", "stand"],
    status: "draft",
  },
  {
    id: 8,
    title: "The Mystery of the Missing Artifact",
    writer: "Agatha Christie",
    category: "Mystery",
    keywords: ["mystery", "artifact", "missing"],
    status: "publish",
  },
  {
    id: 9,
    title: "The Art of War",
    writer: "Sun Tzu",
    category: "Strategy",
    keywords: ["strategy", "war", "art"],
    status: "draft",
  },
  {
    id: 10,
    title: "The Secrets of the Universe",
    writer: "Carl Sagan",
    category: "Science",
    keywords: ["universe", "secrets", "science"],
    status: "publish",
  },
];

const statusColorMap = {
  publish: 'success',
  draft: 'warning',
};

const INITIAL_VISIBLE_COLUMNS = ['nomor', 'title', 'writer', 'category', 'keywords', 'status', 'actions'];
const rowsPerPage = 8;

const StoryList = () => {
  const [filterValue, setFilterValue] = useState('');
  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [tempCategoryFilter, setTempCategoryFilter] = useState('');
  const [tempStatusFilter, setTempStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns;
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredStories = [...stories];

    if (filterValue) {
      filteredStories = filteredStories.filter(
        (story) =>
          story.title.toLowerCase().includes(filterValue.toLowerCase()) ||
          story.writer.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (categoryFilter) {
      filteredStories = filteredStories.filter(
        (story) => story.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    if (statusFilter) {
      filteredStories = filteredStories.filter(
        (story) => story.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    return filteredStories;
  }, [filterValue, categoryFilter, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems]);

  const handleFilterApply = () => {
    setCategoryFilter(tempCategoryFilter);
    setStatusFilter(tempStatusFilter);
  };

  const handleFilterReset = () => {
    setTempCategoryFilter('');
    setTempStatusFilter('');
  };

  const renderCell = useCallback((story, columnKey, index) => {
    const cellValue = story[columnKey];

    switch (columnKey) {
      case 'nomor':
        return <span>{index + 1 + (page - 1) * rowsPerPage}</span>;
      case 'title':
        return <span>{cellValue}</span>;
      case 'writer':
        return <span>{cellValue}</span>;
      case 'category':
        return <span>{cellValue}</span>;
      case 'keywords':
        return (
          <div className="flex flex-wrap gap-1">
            {cellValue.map((keyword, idx) => (
              <Chip key={idx} className="capitalize" size="sm" variant="flat">
                {keyword}
              </Chip>
            ))}
          </div>
        );
      case 'status':
        return (
          <Chip className="capitalize" color={statusColorMap[story.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case 'actions':
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, [page]);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[25%]"
            placeholder="Search by Writers/Title"
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Popover>
              <PopoverTrigger>
                <Button isIconOnly variant="flat" radius="full" className="bg-white border">
                  <FilterIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="p-4 flex flex-col gap-3 bg-white">
                  <DropdownForm
                    label="Category"
                    options={categoryOptions}
                    selectedValue={tempCategoryFilter ? capitalize(tempCategoryFilter) : ""}
                    onSelect={setTempCategoryFilter}
                  />
                  <DropdownForm
                    label="Status"
                    options={statusOptions}
                    selectedValue={tempStatusFilter ? capitalize(tempStatusFilter) : ""}
                    onSelect={setTempStatusFilter}
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <Button auto flat color="error" onClick={handleFilterReset}>
                      Reset
                    </Button>
                    <Button auto onClick={handleFilterApply}>
                      Apply
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Button color="primary" endContent={<PlusIcon />}>
              Add New
            </Button>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    tempCategoryFilter,
    tempStatusFilter,
    onSearchChange,
    onClear,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">Menampilkan {items.length < rowsPerPage? items.length: rowsPerPage} dari {filteredItems.length} data</span>
        <div className="py-2 px-2 flex justify-end items-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
          />
        </div>
      </div>
    );
  }, [page, pages, onPreviousPage, onNextPage, filteredItems]);

  return (
    <div className="px-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Story Management</h2>
      </div>
      <Table
        aria-label=""
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        topContent={topContent}
        topContentPlacement="outside"
        className="bg-gray1 p-4 mt-6"
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={'No stories found'} items={items}>
          {items.map((item, index) => (
            <TableRow key={item.id}>
              {headerColumns.map((column) => (
                <TableCell key={column.uid}>
                  {renderCell(item, column.uid, index)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StoryList;
