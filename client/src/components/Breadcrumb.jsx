import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="text-gray-500 text-sm mb-4">
      {items.map((item, index) => (
        <span key={index}>
          {index !== 0 && <span className="mx-2">{'>'}</span>}
          {item.active ? (
            <span className="text-blue1">{item.label}</span>
          ) : (
            <Link to={item.path} className="hover:text-blue1">
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;