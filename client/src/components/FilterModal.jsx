import React, { useState } from 'react';
import { Modal, Button, Dropdown, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { FilterIcon } from '../components/icons/FilterIcon';

const FilterModal = ({ onApplyFilter, onResetFilter, initialCategory, initialStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleApply = () => {
    onApplyFilter(selectedCategory, selectedStatus);
    closeModal();
  };

  const handleReset = () => {
    setSelectedCategory(''); 
    setSelectedStatus('');
    onResetFilter();
    closeModal();
  };

  return (
    <>
      <Button isIconOnly variant="flat" radius="full" className="bg-white border" onPress={openModal}>
        <FilterIcon />
      </Button>
      <Modal open={isOpen} onClose={closeModal} closeButton>
        <Modal.Header>
          <h3>Filter</h3>
        </Modal.Header>
        <Modal.Body>
          <Dropdown>
            <Dropdown.Menu
              aria-label="Category"
              selectedKeys={selectedCategory}
              onSelectionChange={setSelectedCategory}
            >
              <DropdownItem key="adventure">Adventure</DropdownItem>
              <DropdownItem key="mystery">Mystery</DropdownItem>
              <DropdownItem key="romance">Romance</DropdownItem>
              <DropdownItem key="science">Science</DropdownItem>
              <DropdownItem key="fantasy">Fantasy</DropdownItem>
              <DropdownItem key="history">History</DropdownItem>
              <DropdownItem key="action">Action</DropdownItem>
              <DropdownItem key="strategy">Strategy</DropdownItem>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Menu
              aria-label="Status"
              selectedKeys={selectedStatus}
              onSelectionChange={setSelectedStatus}
            >
              <DropdownItem key="draft">Draft</DropdownItem>
              <DropdownItem key="publish">Publish</DropdownItem>
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={handleReset}>
            Reset
          </Button>
          <Button auto onPress={handleApply}>
            Filter
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FilterModal;
