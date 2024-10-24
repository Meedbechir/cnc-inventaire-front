import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './Navbar';

const ArticleCreation = () => {
  const [newDesignation, setNewDesignation] = useState('');
  const [family, setFamily] = useState(null);
  const [marque, setMarque] = useState('');
  const [modele, setModele] = useState('');
  const [families, setFamilies] = useState([]);
  const [familiesMap, setFamiliesMap] = useState({}); 
  const [designations, setDesignations] = useState([]);

  useEffect(() => {
    const fetchFamilies = async () => {
      try {
        const response = await fetch('https://fbackup-cnc.onrender.com/api/familles/');
        const data = await response.json();
        setFamilies(data);
        const familyMap = data.reduce((acc, fam) => {
          acc[fam.id] = fam.nom;
          return acc;
        }, {});
        setFamiliesMap(familyMap);
      } catch (error) {
        console.error('Erreur lors de la récupération des familles:', error);
      }
    };

    const fetchDesignations = async () => {
      try {
        const response = await axios.get('https://fbackup-cnc.onrender.com/api/designations/');
        setDesignations(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des désignations:', error);
      }
    };

    fetchFamilies();
    fetchDesignations();
  }, []);

  const handleDesignationSubmit = async (e) => {
    e.preventDefault();
    const designationData = {
      nom: newDesignation,
      famille: family,
      marque: marque,
      modele: modele,
    };

    try {
      const response = await axios.post('https://fbackup-cnc.onrender.com/api/designations/', designationData);
      toast.success('Désignation ajoutée avec succès!');
      setDesignations([...designations, response.data]);
      setNewDesignation('');
      setFamily(null);
      setMarque('');
      setModele('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la désignation:', error);
      toast.error(`Erreur lors de l'ajout de la désignation: ${error.message}`);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />

      <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-12">
        <h3 className="text-3xl font-semibold text-center text-gray-800 mb-6">Ajouter une Désignation</h3>
        <form onSubmit={handleDesignationSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              value={newDesignation}
              onChange={(e) => setNewDesignation(e.target.value)}
              placeholder="Nouvel Article"
              className="border border-gray-300 rounded-md p-4 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              value={family || ''}
              onChange={(e) => setFamily(e.target.value)}
              className="border border-gray-300 rounded-md p-4 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Sélectionner une Famille</option>
              {families.map(fam => (
                <option key={fam.id} value={fam.id}>{fam.nom}</option>
              ))}
            </select>
          </div>
          <div className="flex space-x-4">
            <input
              type="text"
              value={marque}
              onChange={(e) => setMarque(e.target.value)}
              placeholder="Marque"
              className="border border-gray-300 rounded-md p-4 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              value={modele}
              onChange={(e) => setModele(e.target.value)}
              placeholder="Modèle"
              className="border border-gray-300 rounded-md p-4 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md w-full mt-4 hover:bg-green-700 transition duration-200" type="submit">
            Créer
          </button>
        </form>
      </div>

      <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-12">
        <h3 className="text-3xl font-semibold text-center text-gray-800 mb-6">Désignations Créées</h3>
        <table className="min-w-full bg-gray-100">
          <thead>
            <tr className="bg-gray-300">
              <th className="px-4 py-2">Article</th>
              <th className="px-4 py-2">Famille</th>
              <th className="px-4 py-2">Marque</th>
              <th className="px-4 py-2">Modèle</th>
            </tr>
          </thead>
          <tbody>
            {designations.map((designation) => (
              <tr key={designation.id} className="border-b hover:bg-gray-200">
                <td className="px-4 py-2">{designation.nom}</td>
                <td className="px-4 py-2">{familiesMap[designation.famille]}</td> 
                <td className="px-4 py-2">{designation.marque}</td>
                <td className="px-4 py-2">{designation.modele}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ArticleCreation;
