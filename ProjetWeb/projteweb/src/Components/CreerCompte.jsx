import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function CreerCompte() {
    const navigate = useNavigate()
    const [infos, setInfos] = useState({
        nom: "", prenom: "", email: "", mdp1: "", mdp2: "", role: "", classe: "", pairs: []
    });
    const [pair, setPair] = useState({classe: "", matiere: ""});
    const [erreur, setErreur] = useState(false);
    const [json, setJson] = useState({classes: [], matieres: []});
    useEffect(() => {
        const fetchData = async() => {
            let data = await fetch('http://localhost/ProjetWeb/envoieMatiereClasse.php')
            let reponse = await data.json()
            setJson(reponse)
        }

        fetchData()
    }, []);

    function ajouterPair(e)
    {
        
        e.preventDefault();
        if (pair.classe && pair.matiere)
        {
            setInfos({...infos, pairs: [...infos.pairs, pair]})
        }
        setPair({classe: "", matiere: ""})
    }

    function submit(e) {
        e.preventDefault();
        console.log(infos)
        if (infos.mdp1 !== infos.mdp2) {
            setErreur(true);
            return;
        }

        setErreur(false);

        fetch('http://localhost/ProjetWeb/users.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `nom=${encodeURIComponent(infos.nom)}&prenom=${encodeURIComponent(infos.prenom)}&email=${encodeURIComponent(infos.email)}&mdp=${encodeURIComponent(infos.mdp1)}&role=${encodeURIComponent(infos.role)}&classe=${encodeURIComponent(infos.classe)}&pairs=${encodeURIComponent(JSON.stringify(infos.pairs))}`
        })
        .then(res => res.json())
        .then((data) => {
            if (Object.keys(data).length == 1)
            {
                setErreur(true);
            }
            else
            {
                navigate("/connecter")
            }
            
        })
        .catch(err => {
            console.error("Erreur lors de la soumission", err);
            setErreur(true);
        });
    }

    return (
        <div className='min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-600 to-purple-600 px-4'>
            <form onSubmit={submit} className='w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-4'>
                <h2 className='text-3xl font-bold text-center text-gray-800'>Créer un compte</h2>

                {erreur && <p className='text-red-500 text-sm text-center'>Les mots de passe ne correspondent pas</p>}

                
                <div className="relative">
                    <FaUser className="absolute top-3 left-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Prénom"
                        value={infos.prenom}
                        onChange={e => setInfos({ ...infos, prenom: e.target.value })}
                        className='w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    />
                </div>

               
                <div className="relative">
                    <FaUser className="absolute top-3 left-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Nom"
                        value={infos.nom}
                        onChange={e => setInfos({ ...infos, nom: e.target.value })}
                        className='w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    />
                </div>

                
                <div className="relative">
                    <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                    <input
                        type="email"
                        placeholder="Adresse e-mail"
                        value={infos.email}
                        onChange={e => setInfos({ ...infos, email: e.target.value })}
                        className='w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    />
                </div>

                
                <div className="relative">
                    <FaLock className="absolute top-3 left-3 text-gray-400" />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={infos.mdp1}
                        onChange={e => setInfos({ ...infos, mdp1: e.target.value })}
                        className='w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    />
                </div>

                
                <div className="relative">
                    <FaLock className="absolute top-3 left-3 text-gray-400" />
                    <input
                        type="password"
                        placeholder="Confirmer le mot de passe"
                        value={infos.mdp2}
                        onChange={e => setInfos({ ...infos, mdp2: e.target.value })}
                        className='w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    />
                </div>

                
                <div className="text-sm text-gray-700">
                    Rôle :
                    <label className="inline-flex items-center ml-4">
                        <input
                            type="radio"
                            name="role"
                            checked={infos.role === "student"}
                            onChange={() => setInfos({ ...infos, role: "student" })}
                            className="mr-1"
                        />
                        Élève
                    </label>
                    <label className="inline-flex items-center ml-4">
                        <input
                            type="radio"
                            name="role"
                            checked={infos.role === "prof"}
                            onChange={() => setInfos({ ...infos, role: "prof", classe: "" })}
                            className="mr-1"
                        />
                        Professeur
                    </label>
                </div>

                
                {infos.role === "student" && (
                    <select
                        value={infos.classe}
                        onChange={(e) => setInfos({ ...infos, classe: e.target.value })}
                        className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    >
                        <option value="">-- Choisissez une classe --</option>
                        <option value="GR1">GR1</option>
                        <option value="GR2">GR2</option>
                        <option value="GR3">GR3</option>
                        <option value="GR4">GR4</option>
                    </select>
                )}

                {infos.role == "prof" && (
                    <div>
                        <div className='w-full flex justify-between'>
                            <select 
                                value={pair.classe}
                                onChange={(e) => {setPair({...pair, classe: e.target.value})}}
                                className='w-full mr-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                >
                                <option value="">-- Choisissez une classe --</option>
                                {json.classes.map((classe) => {
                                    return <option key={classe.id_classe} value={classe.id_classe}>{classe.nom}</option>
                                })}
                            </select>
                            <select 
                                value={pair.matiere}
                                onChange={(e) => {setPair({...pair, matiere: e.target.value})}}
                                className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                >
                                <option value="">-- Choisissez une matière --</option>
                                {json.matieres.map((matiere) => {
                                    return <option key={matiere.id_matiere} value={matiere.id_matiere}>{matiere.nom}</option>
                                })}
                            </select>
                        </div>
                        <button 
                            onClick={ajouterPair}
                            className='mt-2 mx-auto px-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md text-[13px] font-semibold transition duration-200'
                        >
                                Ajouter la paire
                        </button>
                        <ul className='mt-2 list-disc list-inside text-sm text-gray-700 bg-gray-100 p-4 rounded-xl'>
                            {infos.pairs.map((p, index) => {
                                return <li key={index}>Classe : {p.classe} Matière : {p.matiere}</li>
                                
                            })}
                        </ul>
                    </div>
                )}

                
                <button className='w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md text-lg font-semibold transition duration-200'>
                    Créer le compte
                </button>
                <div>
                    <p className='ml-10'>Déjà un compte ?<Link to="/connecter"><span className='ml-1 text-blue-600'>Se connecter</span></Link></p>
                </div>
            </form>
        </div>
    );
}

export default CreerCompte;
