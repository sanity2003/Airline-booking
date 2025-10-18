
import React from 'react';

const Card = ({ children, title }) => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      {title && (
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;