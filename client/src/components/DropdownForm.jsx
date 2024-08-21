import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

const DropdownForm = ({ label, options, selectedValue, onSelect }) => {
  return (
    <>
      <span className="font-semibold">{label}</span>
      <Dropdown
        classNames={{
          content: "py-1 px-1 border border-default-200 bg-white",
        }}
      >
        <DropdownTrigger className="bg-white border rounded-sm flex justify-between">
          <Button 
            color='default'
            variant='light'
            className="capitalize"
            endContent={<ChevronDownIcon/>}
          >
            {selectedValue ? selectedValue : `${label}`}
          </Button>
        </DropdownTrigger>
        <DropdownMenu onAction={onSelect} className="bg-white">
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
