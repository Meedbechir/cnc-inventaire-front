import React from 'react';
import { FaCheckCircle, FaPencilAlt, FaEye } from 'react-icons/fa';
import ArticleDetailModal from './ArticleDetailModal'; 

const ArticleTable = ({
  articles,
  handleLocationChange,
  handleValidate,
  handleEdit,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const [selectedArticle, setSelectedArticle] = React.useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = React.useState(false);

  const openDetailModal = (article) => {
    setSelectedArticle(article);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setSelectedArticle(null);
    setIsDetailModalOpen(false);
  };

  return (
    <>
      {articles.length > 0 && (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-left">
              <th className="py-3 px-4 border">Désignation</th>
              <th className="py-3 px-4 border">Emplacement</th>
              <th className="py-3 px-4 border">État</th>
              <th className="py-3 px-4 border">Code Article</th>
              <th className="py-3 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr key={index}>
                <td className="py-3 px-4 border w-1/4">{article.designation}</td>
                <td className="py-3 px-4 border w-1/4">
                  <input
                    type="text"
                    value={article.location}
                    onChange={(e) => handleLocationChange(index, e.target.value)}
                    className="border border-gray-300 rounded-md w-full p-1"
                    disabled={!article.isEditing}
                  />
                </td>
                <td className="py-3 px-4 border">Moyen</td>
                <td className="py-3 px-4 border">{article.code_article || 'Non généré'}</td>
                <td className="py-3 px-4 border">
                  <div className="flex space-x-4">
                    <FaEye
                      className="text-blue-500 cursor-pointer"
                      onClick={() => openDetailModal(article)}
                    />
                    <FaPencilAlt
                      className="text-yellow-500 cursor-pointer"
                      onClick={() => handleEdit(index)}
                    />
                    <FaCheckCircle
                      className={`text-green-500 cursor-pointer ${!article.location ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => handleValidate(article, index)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isDetailModalOpen && (
        <ArticleDetailModal
          article={selectedArticle}
          onClose={closeDetailModal}
        />
      )}

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 px-4 py-2 rounded-md"
        >
          Page précédente
        </button>
        <span>Page {currentPage} sur {totalPages}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-blue-500 px-4 py-2 rounded-md"
        >
          Page suivante
        </button>
      </div>
    </>
  );
};

export default ArticleTable;
