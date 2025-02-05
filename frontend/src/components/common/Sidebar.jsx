import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navbarData = [
  {
    title: 'Boards',
    link: '/boards',
  },
  {
    title: 'Members',
    link: '/members',
  },
  {
    title: 'Timeline',
    link: '/timeline',
  },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="flex md:h-screen">
      <div className="w-full md:w-64 bg-gray-800 text-white md:fixed md:h-full border-r border-gray-600">
        <div className="p-4 border-b border-gray-600 text-center">
          <h1 className="text-2xl font-bold">
            Hey, <span className="text-theme">Shafayet.</span>
          </h1>
          <p>Welcome Back!</p>
        </div>

        <nav className="md:mt-10">
          <ul className="flex md:flex-col gap-x-1 md:gap-x-0">
            {navbarData.map((item, i) => (
              <Link to={item.link} key={i} className="w-full">
                <li
                  className={`w-full p-4 ${
                    location.pathname === item.link ? 'bg-gray-700' : ''
                  } hover:bg-gray-700/50`}
                >
                  {item.title}
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
