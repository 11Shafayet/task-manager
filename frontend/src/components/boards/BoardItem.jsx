import React from 'react';
import { FaEdit } from 'react-icons/fa';

const BoardItem = () => {
  return (
    <div className="p-4 bg-gray-600 hover:bg-gray-500 rounded">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Board Title</h1>
        <FaEdit />
      </div>
      <p className="text-gray-400">3 tasks</p>
    </div>
  );
};

export default BoardItem;
