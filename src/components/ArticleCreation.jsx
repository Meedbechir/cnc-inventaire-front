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
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const itemsPerPage = 10;


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

  const indexOfLastDesignation = currentPage * itemsPerPage;
  const indexOfFirstDesignation = indexOfLastDesignation - itemsPerPage;

  const filteredDesignations = designations.filter(designation => {
    return (
      designation.nom.toLowerCase().includes(filter.toLowerCase()) ||
      designation.marque.toLowerCase().includes(filter.toLowerCase()) ||
      designation.modele.toLowerCase().includes(filter.toLowerCase())
    );
  });

  const totalFiltered = filteredDesignations.length;
  const currentDesignations = filteredDesignations.slice(indexOfFirstDesignation, indexOfLastDesignation);
  const totalPages = Math.ceil(totalFiltered / itemsPerPage);

  return (
    <>
      <Navbar />
      <ToastContainer />

      <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-12">
        <h3 className="text-3xl font-semibold text-center text-gray-800 mb-6">Ajouter un Article</h3>
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
        <h3 className="text-3xl font-semibold text-center text-gray-800 mb-6">Articles Créés</h3>

        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filtrer par nom, marque ou modèle"
          className="border border-gray-300 rounded-md p-4 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

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
            {currentDesignations.length > 0 ? (
              currentDesignations.map((designation) => (
                <tr key={designation.id} className="border-b hover:bg-gray-200">
                  <td className="px-4 py-2">{designation.nom}</td>
                  <td className="px-4 py-2">{familiesMap[designation.famille]}</td> 
                  <td className="px-4 py-2">{designation.marque}</td>
                  <td className="px-4 py-2">{designation.modele}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center px-4 py-2">Aucun article trouvé.</td>
              </tr>
            )}
          </tbody>
        </table>


{totalFiltered > itemsPerPage && (
  <div className="flex justify-between mt-4">
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
    >
      Précédent
    </button>
    <span>{`Page ${currentPage} sur ${totalPages}`}</span>
    <button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
    >
      Suivant
    </button>
  </div>
)}

      </div>
    </>
  );
};

export default ArticleCreation;
