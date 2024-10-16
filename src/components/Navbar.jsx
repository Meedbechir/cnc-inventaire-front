import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    navigate('/login');
  };

  return (
    <>
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/home" className="text-white text-4xl hover:text-gray-400">
            CNC
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            )}
          </button>
        </div>

        <div className="hidden md:flex space-x-4 text-white items-center">
          <a href="/home" className="hover:text-gray-400">Accueil</a>
          <a href="/users" className="hover:text-gray-400">Utilisateurs</a>
          <a href="/designations" className="hover:text-gray-400">Articles</a>
          <a href="/articles" className="hover:text-gray-400">Liste des Articles</a>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Déconnexion
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-2 text-white text-center">
            <a href="/home" className="block py-2 hover:text-gray-400">Accueil</a>
            <a href="/articles" className="block py-2 hover:text-gray-400">Articles</a>
            <a href="/users" className="block py-2 hover:text-gray-400">Utilisateurs</a>
            <button 
              onClick={() => {
                setIsOpen(false);
                handleLogout(); 
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md w-full"
            >
              Déconnexion
            </button>
          </div>
        </div>
      )}
    </nav>
    </>
  );
};

export default Navbar;
