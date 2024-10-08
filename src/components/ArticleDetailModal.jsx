import React from 'react';

const ArticleDetailModal = ({ article, onClose }) => {
  console.log('Article dans le modal:', article);

  if (!article) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform scale-100">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Détails de l'Article</h2>
        <p className="mb-2">
          <strong className="text-gray-700">Désignation:</strong> {article.designation || 'Non spécifié'}
        </p>
        <p className="mb-2">
          <strong className="text-gray-700">Famille:</strong> {article.famille || article.famille_name || 'Non spécifié'}
        </p>
        <p className="mb-2">
          <strong className="text-gray-700">Origine:</strong> {article.origine || article.origine_name || 'Non spécifié'}
        </p>
        <p className="mb-2">
          <strong className="text-gray-700">Emplacement:</strong> {article.emplacement_name || 'Pas défini'}
        </p>
        <p className="mb-2">
          <strong className="text-gray-700">Date d'Ajout:</strong> {article.date_ajout || 'Non spécifiée'}
        </p>
        <p className="mb-4">
          <strong className="text-gray-700">Code Article:</strong> {article.code_article || 'Non généré'}
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default ArticleDetailModal;
