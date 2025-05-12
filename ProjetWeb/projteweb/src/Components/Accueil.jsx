import React from "react";
import { Link } from "react-router-dom"; 

export default function Accueil() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">Bienvenue sur EduNotes</h1>
        <p className="text-gray-600 mb-6">
            Accédez à votre espace étudiant ou enseignant pour consulter ou gérer vos notes en toute simplicité
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/Connecter"
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-xl transition duration-200"
          >
            Se connecter
          </Link>
          <Link
            to="/creerCompte"
            className="w-full sm:w-auto border border-blue-500 text-blue-500 hover:bg-blue-100 font-medium py-2 px-6 rounded-xl transition duration-200"
          >
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
}