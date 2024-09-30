import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const Article = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [designation, setDesignation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [origin, setOrigin] = useState('');
  const [family, setFamily] = useState('MI');
  const [articles, setArticles] = useState([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/articles/')
      .then((response) => response.json())
      .then((data) => {
        setArticles(data); 
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des articles:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newArticles = Array.from({ length: quantity }, () => ({
      designation,
      family,
      origin,
      status: 'Bon',
      location: '',
    }));

    fetch('http://127.0.0.1:8000/api/articles/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        designation,
        famille: family,
        origine: origin,
        quantite: quantity,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setArticles((prevArticles) => [...prevArticles, ...data.articles]);
        setIsModalOpen(false);
        setDesignation('');
        setQuantity('');
        setOrigin('');
        setFamily('MI');
      })
      .catch((error) => {
        console.error('Erreur lors de la création des articles:', error);
      });
  };

  const handleLocationChange = (index, value) => {
    const updatedArticles = [...articles];
    updatedArticles[index].location = value;
    setArticles(updatedArticles);
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle); 

  const totalPages = Math.ceil(articles.length / articlesPerPage); 

  return (
    <>
      <Navbar />
      <div className="p-12">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Ajouter un nouvel article
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-3/4 md:w-1/2 lg:w-1/3">
              <h2 className="text-xl font-bold mb-4">Ajouter des Articles</h2>
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
                <div className="mb-4">
                  <label className="block mb-2">Origine</label>
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="border border-gray-300 rounded-md w-full p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Famille</label>
                  <select
                    value={family}
                    onChange={(e) => setFamily(e.target.value)}
                    className="border border-gray-300 rounded-md w-full p-2"
                  >
                    <option value="MI">MI</option>
                    <option value="MB">MB</option>
                    <option value="MM">MM</option>
                    <option value="EM">EM</option>
                  </select>
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
                    Confirmer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tableau des articles générés */}
        <div className="mt-8">
          {currentArticles.length > 0 && (
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-600 text-left">
                  <th className="py-3 px-4 border">Désignation</th>
                  <th className="py-3 px-4 border">Famille</th>
                  <th className="py-3 px-4 border">Origine</th>
                  <th className="py-3 px-4 border">Emplacement</th>
                  <th className="py-3 px-4 border">État</th>
                  <th className="py-3 px-4 border">Code Article</th>
                </tr>
              </thead>
              <tbody>
                {currentArticles.map((article, index) => (
                  <tr key={index}>
                    <td className="py-3 px-4 border w-1/4">{article.designation}</td>
                    <td className="py-3 px-4 border">{article.famille}</td>
                    <td className="py-3 px-4 border">{article.origine}</td>
                    <td className="py-3 px-4 border w-1/4">
                      <input
                        type="text"
                        value={article.location}
                        onChange={(e) => handleLocationChange(index, e.target.value)}
                        className="border border-gray-300 rounded-md w-full p-1"
                      />
                    </td>
                    <td className="py-3 px-4 border">{article.etat}</td>
                    <td className="py-3 px-4 border">{article.code_article}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="flex justify-between mt-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-300 px-4 py-2 rounded-md"
            >
              Page précédente
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-blue-500 px-4 py-2 rounded-md"
            >
              Page suivante
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Article;
