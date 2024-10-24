import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ArticleDetailPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://fbackup-cnc.onrender.com/api/articles/${id}/`);
        if (!response.ok) throw new Error('Erreur lors de la récupération de l\'article');
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!article) {
    return <div className="text-center text-xl text-gray-500">Aucun article trouvé.</div>;
  }

  return (
    <div className="article-detail-page p-12 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-4xl font-semibold mb-6 text-gray-800 text-center">Détails de l'Article</h2>
        <div className="space-y-4">
          {[  
            { label: "Désignation", value: article.designation || 'Non spécifiée' },
            { label: "Famille", value: article.famille_nom || 'Non spécifié' },
            { label: "Origine", value: article.details_entree[0]?.origine_nom || 'Non spécifié' },
            { label: "Emplacement", value: article.details_entree[0]?.emplacement_nom || 'Pas défini' },
            { label: "Code Article", value: article.code_article || 'Non généré' },
            { label: "Marque", value: article.details_entree[0]?.marque || 'Non spécifié' },
            { label: "Modèle", value: article.details_entree[0]?.modele || 'Non spécifié' },
            { label: "Date Ajout", value: article.details_entree[0]?.date_ajout || 'Non spécifié' },
            { label: "État", value: article.details_entree[0]?.status?.status_article || 'Non spécifié' },
          ].map((item, index) => (
            <div className="flex justify-between border-b border-gray-200 py-2" key={index}>
              <strong className="text-gray-700">{item.label}:</strong>
              <span className="text-gray-600">{item.value}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => window.history.back()}
          className="mt-6 w-full bg-blue-600 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 shadow-md"
        >
          Retour
        </button>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
