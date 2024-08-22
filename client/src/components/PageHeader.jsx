import React from 'react';
import Breadcrumb from './Breadcrumb';
import BackButton from './BackButton';

const PageHeader = ({ breadcrumbItems, title }) => {
  return (
    <div className="container mx-auto px-6 mb-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <BackButton />
      </div>
    </div>
  );
};

export default PageHeader;
