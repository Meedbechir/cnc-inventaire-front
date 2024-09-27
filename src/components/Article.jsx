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

        {/* Tableau des articles */}
        <div className="mt-8">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-left">
                <th className="py-3 px-4 border">Désignation</th>
                <th className="py-3 px-4 border">Quantité</th>
                <th className="py-3 px-4 border">Emplacement</th>
                <th className="py-3 px-4 border">Famille</th>
                <th className="py-3 px-4 border">Origine</th>
                <th className="py-3 px-4 border">État</th>
              </tr>
            </thead>
            <tbody>
              {/* Ligne 1 */}
              <tr>
                <td className="py-3 px-4 border">Ordinateur Mac</td>
                <td className="py-3 px-4 border">3</td>
                <td className="py-3 px-4 border">Bureau SALL</td>
                <td className="py-3 px-4 border">MI</td>
                <td className="py-3 px-4 border">Achat</td>
                <td className="py-3 px-4 border">Bon</td>
              </tr>
              {/* Ligne 2 */}
              <tr>
                <td className="py-3 px-4 border">Imprimante</td>
                <td className="py-3 px-4 border">5</td>
                <td className="py-3 px-4 border">Bureau 150</td>
                <td className="py-3 px-4 border">MI</td>
                <td className="py-3 px-4 border">DOn</td>
                <td className="py-3 px-4 border">Moyen</td>
              </tr>
              {/* Ligne 3 */}
              <tr>
                <td className="py-3 px-4 border">Chaises</td>
                <td className="py-3 px-4 border">20</td>
                <td className="py-3 px-4 border">Salle d'attente</td>
                <td className="py-3 px-4 border">MB</td>
                <td className="py-3 px-4 border">Ancien Mat Transféré</td>
                <td className="py-3 px-4 border">Mauvais</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Article;
