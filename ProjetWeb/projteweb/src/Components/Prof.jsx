import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Prof() {
    const location = useLocation();
    const data = location.state?.data;

    const [message, setMessage] = useState('');
    const [selectedClasse, setSelectedClasse] = useState('');
    const [selectedMatiere, setSelectedMatiere] = useState('');
    const [notesByClasseMatiere, setNotesByClasseMatiere] = useState({});
    const [newNotes, setNewNotes] = useState({});

    useEffect(() => {
        const initial = {};
        (data.donnes_classes || []).forEach(donne => {
            const key = `${donne.classes}-${donne.matiere}`;
            initial[key] = donne.notes;
        });
        setNotesByClasseMatiere(initial);

        if (data.classes_matieres.length > 0) {
            const first = data.classes_matieres[0];
            setSelectedClasse(String(first.id_classe));
            setSelectedMatiere(String(first.id_matiere));
        }
    }, [data]);

    const handleNoteChange = (key, index, field, value) => {
        const updatedNotes = [...notesByClasseMatiere[key]];
        updatedNotes[index] = { ...updatedNotes[index], [field]: value };
        setNotesByClasseMatiere(prev => ({ ...prev, [key]: updatedNotes }));
    };

    const saveNote = (note, id_matiere) => {
        fetch('http://localhost/ProjetWeb/changerNote.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `email=${encodeURIComponent(note.email)}&note=${encodeURIComponent(note.note)}&commentaire=${encodeURIComponent(note.commentaire || '')}&id_matiere=${id_matiere}`
        })
        .then(() => setMessage('✅ Note mise à jour'))
        .catch(() => setMessage('❌ Erreur lors de la mise à jour'));
    };

    const handleNewNoteChange = (key, field, value) => {
        setNewNotes(prev => ({
            ...prev,
            [key]: { ...prev[key], [field]: value }
        }));
    };

    const addNote = (key, id_matiere) => {
        const note = newNotes[key];
        if (!note || !note.email || !note.note) {
            setMessage("⚠️ Remplissez tous les champs");
            return;
        }

        fetch('http://localhost/ProjetWeb/addNote.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `email=${encodeURIComponent(note.email)}&note=${encodeURIComponent(note.note)}&commentaire=${encodeURIComponent(note.commentaire || '')}&id_matiere=${id_matiere}`
        })
        .then(() => {
            const updated = [...(notesByClasseMatiere[key] || []), note];
            setNotesByClasseMatiere(prev => ({ ...prev, [key]: updated }));
            setNewNotes(prev => ({
                ...prev,
                [key]: { nom: '', prenom: '', note: '', commentaire: '', email: '' }
            }));
            setMessage('✅ Note ajoutée');
        })
        .catch(() => setMessage("❌ Erreur lors de l'ajout"));
    };

    const filteredMatieres = data.classes_matieres.filter(
        cm => String(cm.id_classe) === selectedClasse
    );

    const selectedClasseNom = (() => {
        const found = data.classes_matieres.find(cm => String(cm.id_classe) === selectedClasse);
        return found ? found.nom_classe : '';
    })();

    const selectedMatiereNom = (() => {
        const found = data.classes_matieres.find(
            cm => String(cm.id_classe) === selectedClasse && String(cm.id_matiere) === selectedMatiere
        );
        return found ? found.nom_matiere : '';
    })();


    const key = `${selectedClasse}-${selectedMatiere}`;
    const localNotes = notesByClasseMatiere[key] || [];
    const elevesClasse = data.eleves[selectedClasseNom] || [];

    const elevesSansNote = elevesClasse.filter(e =>
        !localNotes.some(n => n.email === e.email)
    );

    const newNote = newNotes[key] || { nom: '', prenom: '', note: '', commentaire: '', email: '' };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 py-10 px-6">
            <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
                <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
                    Bonjour Professeur {data.utilisateur.prenom}
                </h1>

                {message && (
                    <div className="mb-6 text-center text-green-700 font-semibold bg-green-100 border border-green-300 p-3 rounded-md">
                        {message}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
                    <select
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
                        className="border p-2 rounded-md"
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

                    <select
                        value={selectedMatiere}
                        onChange={(e) => setSelectedMatiere(e.target.value)}
                        className="border p-2 rounded-md"
                    >
                        {filteredMatieres.map(cm => (
                            <option key={cm.id_matiere} value={String(cm.id_matiere)}>
                                {cm.nom_matiere}
                            </option>
                        ))}
                    </select>
                </div>

                <h2 className="text-xl font-semibold text-indigo-700 mb-4 text-center">
                    Classe : {selectedClasseNom} – Matière : {selectedMatiereNom}
                </h2>

                <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm mb-4">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="p-3">Prénom</th>
                            <th className="p-3">Nom</th>
                            <th className="p-3">Note</th>
                            <th className="p-3">Commentaire</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {localNotes.length > 0 ? (
                            localNotes.map((note, index) => (
                                <tr key={index} className="text-center">
                                    <td className="p-2">
                                        <input type="text" value={note.prenom} readOnly className="border px-2 py-1 rounded-md w-full bg-gray-100" />
                                    </td>
                                    <td className="p-2">
                                        <input type="text" value={note.nom} readOnly className="border px-2 py-1 rounded-md w-full bg-gray-100" />
                                    </td>
                                    <td className="p-2">
                                        <input type="number" value={note.note} onChange={(e) => handleNoteChange(key, index, 'note', e.target.value)} className="border px-2 py-1 rounded-md w-20 text-center" />
                                    </td>
                                    <td className="p-2">
                                        <input type="text" value={note.commentaire} onChange={(e) => handleNoteChange(key, index, 'commentaire', e.target.value)} className="border px-2 py-1 rounded-md w-full" />
                                    </td>
                                    <td className="p-2">
                                        <button onClick={() => saveNote(note, selectedMatiere)} className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md transition">
                                            Enregistrer
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-gray-500 py-4">
                                    Aucun élève n'a encore de note.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {elevesSansNote.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-md font-semibold mb-2 text-gray-700">Ajouter une note</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                            <select
                                value={`${newNote.prenom} ${newNote.nom}`}
                                onChange={(e) => {
                                    const selectedEleve = elevesSansNote.find(el => `${el.prenom} ${el.nom}` === e.target.value);
                                    if (selectedEleve) {
                                        handleNewNoteChange(key, 'prenom', selectedEleve.prenom);
                                        handleNewNoteChange(key, 'nom', selectedEleve.nom);
                                        handleNewNoteChange(key, 'email', selectedEleve.email);
                                    }
                                }}
                                className="border p-2 rounded-md"
                            >
                                <option value="">-- Sélectionner un élève --</option>
                                {elevesSansNote.map((e, idx) => (
                                    <option key={idx} value={`${e.prenom} ${e.nom}`}>
                                        {e.prenom} {e.nom}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                placeholder="Note"
                                value={newNote.note}
                                onChange={(e) => handleNewNoteChange(key, 'note', e.target.value)}
                                className="border p-2 rounded-md"
                            />
                            <input
                                type="text"
                                placeholder="Commentaire"
                                value={newNote.commentaire}
                                onChange={(e) => handleNewNoteChange(key, 'commentaire', e.target.value)}
                                className="border p-2 rounded-md"
                            />
                            <button
                                onClick={() => addNote(key, selectedMatiere)}
                                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition"
                            >
                                Ajouter la note
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Prof;
