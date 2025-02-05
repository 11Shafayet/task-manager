import React from 'react';

const Filters = () => {
  return (
    <div className="flex space-x-4">
      {/* Select Option */}
      <select className="p-2 px-4 rounded bg-gray-600 focus:outline-none focus:bg-gray-500">
        <option value="">Filter by Member</option>
        <option value="member1">Member 1</option>
        <option value="member2">Member 2</option>
        <option value="member3">Member 3</option>
        <option value="member4">Member 4</option>
        <option value="member5">Member 5</option>
      </select>

      {/* Text Field Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        className="p-2 bg-gray-600 rounded focus:outline-none focus:bg-gray-500"
      />
    </div>
  );
};

export default Filters;
