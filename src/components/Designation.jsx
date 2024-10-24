import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Designation = () => {
  const naviagte = useNavigate(); 
  const [step, setStep] = useState(1);
  const [newDesignation, setNewDesignation] = useState('');
  const [designations, setDesignations] = useState([]);
  const [families, setFamilies] = useState([]);
  const [selectedDesignationId, setSelectedDesignationId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [origin, setOrigin] = useState('');
  const [family, setFamily] = useState('');
  const [marque, setMarque] = useState(''); 
  const [modele, setModele] = useState('');
  const [codeArticle, setCodeArticle] = useState([]);
  const [statusArticle, setStatusArticle] = useState([]);

  useEffect(() => {
    fetchDesignations();
    fetchFamilies();
  }, []);

  const fetchDesignations = async () => {
    try {
      const response = await fetch('https://fbackup-cnc.onrender.com/api/designations/');
      const data = await response.json();
      setDesignations(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des désignations:', error);
    }
  };

  const fetchFamilies = async () => {
    try {
      const response = await fetch('https://fbackup-cnc.onrender.com/api/familles/');
      const data = await response.json();
      const filteredData = data.filter(fam => typeof fam.nom === 'string' && isNaN(fam.nom));
      setFamilies(filteredData);
    } catch (error) {
      console.error('Erreur lors de la récupération des familles:', error);
    }
  };

  const handleDesignationSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://fbackup-cnc.onrender.com/api/designations/', { nom: newDesignation });
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
     
      const response = await axios.post('https://fbackup-cnc.onrender.com/api/articles/', {
        designation_id: selectedDesignationId,
        quantite: parseInt(quantity),
        origine: origin,
        famille: family,
        marque: marque,
        modele: modele,
      });

      const articles = response.data.articles; 
      const codes = [];
      const statuses = [];

      articles.forEach(article => {
        codes.push(article.details_entree[0]?.code_article || 'non généré');
        statuses.push(article.details_entree[0]?.status?.status_article || 'non spécifié');
      });

      setCodeArticle(codes);
      setStatusArticle(statuses);
      
      toast.success('Article ajouté avec succès !');
      setStep(6); 
    } catch (error) {
      toast.error(`Erreur lors de l'ajout de l'article: ${error.message}`);
    }
  };

  const handleDelete = () => {
    setSelectedDesignationId('');
    setQuantity('');
    setOrigin('');
    setFamily('');
    setMarque('');
    setModele('');
    setCodeArticle([]);
    setStatusArticle([]);
    setStep(1); 
  };

  const handleSave = () => {
    setNewDesignation('');
    setDesignations([]);
    setFamilies([]);
    setSelectedDesignationId('');
    setQuantity('');
    setOrigin('');
    setFamily('');
    setMarque('');
    setModele('');
    setCodeArticle([]);
    setStatusArticle([]);
    toast.success('Toutes les informations ont été enregistrées !'); 
    naviagte('/articles'); 
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
    } else if (step === 6) {
      setStep(5);
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
          <div className="p-6 border rounded-lg shadow-lg bg-white">
            <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">Choisir l'Origine</h3>
            <div className="flex justify-around mb-6">
              <label className="flex items-center text-gray-700 p-3 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition">
                <input
                  type="radio"
                  value="Achat"
                  checked={origin === 'Achat'}
                  onChange={(e) => setOrigin(e.target.value)}
                  required
                  className="mr-2"
                />
                <span className="font-medium">Achat</span>
              </label>
              <label className="flex items-center text-gray-700 p-3 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition">
                <input
                  type="radio"
                  value="Don"
                  checked={origin === 'Don'}
                  onChange={(e) => setOrigin(e.target.value)}
                  required
                  className="mr-2"
                />
                <span className="font-medium">Don</span>
              </label>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md w-full transition duration-200 hover:bg-blue-700 shadow-md" onClick={() => setStep(2)}>
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
                  <option key={fam.id} value={fam.id}>{fam.nom}</option>
                ))}
              </select>
              <input
                type="text"
                value={marque}
                onChange={(e) => setMarque(e.target.value)}
                placeholder="Marque"
                className="border border-gray-300 rounded-md p-3 w-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                value={modele}
                onChange={(e) => setModele(e.target.value)}
                placeholder="Modèle"
                className="border border-gray-300 rounded-md p-3 w-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button className="bg-green-600 text-white px-4 py-2 rounded-md w-full mt-4" onClick={handleConfirm}>
                Ajouter l'Article
              </button>
              <button type="button" className="bg-red-600 text-white px-4 py-2 rounded-md w-full mt-4" onClick={handleDelete}>
                Supprimer
              </button>
            </form>
          </div>
        )}

{step === 6 && (
  <div className="border-t-2 border-gray-300 py-4 mb-6">
    <h3 className="text-2xl font-semibold mb-4">Confirmation</h3>
    {codeArticle.length === 0 ? (
      <p>Aucun article créé.</p>
    ) : (
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-left">
            <th className="py-3 px-4 border">Désignation</th>
            <th className="py-3 px-4 border">Origine</th>
            <th className="py-3 px-4 border">Famille</th>
            <th className="py-3 px-4 border">Code Article</th>
            <th className="py-3 px-4 border">Statut</th>
          </tr>
        </thead>
        <tbody>
          {codeArticle.map((code, index) => {
            const foundDesignation = designations.find(des => des.id === parseInt(selectedDesignationId));
            const foundFamily = families.find(fam => fam.id === parseInt(family));

            const designationName = foundDesignation?.nom || 'Non spécifiée';
            const familyName = foundFamily?.nom || 'Non spécifiée';

            return (
              <tr key={index}>
                <td className="py-3 px-4 border">{designationName}</td>
                <td className="py-3 px-4 border">{origin}</td>
                <td className="py-3 px-4 border">{familyName}</td>
                <td className="py-3 px-4 border">{code}</td>
                <td className="py-3 px-4 border">{statusArticle[index]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )}
    <div className="mt-4">
      <button className="bg-green-600 text-white px-4 py-2 rounded-md" onClick={handleSave}>
        Enregistrer
      </button>
    </div>
  </div>
)}


      </div>
    </>
  );
};

export default Designation;
