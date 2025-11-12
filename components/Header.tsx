
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 text-center">
      <div className="flex justify-center items-center gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" clipRule="evenodd" fillRule="evenodd" />
          <path d="M12.5,8.5 C12.5,7.67 11.83,7 11,7 C10.17,7 9.5,7.67 9.5,8.5 C9.5,9.33 10.17,10 11,10 C11.83,10 12.5,9.33 12.5,8.5 M15.5,10.5 C15.5,9.67 14.83,9 14,9 C13.17,9 12.5,9.67 12.5,10.5 C12.5,11.33 13.17,12 14,12 C14.83,12 15.5,11.33 15.5,10.5 M20,12 C20,14.21 18.21,16 16,16 L8,16 C5.79,16 4,14.21 4,12 C4,9.79 5.79,8 8,8 L9,8 C9,6.9 9.9,6 11,6 C12.1,6 13,6.9 13,8 L16,8 C18.21,8 20,9.79 20,12 M16,11 C15.45,11 15,10.55 15,10 C15,9.45 15.45,9 16,9 C16.55,9 17,9.45 17,10 C17,10.55 16.55,11 16,11 M8,11 C7.45,11 7,10.55 7,10 C7,9.45 7.45,9 8,9 C8.55,9 9,9.45 9,10 C9,10.55 8.55,11 8,11" transform="translate(0 3) scale(0.7)"/>
        </svg>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
          Meme Magic Studio
        </h1>
      </div>
      <p className="mt-2 text-lg text-gray-400">AI-Powered Meme Generation & Editing</p>
    </header>
  );
};

export default Header;
