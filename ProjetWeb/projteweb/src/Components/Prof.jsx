import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Hooks pour navigation et récupération des données transmises

function Prof() {
    const location = useLocation(); // Pour récupérer les données passées via la navigation
    const data = location.state?.data; // Extraction des données transmises (ex : depuis une autre page)
    const navigate = useNavigate(); // Pour rediriger l'utilisateur

    // États pour gérer l’interface
    const [message, setMessage] = useState(''); // Message de retour (succès/erreur)
    const [selectedClasse, setSelectedClasse] = useState(''); // Classe sélectionnée
    const [selectedMatiere, setSelectedMatiere] = useState(''); // Matière sélectionnée
    const [notesByClasseMatiere, setNotesByClasseMatiere] = useState({}); // Stockage des notes par couple classe-matière
    const [newNotes, setNewNotes] = useState({}); // Notes à ajouter

    // Chargement initial des données à l’affichage du composant
    useEffect(() => {
        const initial = {};
        (data.donnes_classes || []).forEach(donne => {
            const key = `${donne.classes}-${donne.matiere}`; // Clé unique pour chaque couple classe-matière
            initial[key] = donne.notes; // Affectation des notes correspondantes
        });
        setNotesByClasseMatiere(initial); // Mise à jour de l’état

        // Pré-sélection de la première classe/matière
        if (data.classes_matieres.length > 0) {
            const first = data.classes_matieres[0];
            setSelectedClasse(String(first.id_classe));
            setSelectedMatiere(String(first.id_matiere));
        }
    }, [data]);

    // Mise à jour d'une note existante (modification locale dans le state)
    const handleNoteChange = (key, index, field, value) => {
        const updatedNotes = [...notesByClasseMatiere[key]]; // Copie des notes actuelles
        updatedNotes[index] = { ...updatedNotes[index], [field]: value }; // Mise à jour de la valeur modifiée
        setNotesByClasseMatiere(prev => ({ ...prev, [key]: updatedNotes })); // Enregistrement dans le state
    };

    // Enregistrement d'une note modifiée vers le serveur
    const saveNote = (note, id_matiere) => {
        fetch('https://ahadi.zzz.bordeaux-inp.fr/backend/changerNote.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `email=${encodeURIComponent(note.email)}&note=${encodeURIComponent(note.note)}&commentaire=${encodeURIComponent(note.commentaire || '')}&id_matiere=${id_matiere}`
        })
        .then(() => setMessage('✅ Note mise à jour avec succès'))
        .catch(() => setMessage('❌ Erreur lors de la mise à jour'));
    };

    // Mise à jour locale de la nouvelle note à ajouter
    const handleNewNoteChange = (key, field, value) => {
        setNewNotes(prev => ({
            ...prev,
            [key]: { ...prev[key], [field]: value }
        }));
    };

    // Ajout d'une nouvelle note (enregistrement côté serveur + mise à jour locale)
    const addNote = (key, id_matiere) => {
        const note = newNotes[key];
        // Vérification des champs requis
        if (!note || !note.email || !note.note) {
            setMessage("⚠️ Veuillez remplir tous les champs obligatoires");
            return;
        }

        // Envoi de la requête POST vers le serveur
        fetch('https://ahadi.zzz.bordeaux-inp.fr/backend/addNote.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `email=${encodeURIComponent(note.email)}&note=${encodeURIComponent(note.note)}&commentaire=${encodeURIComponent(note.commentaire || '')}&id_matiere=${id_matiere}`
        })
        .then(() => {
            const updated = [...(notesByClasseMatiere[key] || []), note]; // Ajout local
            setNotesByClasseMatiere(prev => ({ ...prev, [key]: updated }));
            setNewNotes(prev => ({
                ...prev,
                [key]: { nom: '', prenom: '', note: '', commentaire: '', email: '' } // Réinitialisation du formulaire
            }));
            setMessage('✅ Nouvelle note ajoutée avec succès');
        })
        .catch(() => setMessage("❌ Erreur lors de l'ajout de la note"));
    };

    // Filtrer les matières en fonction de la classe sélectionnée
    const filteredMatieres = data.classes_matieres.filter(
        cm => String(cm.id_classe) === selectedClasse
    );

    // Obtenir le nom de la classe sélectionnée
    const selectedClasseNom = (() => {
        const found = data.classes_matieres.find(cm => String(cm.id_classe) === selectedClasse);
        return found ? found.nom_classe : '';
    })();

    // Obtenir le nom de la matière sélectionnée
    const selectedMatiereNom = (() => {
        const found = data.classes_matieres.find(
            cm => String(cm.id_classe) === selectedClasse && String(cm.id_matiere) === selectedMatiere
        );
        return found ? found.nom_matiere : '';
    })();

    // Clé unique pour accéder aux notes spécifiques de la classe/matière
    const key = `${selectedClasse}-${selectedMatiere}`;
    const localNotes = notesByClasseMatiere[key] || []; // Liste actuelle des notes
    const elevesClasse = data.eleves[selectedClasseNom] || []; // Élèves de la classe sélectionnée

    // Élèves qui n’ont pas encore de note
    const elevesSansNote = elevesClasse.filter(e =>
        !localNotes.some(n => n.email === e.email)
    );

    // Note à ajouter (formulaire)
    const newNote = newNotes[key] || { nom: '', prenom: '', note: '', commentaire: '', email: '' };

    // Déconnexion / retour à la page d'accueil
    function deconnecter() {
        navigate('/');
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-2xl shadow-lg p-6 text-white">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">
                                <span className="text-yellow-200">Professeur</span> {data.utilisateur.prenom}
                            </h1>
                            <p className="text-indigo-100 mt-1">Gestion des notes des élèves</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <div className="flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                <span className="font-medium">Espace Professeur</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* body Content */}
                <div className="bg-white rounded-b-2xl shadow-lg p-6">
                    {/* Message Alert */}
                    {message && (
                        <div className={`mb-6 p-4 rounded-lg ${message.includes('✅') ? 'bg-green-100 text-green-800 border border-green-200' : message.includes('❌') ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-yellow-100 text-yellow-800 border border-yellow-200'}`}>
                            <div className="flex items-center justify-center space-x-2">
                                {message.includes('✅') ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                ) : message.includes('❌') ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                )}
                                <span>{message}</span>
                            </div>
                        </div>
                    )}

                    {/* Classes et subject selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="bg-indigo-50 p-4 rounded-lg">
                            <label htmlFor="classe" className="block text-sm font-medium text-indigo-700 mb-1">Classe</label>
                            <select
                                id="classe"
                                value={selectedClasse}
                                onChange={(e) => {
                                    setSelectedClasse(e.target.value);
                                    const firstMatiere = data.classes_matieres.find(
                                        cm => String(cm.id_classe) === e.target.value
                                    );
                                    if (firstMatiere) {
                                        setSelectedMatiere(String(firstMatiere.id_matiere));
                                    }
                                }}
                                className="w-full bg-white border border-indigo-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                {Array.from(new Set(data.classes_matieres.map(cm => cm.id_classe))).map(id => {
                                    const nomClasse = data.classes_matieres.find(cm => cm.id_classe === id)?.nom_classe;
                                    return (
                                        <option key={id} value={String(id)}>
                                            {nomClasse}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        <div className="bg-indigo-50 p-4 rounded-lg">
                            <label htmlFor="matiere" className="block text-sm font-medium text-indigo-700 mb-1">Matière</label>
                            <select
                                id="matiere"
                                value={selectedMatiere}
                                onChange={(e) => setSelectedMatiere(e.target.value)}
                                className="w-full bg-white border border-indigo-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                {filteredMatieres.map(cm => (
                                    <option key={cm.id_matiere} value={String(cm.id_matiere)}>
                                        {cm.nom_matiere}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Info classes/subject */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-lg p-4 mb-8">
                        <h2 className="text-xl font-semibold text-center text-indigo-700 mb-2">
                            <span className="bg-indigo-100 px-3 py-1 rounded-full">Classe : {selectedClasseNom}</span>
                            <span className="mx-2 text-gray-400">|</span>
                            <span className="bg-purple-100 px-3 py-1 rounded-full">Matière : {selectedMatiereNom}</span>
                        </h2>
                    </div>

                    {/* Grades Table */}
                    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm mb-8">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-indigo-600">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Élève</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Note</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Commentaire</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {localNotes.length > 0 ? (
                                    localNotes.map((note, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                                        <span className="text-indigo-600 font-medium">{note.prenom.charAt(0)}{note.nom.charAt(0)}</span>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{note.prenom} {note.nom}</div>
                                                        <div className="text-sm text-gray-500">{note.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input 
                                                    type="number" 
                                                    min="0" 
                                                    max="20"
                                                    value={note.note} 
                                                    onChange={(e) => handleNoteChange(key, index, 'note', e.target.value)} 
                                                    className="w-20 border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-center font-medium" 
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <input 
                                                    type="text" 
                                                    value={note.commentaire} 
                                                    onChange={(e) => handleNoteChange(key, index, 'commentaire', e.target.value)} 
                                                    className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                                                    placeholder="Ajouter un commentaire..."
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button 
                                                    onClick={() => saveNote(note, selectedMatiere)}
                                                    className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-md transition-colors"
                                                >
                                                    Enregistrer
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                            Aucune note enregistrée pour cette classe et matière.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Ajouter une note */}
                    {elevesSansNote.length > 0 && (
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                </svg>
                                Ajouter une nouvelle note
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label htmlFor="eleve" className="block text-sm font-medium text-gray-700 mb-1">Élève</label>
                                    <select
                                        id="eleve"
                                        value={`${newNote.prenom} ${newNote.nom}`}
                                        onChange={(e) => {
                                            const selectedEleve = elevesSansNote.find(el => `${el.prenom} ${el.nom}` === e.target.value);
                                            if (selectedEleve) {
                                                handleNewNoteChange(key, 'prenom', selectedEleve.prenom);
                                                handleNewNoteChange(key, 'nom', selectedEleve.nom);
                                                handleNewNoteChange(key, 'email', selectedEleve.email);
                                            }
                                        }}
                                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="">Sélectionner un élève</option>
                                        {elevesSansNote.map((e, idx) => (
                                            <option key={idx} value={`${e.prenom} ${e.nom}`}>
                                                {e.prenom} {e.nom}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                                    <input
                                        id="note"
                                        type="number"
                                        min="0"
                                        max="20"
                                        placeholder="0-20"
                                        value={newNote.note}
                                        onChange={(e) => handleNewNoteChange(key, 'note', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="commentaire" className="block text-sm font-medium text-gray-700 mb-1">Commentaire</label>
                                    <input
                                        id="commentaire"
                                        type="text"
                                        placeholder="Facultatif"
                                        value={newNote.commentaire}
                                        onChange={(e) => handleNewNoteChange(key, 'commentaire', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div className="flex items-end">
                                    <button
                                        onClick={() => addNote(key, selectedMatiere)}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                        </svg>
                                        Ajouter
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-end mt-5">
                        <button
                            onClick={deconnecter}
                            className="flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow hover:shadow-lg transition-all hover:scale-105 active:scale-95"
                        >
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

export default Prof;