import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('https://fbackup-cnc.onrender.com/api/users/login/', {
        email: email,
        password: password,
      });

      if (response.status === 200) {

        const { access, refresh } = response.data;
        localStorage.setItem('authToken', access);
        localStorage.setItem('refreshToken', refresh);

        toast.success(response.data.message || 'Connexion réussie');
        
        navigate('/home');
      } else {
        toast.error('Erreur de connexion');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      toast.error('Email ou mot de passe incorrect');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-300 to-white-500">
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Page de Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-b w-full focus:outline-none focus:border-blue-600 border-gray-300 rounded-md p-2"
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b focus:outline-none focus:border-blue-600 border-gray-300 rounded-md p-2"
              required
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 transition duration-200 ${isLoading ? 'opacity-50' : ''}`}
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
