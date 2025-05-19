import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaLock, FaPlus, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function CreerCompte() {
    const navigate = useNavigate();
    const [infos, setInfos] = useState({
        nom: "", prenom: "", email: "", mdp1: "", mdp2: "", role: "", classe: "", pairs: []
    });
    const [pair, setPair] = useState({classe: "", matiere: ""});
    const [erreur, setErreur] = useState(false);
    const [json, setJson] = useState({classes: [], matieres: []});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            let data = await fetch('https://ahadi.zzz.bordeaux-inp.fr/backend/envoieMatiereClasse.php')
            let reponse = await data.json()
            setJson(reponse)
        }
        fetchData()
    }, []);

    function ajouterPair(e) {
        e.preventDefault();
        if (pair.classe && pair.matiere) {
            setInfos({...infos, pairs: [...infos.pairs, pair]})
        }
        setPair({classe: "", matiere: ""})
    }

    function submit(e) {
        e.preventDefault();
        setIsLoading(true);
        
        if (infos.mdp1 !== infos.mdp2) {
            setErreur(true);
            setIsLoading(false);
            return;
        }

        setErreur(false);

        fetch('https://ahadi.zzz.bordeaux-inp.fr/backend/users.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `nom=${encodeURIComponent(infos.nom)}&prenom=${encodeURIComponent(infos.prenom)}&email=${encodeURIComponent(infos.email)}&mdp=${encodeURIComponent(infos.mdp1)}&role=${encodeURIComponent(infos.role)}&classe=${encodeURIComponent(infos.classe)}&pairs=${encodeURIComponent(JSON.stringify(infos.pairs))}`
        })
        .then(res => res.json())
        .then((data) => {
            setIsLoading(false);
            if (Object.keys(data).length == 1) {
                setErreur(true);
            } else {
                navigate("/connecter")
            }
        })
        .catch(err => {
            setIsLoading(false);
            console.error("Erreur lors de la soumission", err);
            setErreur(true);
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
           

            <div className="relative z-10 w-full max-w-2xl">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-center text-white">
                        <h2 className="text-3xl font-bold">Créer un compte</h2>
                        <p className="mt-2 opacity-90">Rejoignez notre plateforme éducative</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={submit} className="p-8 space-y-6">
                        {erreur && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                                <div className="flex items-center">
                                    <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-sm text-red-700 font-medium">Les mots de passe ne correspondent pas</p>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Prénom"
                                    value={infos.prenom}
                                    onChange={e => setInfos({ ...infos, prenom: e.target.value })}
                                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Nom"
                                    value={infos.nom}
                                    onChange={e => setInfos({ ...infos, nom: e.target.value })}
                                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                    required
                                />
                            </div>

                            <div className="relative md:col-span-2">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Adresse e-mail"
                                    value={infos.email}
                                    onChange={e => setInfos({ ...infos, email: e.target.value })}
                                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="Mot de passe"
                                    value={infos.mdp1}
                                    onChange={e => setInfos({ ...infos, mdp1: e.target.value })}
                                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="Confirmer le mot de passe"
                                    value={infos.mdp2}
                                    onChange={e => setInfos({ ...infos, mdp2: e.target.value })}
                                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                    required
                                />
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-700">Je suis :</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${infos.role === "student" ? "border-indigo-500 bg-indigo-50" : "border-gray-300 hover:border-indigo-300"}`}>
                                    <input
                                        type="radio"
                                        name="role"
                                        checked={infos.role === "student"}
                                        onChange={() => setInfos({ ...infos, role: "student" })}
                                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <div className="ml-3 flex items-center">
                                        <FaUserGraduate className="h-5 w-5 text-indigo-600 mr-2" />
                                        <span className="block text-sm font-medium text-gray-700">Élève</span>
                                    </div>
                                </label>

                                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${infos.role === "prof" ? "border-indigo-500 bg-indigo-50" : "border-gray-300 hover:border-indigo-300"}`}>
                                    <input
                                        type="radio"
                                        name="role"
                                        checked={infos.role === "prof"}
                                        onChange={() => setInfos({ ...infos, role: "prof", classe: "" })}
                                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <div className="ml-3 flex items-center">
                                        <FaChalkboardTeacher className="h-5 w-5 text-indigo-600 mr-2" />
                                        <span className="block text-sm font-medium text-gray-700">Professeur</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Class Selection */}
                        {infos.role === "student" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Classe</label>
                                <select
                                    value={infos.classe}
                                    onChange={(e) => setInfos({ ...infos, classe: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                    required
                                >
                                    <option value="">-- Sélectionnez votre classe --</option>
                                    <option value="GR1">GR1</option>
                                    <option value="GR2">GR2</option>
                                    <option value="GR3">GR3</option>
                                    <option value="GR4">GR4</option>
                                </select>
                            </div>
                        )}

                        {/* prof Pairs */}
                        {infos.role === "prof" && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="md:col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Classe</label>
                                        <select 
                                            value={pair.classe}
                                            onChange={(e) => {setPair({...pair, classe: e.target.value})}}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                        >
                                            <option value="">-- Sélectionnez --</option>
                                            {json.classes.map((classe) => (
                                                <option key={classe.id_classe} value={classe.id_classe}>{classe.nom}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="md:col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Matière</label>
                                        <select 
                                            value={pair.matiere}
                                            onChange={(e) => {setPair({...pair, matiere: e.target.value})}}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                        >
                                            <option value="">-- Sélectionnez --</option>
                                            {json.matieres.map((matiere) => (
                                                <option key={matiere.id_matiere} value={matiere.id_matiere}>{matiere.nom}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="md:col-span-1 flex items-end">
                                        <button 
                                            onClick={ajouterPair}
                                            className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg transition"
                                        >
                                            <FaPlus className="mr-2" />
                                            Ajouter
                                        </button>
                                    </div>
                                </div>

                                {infos.pairs.length > 0 && (
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Vos paires classe-matière :</h4>
                                        <ul className="space-y-2">
                                            {infos.pairs.map((p, index) => (
                                                <li key={index} className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
                                                    <span className="text-sm text-gray-700">
                                                        <span className="font-medium">Classe :</span> {p.classe}, <span className="font-medium">Matière :</span> {p.matiere}
                                                    </span>
                                                    <button 
                                                        type="button"
                                                        onClick={() => {
                                                            setInfos({
                                                                ...infos,
                                                                pairs: infos.pairs.filter((_, i) => i !== index)
                                                            });
                                                        }}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Création en cours...
                                </>
                            ) : 'Créer mon compte'}
                        </button>

                        <div className="text-center text-sm text-gray-600">
                            Déjà un compte ?{' '}
                            <Link to="/connecter" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Se connecter
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* Animation styles */}
            <style jsx>{`
                @keyframes float {
                    0% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(-20px) translateX(10px); }
                    100% { transform: translateY(0) translateX(0); }
                }
                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </div>
    );
}

export default CreerCompte;