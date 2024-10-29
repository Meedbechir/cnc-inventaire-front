import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify"; 
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Designation = () => {
  const [step, setStep] = useState(1);
  const [origin, setOrigin] = useState("");
  const [otherOrigin, setOtherOrigin] = useState(""); 
  const [designations, setDesignations] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [selectedDesignationId, setSelectedDesignationId] = useState("");
  const [confirmationData, setConfirmationData] = useState(null); 
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDesignations();
  }, []);

  const fetchDesignations = async () => {
    try {
      const response = await fetch("https://fbackup-cnc.onrender.com/api/designations/");
      const data = await response.json();
      setDesignations(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des désignations:", error);
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.post("https://fbackup-cnc.onrender.com/api/articles/", {
        designation_id: selectedDesignationId,
        quantite: parseInt(quantity),
        origine: origin === "Autre" ? otherOrigin : origin, 
      });

      setArticles((prevArticles) => [...prevArticles, ...response.data.articles]);

      toast.success("Article ajouté avec succès !");
      setStep(1);
      setOrigin("");
      setSelectedDesignationId("");
      setQuantity("");
      setConfirmationData(null);
      navigate("/articles");
    } catch (error) {
      toast.error(`Erreur lors de l'ajout de l'article: ${error.message}`);
    }
  };
  
  const handleNextStep = () => {
    if (step === 1) {
      if (!origin) {
        toast.error("Veuillez sélectionner une origine.");
        return;
      }
      if (origin === "Autre" && !otherOrigin) {
        toast.error("Veuillez spécifier l'origine.");
        return;
      }
      setConfirmationData({
        designation: null,
        origin: origin === "Autre" ? otherOrigin : origin,
        quantity: null,
      });
    } else if (step === 2) {
      if (!selectedDesignationId) {
        toast.error("Veuillez sélectionner une désignation.");
        return;
      }
      if (!quantity) {
        toast.error("Veuillez entrer une quantité.");
        return;
      }
      setConfirmationData({
        designation: designations.find((des) => des.id === parseInt(selectedDesignationId)),
        origin: origin === "Autre" ? otherOrigin : origin,
        quantity,
      });
    }
    
    setStep(step + 1);
  };
  

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-8 mt-12 bg-white shadow-lg rounded-lg">
        <ToastContainer />

        <div className="flex items-center justify-between mb-4">
          {step > 1 && (
            <button className="text-gray-600" onClick={() => setStep(step - 1)}>
              <FaArrowLeft size={24} />
            </button>
          )}
          <h2 className="text-2xl font-bold text-center">Étape {step} sur 3</h2>
          <div className="w-6" />
        </div>

        {step === 1 && (
          <div className="p-6 border rounded-lg shadow-lg bg-white">
            <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              Choisir l'Origine
            </h3>
            <div className="flex justify-around mb-6">
              <label className="flex items-center text-gray-700 p-3 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition">
                <input
                  type="radio"
                  value="Achat"
                  checked={origin === "Achat"}
                  onChange={(e) => {
                    setOrigin(e.target.value);
                    setOtherOrigin(""); 
                  }}
                  required
                  className="mr-2"
                />
                <span className="font-medium">Achat</span>
              </label>
              <label className="flex items-center text-gray-700 p-3 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition">
                <input
                  type="radio"
                  value="Don"
                  checked={origin === "Don"}
                  onChange={(e) => {
                    setOrigin(e.target.value);
                    setOtherOrigin(""); 
                  }}
                  required
                  className="mr-2"
                />
                <span className="font-medium">Don</span>
              </label>
              <label className="flex items-center text-gray-700 p-3 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition">
                <input
                  type="radio"
                  value="Autre"
                  checked={origin === "Autre"}
                  onChange={(e) => {
                    setOrigin(e.target.value);
                    setOtherOrigin(""); 
                  }}
                  required
                  className="mr-2"
                />
                <span className="font-medium">Autre</span>
              </label>
            </div>
            {origin === "Autre" && ( 
              <input
                type="text"
                value={otherOrigin}
                onChange={(e) => setOtherOrigin(e.target.value)}
                placeholder="Spécifiez l'origine"
                className="border border-gray-300 rounded-md p-3 w-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                required
              />
            )}
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-md w-full transition duration-200 hover:bg-blue-700 shadow-md"
              onClick={handleNextStep}
            >
              Suivant
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="p-4 border rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">
              Sélectionner une Désignation
            </h3>
            <select
              value={selectedDesignationId}
              onChange={(e) => setSelectedDesignationId(e.target.value)}
              className="border border-gray-300 rounded-md p-3 w-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Sélectionnez une désignation</option>
              {designations.map((des) => (
                <option key={des.id} value={des.id}>
                  {des.nom}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantité"
              className="border border-gray-300 rounded-md p-3 w-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
              required
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md w-full mt-4"
              onClick={handleNextStep}
            >
              Suivant
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="border-t-2 border-gray-300 py-4 mb-6">
            <h3 className="text-2xl font-semibold mb-4">Confirmation</h3>
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border border-gray-200 p-2">Désignation</th>
                  <th className="border border-gray-200 p-2">Quantité</th>
                  <th className="border border-gray-200 p-2">Marque</th>
                  <th className="border border-gray-200 p-2">Modèle</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: parseInt(quantity) }).map((_, index) => (
                  <tr key={index}>
                    <td className="border border-gray-200 p-2">
                      {designations.find(
                        (des) => des.id === parseInt(selectedDesignationId)
                      )?.nom || 'Non spécifiée'}
                    </td>
                    <td className="border border-gray-200 p-2">1</td>
                    <td className="border border-gray-200 p-2">
                      {designations.find(
                        (des) => des.id === parseInt(selectedDesignationId)
                      )?.marque || 'Non spécifié'}
                    </td>
                    <td className="border border-gray-200 p-2">
                      {designations.find(
                        (des) => des.id === parseInt(selectedDesignationId)
                      )?.modele || 'Non spécifié'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md mt-4" onClick={handleConfirm}>
              Confirmer
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Designation;
