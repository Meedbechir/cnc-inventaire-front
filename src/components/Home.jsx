import React from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="flex flex-col justify-between">
      <Navbar />

      {/* Contenu principal */}
      <div className="container mx-auto flex flex-col items-center justify-center flex-grow py-8">
        <h1 className="text-4xl font-bold mb-8">Bienvenue sur CNC Inventaire</h1>
      </div>

      {/* Section des cartes */}
      <div className="container mx-auto py-4"> 
        <div className="flex justify-around">
          <div className="bg-gray-100 shadow-lg rounded-lg p-6 w-1/4 text-center">
            <h2 className="text-3xl font-bold mb-4">120</h2>
            <p className="text-gray-600">Nouveaux articles</p>
          </div>
          
          <div className="bg-gray-100 shadow-lg rounded-lg p-6 w-1/4 mx-4 text-center">
            <h2 className="text-3xl font-bold mb-4">30</h2>
            <p className="text-gray-600">Articles bon</p>
          </div>
          
          <div className="bg-gray-100 shadow-lg rounded-lg p-6 w-1/4 text-center">
            <h2 className="text-3xl font-bold mb-4">10</h2>
            <p className="text-gray-600">Articles défectueux</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
