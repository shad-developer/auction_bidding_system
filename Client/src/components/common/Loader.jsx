import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-t-2 border-b-2 border-gray-900 h-16 w-16"></div>
    </div>
  );
};

export default Loader;