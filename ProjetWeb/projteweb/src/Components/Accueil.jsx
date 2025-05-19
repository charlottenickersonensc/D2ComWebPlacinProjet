import React from "react"; 
import { Link } from "react-router-dom"; // Importation de Link pour la navigation entre les pages sans rechargement

export default function Accueil() {
  return (
    // Conteneur principal centré avec un fond en dégradé
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">

      {/* Carte principale avec effet de flou et ombre */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl max-w-2xl w-full text-center border border-white/20">
        
        {/* Logo ou icône dans un cercle avec dégradé */}
        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>

        {/* Titre principal avec texte en dégradé */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Bienvenue sur <span className="font-extrabold">EduNotes</span>
        </h1>
        
        {/* Description en dessous du titre */}
        <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
          La plateforme intuitive pour <span className="font-medium text-blue-600">gérer</span> et <span className="font-medium text-indigo-600">consulter</span> vos notes académiques en toute simplicité.
        </p>

        {/* Boutons d'action : Connexion et Inscription */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          {/* Lien vers la page de connexion */}
          <Link
            to="/Connecter"
            className="relative overflow-hidden group w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span className="relative z-10">Se connecter</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>
          
          {/* Lien vers la page de création de compte */}
          <Link
            to="/creerCompte"
            className="relative overflow-hidden group w-full sm:w-auto border-2 border-blue-500 text-blue-600 hover:text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg"
          >
            <span className="relative z-10">S'inscrire</span>
            <span className="absolute inset-0 bg-blue-500 w-0 group-hover:w-full transition-all duration-300 -z-1"></span>
          </Link>
        </div>

        {/* Liste des avantages (intuitif, sécurisé, rapide) */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          
          {/* Élément : Interface intuitive */}
          <div className="flex items-center bg-blue-50/50 px-4 py-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-gray-600">Interface intuitive</span>
          </div>

          {/* Élément : Sécurité */}
          <div className="flex items-center bg-indigo-50/50 px-4 py-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-sm text-gray-600">Sécurisé</span>
          </div>

          {/* Élément : Rapidité */}
          <div className="flex items-center bg-purple-50/50 px-4 py-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm text-gray-600">Rapide</span>
          </div>
        </div>
      </div>

      {/* Définition des animations personnalisées */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
