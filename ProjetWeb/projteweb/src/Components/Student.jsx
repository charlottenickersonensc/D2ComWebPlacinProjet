import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Composant principal Student
function Student() {
    const location = useLocation(); // Permet d'accéder à l'objet de localisation (transfert de données entre routes)
    const data = location.state?.data; // Accès sécurisé aux données transmises via la navigation (state.data)
    const navigate = useNavigate(); // Permet de naviguer entre les routes

    // Destructuration des données utilisateur et des notes
    const { utilisateur, notes } = data;

    // Fonction pour se déconnecter (redirige vers la page d'accueil)
    function deconnecter() {
        navigate('/');
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

                {/* En-tête avec message de bienvenue */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Bonjour, <span className="text-yellow-200">{utilisateur.prenom}</span> !
                    </h1>
                    <p className="text-indigo-100">Voici votre bulletin de notes</p>
                </div>

                {/* Contenu principal */}
                <div className="p-6 space-y-8">

                    {/* Section des notes */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                            {/* Icône d'illustration */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Vos Notes
                        </h2>

                        {/* Tableau des notes */}
                        <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matière</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commentaire</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {notes.map((note, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                                {note.nom}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {/* Badge coloré selon la note */}
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${note.note >= 12 ? 'bg-green-100 text-green-800' : 
                                                      note.note >= 10 ? 'bg-yellow-100 text-yellow-800' : 
                                                      'bg-red-100 text-red-800'}`}>
                                                    {note.note}/20
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">
                                                {note.commentaire}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Bouton de déconnexion */}
                    <div className="flex justify-end">
                        <button
                            onClick={deconnecter}
                            className="flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow hover:shadow-lg transition-all hover:scale-105 active:scale-95"
                        >
                            {/* Icône de déconnexion */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Se déconnecter
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Student;
