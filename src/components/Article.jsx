import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import ArticleTable from './ArticleTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/articles/');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des articles');
      }
      const data = await response.json();

      const mappedData = data.map(article => ({
        ...article,
        famille: article.famille_nom,
        origine: article.origine_nom || "non spécifiée",
        designation: article.designation_nom || "non spécifiée",
        isEditing: false,
        etat: article.details_entree[0]?.status?.status_article || "non spécifié",
        code_article: article.details_entree[0]?.code_article || "non généré",
      }));

      setArticles(mappedData);
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error);
      toast.error(`Erreur lors de la récupération des articles: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (articleId) => {
    const updatedArticles = articles.map(article =>
      article.id === articleId ? { ...article, isEditing: !article.isEditing } : article
    );
    setArticles(updatedArticles);
  };

  const handleLocationChange = (articleId, newLocation) => {
    const updatedArticles = articles.map(article =>
      article.id === articleId ? { ...article, location: newLocation } : article
    );
    setArticles(updatedArticles);
  };

  const handleValidate = async (articleId) => {
    const article = articles.find(a => a.id === articleId);
    
    if (!article.location) {
      toast.warning("L'emplacement est requis pour valider l'article.");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/articles/${articleId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emplacement: article.location,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la validation de l\'article');
      }

      const updatedArticle = await response.json();

      const updatedArticles = articles.map(a =>
        a.id === articleId ? { 
          ...a, 
          emplacement_nom: updatedArticle.emplacement_nom, 
          code_article: updatedArticle.code_article,
          isEditing: false 
        } : a
      );

      setArticles(updatedArticles);
      toast.success('Article validé avec succès !');
    } catch (error) {
      console.error('Erreur lors de la validation de l\'article:', error);
    }
  };

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
          <input
            type="text"
            placeholder="Rechercher un article"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-400 rounded-md w-full max-w-xs ml-4 p-2 ms-auto"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <ClipLoader loading={loading} size={50} />
          </div>
        ) : currentArticles.length === 0 ? (
          <div className="text-center text-3xl text-gray-500">
            Aucun article.
          </div>
        ) : (
          <ArticleTable
            articles={currentArticles}
            handleLocationChange={handleLocationChange}
            handleEdit={handleEdit}
            handleValidate={handleValidate}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  );
};

export default Article;
