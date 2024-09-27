import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const naviagte = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, confirmPassword });
    naviagte('/home')
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-800">
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
              className=" border-b w-full focus:outline-none focus:border-blue-600 border-gray-300 rounded-md p-2"
              required
              autoComplete='off'
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
              autoComplete='off'
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border-b focus:outline-none focus:border-blue-600 border-gray-300 rounded-md p-2"
              required
              autoComplete='off'
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 transition duration-200"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
