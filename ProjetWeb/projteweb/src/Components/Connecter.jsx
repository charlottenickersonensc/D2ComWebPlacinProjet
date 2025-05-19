import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUserShield } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function Connecter() {
    const navigate = useNavigate();
    const [infos, setInfos] = useState({ email: "", mdp: "" });
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function changeEmail(e) {
        setInfos({ ...infos, email: e.target.value });
        setError(false);
    }

    function changeMdp(e) {
        setInfos({ ...infos, mdp: e.target.value });
        setError(false);
    }

    function submit(e) {
        e.preventDefault();
        setIsLoading(true);

        fetch('https://ahadi.zzz.bordeaux-inp.fr/backend/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `email=${encodeURIComponent(infos.email)}&mdp=${encodeURIComponent(infos.mdp)}`
        })
        .then((response) => response.json())
        .then((data) => {
            setIsLoading(false);
            if (Object.keys(data).length > 0) {
                setError(false);
                if (data.utilisateur.role == "prof") {
                    navigate("/prof", {state: {data:data}});
                } else {
                    navigate("/student", {state: {data:data}});
                }
            } else {
                setError(true);
            }
        })
        .catch((error) => {
            setIsLoading(false);
            console.error("Erreur lors de la soumission", error);
            setError(true);
        });
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-600 to-purple-700 px-4 py-12">

            <div className="relative z-10 w-full max-w-md">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-center text-white">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                            <FaUserShield className="text-2xl text-white" />
                        </div>
                        <h2 className="text-2xl font-bold">Connexion à votre compte</h2>
                        <p className="text-sm opacity-80 mt-1">Accédez à votre espace personnel</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={submit} className="p-6 space-y-6">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4">
                                <div className="flex items-center">
                                    <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-sm text-red-700 font-medium">Email ou mot de passe incorrect</p>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Adresse e-mail"
                                    value={infos.email}
                                    onChange={changeEmail}
                                    required
                                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="Mot de passe"
                                    value={infos.mdp}
                                    onChange={changeMdp}
                                    required
                                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Se souvenir de moi
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link to="/mot-de-passe-oublie" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Mot de passe oublié ?
                                </Link>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Connexion en cours...
                                </>
                            ) : 'Se connecter'}
                        </button>
                    </form>

                    <div className="px-6 py-4 bg-gray-50 text-center border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                            Vous n'avez pas encore de compte ?{' '}
                            <Link to="/creerCompte" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Créer un compte
                            </Link>
                        </p>
                    </div>
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

export default Connecter;