import React from 'react';

const ArticleModal = ({
  isOpen,
  onClose,
  onSubmit,
  designation,
  setDesignation,
  quantity,
  setQuantity,
  origin,
  setOrigin,
  family,
  setFamily,
  date,
  setDate
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-xl font-bold mb-4">Ajouter des Articles</h2>
        <form onSubmit={onSubmit}>
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
              <option value="MT">MT</option>
              <option value="AMT">AMT</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Date d'ajout</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 rounded-md w-full p-2"
              required
            />
          </div>
          <div className="flex justify-between mb-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded-md"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Confirmer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleModal;