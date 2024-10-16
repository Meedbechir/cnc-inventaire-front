import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import { FaArrowLeft } from 'react-icons/fa';

const ArticleManager = () => {
  const [step, setStep] = useState(1);
  const [newDesignation, setNewDesignation] = useState('');
  const [designations, setDesignations] = useState([]);
  const [families, setFamilies] = useState([]);
  const [selectedDesignationId, setSelectedDesignationId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [origin, setOrigin] = useState('');
  const [family, setFamily] = useState('');

  useEffect(() => {
    fetchDesignations();
    fetchFamilies();
  }, []);

  const fetchDesignations = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/designations/');
      const data = await response.json();
      setDesignations(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des désignations:', error);
    }
  };

  const fetchFamilies = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/familles/');
      const data = await response.json();
      setFamilies(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des familles:', error);
    }
  };

  const handleDesignationSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/designations/', { nom: newDesignation });
      toast.success('Désignation ajoutée avec succès !');
      setNewDesignation('');
      fetchDesignations();
      setStep(4);
    } catch (error) {
      toast.error(`Erreur lors de l'ajout de la désignation: ${error.message}`);
    }
  };

  const handleArticleSubmit = (e) => {
    e.preventDefault();
    setStep(6);
  };

  const handleConfirm = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/articles/', {
        designation_id: selectedDesignationId,
        quantite: parseInt(quantity),
        origine: origin,
        famille: family,
      });
      toast.success('Article ajouté avec succès !');
      setStep(1);
      setNewDesignation('');
      setSelectedDesignationId('');
      setQuantity('');
      setOrigin('');
      setFamily('');
    } catch (error) {
      toast.error(`Erreur lors de l'ajout de l'article: ${error.message}`);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    } else if (step === 4) {
      setStep(3);
    } else if (step === 5) {
      setStep(4);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-8 mt-12 bg-white shadow-lg rounded-lg">
        <ToastContainer />
        
        <div className="flex items-center justify-between mb-4">
          {step > 1 && (
            <button className="text-gray-600" onClick={handleBack}>
              <FaArrowLeft size={24} />
            </button>
          )}
          <h2 className="text-2xl font-bold text-center">Étape {step} sur 6</h2>
          <div className="w-6" /> 
        </div>

        {step === 1 && (
          <div className="p-4 border rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Choisir l'Origine</h3>
            <div className="flex justify-around">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Achat"
                  checked={origin === 'Achat'}
                  onChange={(e) => setOrigin(e.target.value)}
                  required
                />
                Achat
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Don"
                  checked={origin === 'Don'}
                  onChange={(e) => setOrigin(e.target.value)}
                  required
                />
                Don
              </label>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md w-full mt-4" onClick={() => setStep(2)}>
              Suivant
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="p-4 border rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Choisir une option</h3>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md w-full mb-4" onClick={() => setStep(3)}>
              Créer un nouvel Article
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md w-full" onClick={() => setStep(4)}>
              Sélectionner un Article Existant
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="p-4 border rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Ajouter une Désignation</h3>
            <form onSubmit={handleDesignationSubmit}>
              <input
                type="text"
                value={newDesignation}
                onChange={(e) => setNewDesignation(e.target.value)}
                placeholder="Nouvel Article"
                className="border border-gray-300 rounded-md p-3 w-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button className="bg-green-600 text-white px-4 py-2 rounded-md w-full mt-4 transition-transform transform hover:scale-105" type="submit">
                Créer
              </button>
            </form>
          </div>
        )}

        {step === 4 && (
          <div className="p-4 border rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Sélectionner une Désignation</h3>
            <select
              value={selectedDesignationId}
              onChange={(e) => setSelectedDesignationId(e.target.value)}
              className="border border-gray-300 rounded-md p-3 w-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Sélectionnez une désignation</option>
              {designations.map((des) => (
                <option key={des.id} value={des.id}>{des.nom}</option>
              ))}
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md w-full mt-4" onClick={() => setStep(5)}>
              Suivant
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="border-t-2 border-gray-300 py-4 mb-6">
            <h3 className="text-2xl font-semibold mb-4">Ajouter un Article</h3>
            <form onSubmit={handleArticleSubmit} className="grid grid-cols-1 gap-6">
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantité"
                className="border border-gray-300 rounded-md p-3 w-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <select
                value={family}
                onChange={(e) => setFamily(e.target.value)}
                className="border border-gray-300 rounded-md p-3 w-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Sélectionnez une famille</option>
                {families.map((fam) => (
                  <option key={fam.id} value={fam.nom}>{fam.nom}</option>
                ))}
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md w-full transition-transform transform hover:scale-105" type="submit">
                Ajouter Article
              </button>
            </form>
          </div>
        )}

        {step === 6 && (
          <div className="p-4 border rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Confirmation</h3>
            <p>Désignation: {selectedDesignationId}</p>
            <p>Quantité: {quantity}</p>
            <p>Origine: {origin}</p>
            <p>Famille: {family}</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md mt-4" onClick={handleConfirm}>
              Confirmer
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ArticleManager;
