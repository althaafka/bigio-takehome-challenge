import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

const DropdownForm = ({ label, options, selectedValue, onSelect }) => {
  return (
    <>
      <span className="font-medium text-sm">{label}</span>
      <Dropdown
        placement='bottom-start'
        classNames={{
          content: "mt-2 p-2 block w-full border rounded",
        }}
      >
        <DropdownTrigger className="w-full">
          <Button 
            color='default'
            variant='light'
            className="w-full capitalize justify-between bg-white border rounded flex items-center"
            endContent={<ChevronDownIcon />}
          >
            {selectedValue ? selectedValue : `${label}`}
          </Button>
        </DropdownTrigger>
        <DropdownMenu onAction={onSelect} className="bg-white w-full">
          {options.map((option) => (
            <DropdownItem key={option.uid} value={option.uid} className="bg-white">
              {option.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default DropdownForm;
