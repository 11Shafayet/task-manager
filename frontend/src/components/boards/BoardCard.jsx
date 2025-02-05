import React from 'react';
import BoardItem from './BoardItem';

const BoardCard = () => {
  return (
    <div>
      <div className="w-full bg-gray-700 rounded overflow-hidden p-2 md:p-4">
        {/* topbar */}
        <div className="bg-red-600 w-full p-2">topbar</div>

        <div className="flex flex-col gap-y-2 mt-2">
          {/* board items */}
          <div className="flex flex-col gap-y-2">
            <BoardItem />
          </div>

          {/* add a card */}
          <div className="p-3 bg-gray-600 hover:bg-gray-500 text-white text-center cursor-pointer rounded">
            + Add a card
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
