import React from 'react';

const ArticleDetailModal = ({ article, onClose }) => {
  if (!article) return null;

  console.log('Article Object:', article);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800 text-center">Détails de l'Article</h2>
        <div className="space-y-3">
          <p>
            <strong className="text-gray-700">Désignation:</strong> <span className="text-gray-600">{article.designation || 'Non spécifié'}</span>
          </p>
          <p>
            <strong className="text-gray-700">Famille:</strong> <span className="text-gray-600">{article.famille_nom || 'Non spécifié'}</span>
          </p>
          <p>
            <strong className="text-gray-700">Origine:</strong> <span className="text-gray-600">{article.details_entree[0]?.origine_nom || 'Non spécifié'}</span>
          </p>
          <p>
            <strong className="text-gray-700">Emplacement:</strong> <span className="text-gray-600">{article.details_entree[0]?.emplacement_nom || 'Pas défini'}</span>
          </p>
          <p>
            <strong className="text-gray-700">Code Article:</strong> <span className="text-gray-600">{article.code_article || 'Non généré'}</span>
          </p>
          <p>
            <strong className="text-gray-700">Marque:</strong> <span className="text-gray-600">{article.details_entree[0]?.marque || 'Non spécifié'}</span>
          </p>
          <p>
            <strong className="text-gray-700">Modèle:</strong> <span className="text-gray-600">{article.details_entree[0]?.modele || 'Non spécifié'}</span>
          </p>
          <p>
            <strong className="text-gray-700">Date Ajout:</strong> <span className="text-gray-600">{article.details_entree[0]?.date_ajout || 'Non spécifié'}</span>
          </p>
          <p>
            <strong className="text-gray-700">État:</strong> <span className="text-gray-600">{article.details_entree[0]?.status?.status_article || 'Non spécifié'}</span>
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-500 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default ArticleDetailModal;
