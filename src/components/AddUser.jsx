import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://fbackup-cnc.onrender.com/api/users/userslist/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('https://fbackup-cnc.onrender.com/api/users/register/', {
        username: name,
        email: email,
        password: password,
        password2: confirmPassword,
      });

      console.log('Response status:', response.status);

      if (response.status === 201) {
        toast.success("Inscription réussie!");
        setIsModalOpen(false);
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        fetchUsers();
      } else {
        const errorData = response.data;
        console.error('Backend error:', errorData);
        throw new Error(errorData.detail || 'Erreur inconnue');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Erreur lors de l'inscription: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                  <label className="block mb-2">Nom d'utilisateur</label>
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
                    disabled={isLoading}
                    className={`bg-blue-500 text-white px-4 py-2 rounded-md mt-2 ${
                      isLoading ? 'opacity-50' : ''
                    }`}
                  >
                    {isLoading ? 'Enregistrant...' : 'Ajouter'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="mt-8">
          {!users.length ? (
            <p className="text-gray-600">Pas d'utilisateurs pour l'instant, veuillez ajouter des utilisateurs.</p>
          ) : (
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-600 text-left">
                  <th className="py-3 px-4 border">Nom</th>
                  <th className="py-3 px-4 border">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td className="py-3 px-4 border">{user.username}</td>
                    <td className="py-3 px-4 border">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default AddUser;
