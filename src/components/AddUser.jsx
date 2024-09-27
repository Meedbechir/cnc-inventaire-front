import React, { useState } from 'react';
import Navbar from './Navbar';

const AddUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    console.log({ name, email, password });
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="p-12">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Ajouter un utilisateur
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-3/4 md:w-1/2 lg:w-1/3">
              <h2 className="text-xl font-bold mb-4">Ajouter un Utilisateur</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-2">Nom</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 rounded-md w-full p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded-md w-full p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Mot de passe</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded-md w-full p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Confirmer le mot de passe</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border border-gray-300 rounded-md w-full p-2"
                    required
                  />
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

        {/* Tableau des utilisateurs */}
        <div className="mt-8">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-left">
                <th className="py-3 px-4 border">Nom</th>
                <th className="py-3 px-4 border">Email</th>
                <th className="py-3 px-4 border">Rôle</th>
              </tr>
            </thead>
            <tbody>
              {/* Ligne 1 */}
              <tr>
                <td className="py-3 px-4 border">SALL ADAMA</td>
                <td className="py-3 px-4 border">sall@test.com</td>
                <td className="py-3 px-4 border">Admin</td>
              </tr>
              {/* Ligne 2 */}
              <tr>
                <td className="py-3 px-4 border">SIYAM</td>
                <td className="py-3 px-4 border">siyam@test.com</td>
                <td className="py-3 px-4 border">Utilisateur</td>
              </tr>
              {/* Ligne 3 */}
              <tr>
                <td className="py-3 px-4 border">KOLY CAMARA</td>
                <td className="py-3 px-4 border">koly@test.com</td>
                <td className="py-3 px-4 border">Visiteur</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AddUser;
