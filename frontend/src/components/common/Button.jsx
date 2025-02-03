import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ link, title, type, classname }) => {
  return link ? (
    <Link to={link}>{title}</Link>
  ) : (
    <button
      type={type}
      className={`bg-theme text-white py-3 px-8 rounded-md hover:bg-opacity-90 duration-300 ${classname}`}
    >
      {title}
    </button>
  );
};

export default Button;
