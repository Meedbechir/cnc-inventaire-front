import React, { useState } from 'react';
import Navbar from './Navbar';

const Article = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [designation, setDesignation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [family, setFamily] = useState('');
  const [origin, setOrigin] = useState('');
  const [status, setStatus] = useState('Bon');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ designation, quantity, location, family, origin, status });
    setIsModalOpen(false);
  };

  return (
    <>
    <Navbar />
    <div className="p-12">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Ajouter un nouveau article
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-3/4 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4">Ajouter un Article</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2">Désignation</label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="border border-gray-300 rounded-md w-full p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2">Quantité</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="border border-gray-300 rounded-md w-full p-2"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2">Emplacement</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border border-gray-300 rounded-md w-full p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2">Famille</label>
                  <input
                    type="text"
                    value={family}
                    onChange={(e) => setFamily(e.target.value)}
                    className="border border-gray-300 rounded-md w-full p-2"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2">Origine</label>
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="border border-gray-300 rounded-md w-full p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2">État</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border border-gray-300 rounded-md w-full p-2"
                  >
                    <option value="Bon">Bon</option>
                    <option value="Moyen">Moyen</option>
                    <option value="Mauvais">Mauvais</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between mb-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded-md"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Article;
