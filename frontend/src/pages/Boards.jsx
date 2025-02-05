import React from 'react';
import Filters from '../components/boards/Filters';
import BoardCard from '../components/boards/BoardCard';

const Boards = () => {
  return (
    <div>
      <header className="bg-gray-800 p-4 flex flex-col md:flex-row gap-y-2 md:gap-y-0 justify-between items-center mt-1 md:mt-0">
        <h2 className="text-xl font-semibold">Welcome to the Boards!</h2>
        <Filters />
      </header>

      {/*  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        <BoardCard />
      </div>
    </div>
  );
};

export default Boards;
