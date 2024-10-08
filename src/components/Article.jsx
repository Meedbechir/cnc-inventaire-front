import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import ArticleModal from './ArticleModal';
import ArticleTable from './ArticleTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Article = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [designation, setDesignation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [origin, setOrigin] = useState('');
  const [family, setFamily] = useState('MI');
  const [articles, setArticles] = useState([]);
  const [locations, setLocations] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    fetch('https://cnc-pdb.onrender.com/api/articles/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des articles');
        }
        return response.json();
      })
      .then((data) => {
        const mappedData = data.map(article => ({
          ...article,
          famille: article.famille_name, 
          origine: article.origine_name,
          isEditing: false,
        }));
        setArticles(mappedData);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des articles:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://cnc-pdb.onrender.com/api/articles/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        designation,
        famille: family,
        origine: origin,
        quantite: quantity,
        date
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(errData => {
            throw new Error(errData.message || 'Erreur lors de l\'ajout de l\'article');
          });
        }
        return response.json();
      })
      .then((data) => {
        return fetch('https://cnc-pdb.onrender.com/api/articles/');
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const mappedData = data.map(article => ({
          ...article,
          famille: article.famille_name, 
          origine: article.origine_name,
        }));
        setArticles(mappedData); 
        setIsModalOpen(false);
        setDesignation('');
        setQuantity('');
        setOrigin('');
        setFamily('MI');
        setDate('');
        toast.success('Article ajouté avec succès !');
      })
      .catch((error) => {
        console.error('Erreur lors de la création des articles:', error);
        toast.error(`Erreur lors de l'ajout de l'article: ${error.message}`); 
      });
  };

  const handleLocationChange = (index, value) => {
    const updatedArticles = [...articles];
    updatedArticles[index].location = value;
    setArticles(updatedArticles);
    setLocations(prevLocations => ({
      ...prevLocations,
      [updatedArticles[index].id]: value,
    }));
  };

  const handleEdit = (index) => {
    const updatedArticles = [...articles];
    updatedArticles[index].isEditing = !updatedArticles[index].isEditing; 
    setArticles(updatedArticles);
  };

  const handleValidate = (article, index) => {
    if (!article.location) {
      toast.warning("L'emplacement est requis pour valider l'article.");
      return;
    }

    fetch(`https://cnc-pdb.onrender.com/articles/${article.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emplacement: article.location,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la validation de l\'article');
        }
        return response.json();
      })
      .then((updatedArticle) => {
        const updatedArticles = [...articles];
        updatedArticles[index] = {
          ...updatedArticle.article,
          isEditing: false,
          location: locations[updatedArticle.article.id],
        };
        setArticles(updatedArticles);
        toast.success('Article validé avec succès !');
      })
      .catch((error) => {
        console.error('Erreur lors de la validation de l\'article:', error);
      });
  };

  // Pagination and search
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

  const filteredArticles = articles.filter(article =>
    article.designation && article.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="p-12">
        <div className="flex items-center mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Ajouter un nouvel article
          </button>

          <ArticleModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmit}
            designation={designation}
            setDesignation={setDesignation}
            quantity={quantity}
            setQuantity={setQuantity}
            origin={origin}
            setOrigin={setOrigin}
            family={family}
            setFamily={setFamily}
          />

          <input
            type="text"
            placeholder="Rechercher un article"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-400 rounded-md w-full max-w-xs ml-4 p-2 ms-auto"
          />
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center text-gray-500">
            Aucun article.
          </div>
        ) : (
          <>
            <ArticleTable
              articles={currentArticles}
              handleLocationChange={handleLocationChange}
              handleValidate={handleValidate}
              handleEdit={handleEdit}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Article;
