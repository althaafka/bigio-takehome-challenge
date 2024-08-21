import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
} from '@nextui-org/react';
import { PlusIcon } from '../components/icons/PlusIcon';
import { VerticalDotsIcon } from '../components/icons/VerticalDotsIcon';
import { SearchIcon } from '../components/icons/SearchIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';

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
  { name: "Draft", uid: "active" },
  { name: "Publish", uid: "paused" },
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
const rowsPerPage = 5;

const StoryList = () => {
  const [filterValue, setFilterValue] = React.useState('');
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: 'title',
    direction: 'ascending',
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredStories = [...stories];

    if (hasSearchFilter) {
      filteredStories = filteredStories.filter((story) =>
        story.title.toLowerCase().includes(filterValue.toLowerCase()) ||
        story.writer.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
      filteredStories = filteredStories.filter((story) =>
        Array.from(statusFilter).includes(story.status)
      );
    }

    return filteredStories;
  }, [stories, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((story, columnKey, index) => {
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

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
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
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<PlusIcon />}>
              Add New
            </Button>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    stories.length,
    onSearchChange,
    onClear,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
    <div className="flex justify-between items-center">
      <span className="text-default-400 text-small">Menampilkan {rowsPerPage} dari {stories.length} data</span>
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
  }, [page, pages, onPreviousPage, onNextPage]);

  return (
    <div className="px-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Story Management</h2>
      </div>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: 'max-h-[382px]',
        }}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={'No stories found'} items={sortedItems}>
          {sortedItems.map((item, index) => (
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
