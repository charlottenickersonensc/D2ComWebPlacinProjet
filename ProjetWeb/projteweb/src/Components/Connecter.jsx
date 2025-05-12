import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';


function Connecter() {
    const navigate = useNavigate();
    const [infos, setInfos] = useState({ email: "", mdp: "" });
    const [error, setError] = useState(false);

    function changeEmail(e) {
        setInfos({ ...infos, email: e.target.value });
    }

    function changeMdp(e) {
        setInfos({ ...infos, mdp: e.target.value });
    }

    function submit(e) {
        e.preventDefault();

        fetch('http://localhost/ProjetWeb/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `email=${encodeURIComponent(infos.email)}&mdp=${encodeURIComponent(infos.mdp)}`
        })
        .then((response) => response.json())
        .then((data) => {
            if (Object.keys(data).length > 0) {
                setError(false);
                if (data.utilisateur.role == "prof")
                {
                    navigate("/prof", {state: {data:data}});
                }
                else
                {
                    navigate("/student", {state: {data:data}});
                }
            } 
            else {
                setError(true);
            }
        })
        .catch((error) => {
            console.error("Erreur lors de la soumission", error);
            setError(true);
        });
    }

    return (
        <div className='min-h-screen flex justify-center items-center bg-[rgb(92,68,185)] px-4'>
            <form
                onSubmit={submit}
                className='w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 space-y-4'
            >
                <h2 className='text-2xl font-semibold text-center text-gray-800'>Connexion</h2>

                {error && (
                    <p className='text-red-600 text-sm text-center'>
                        Mot de passe incorrect
                    </p>
                )}

                <div className="relative">
                    <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                    <input
                        type="email"
                        placeholder="Adresse e-mail"
                        value={infos.email}
                        onChange={changeEmail}
                        className='w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <div className='relative'>
                    <FaLock className="absolute top-3 left-3 text-gray-400" />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={infos.mdp}
                        onChange={changeMdp}
                        className='w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                
                <button
                    type="submit"
                    className='w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-md transition duration-200'
                >
                    Se connecter
                </button>
                <div>
                    <p>Vous n’avez pas encore de compte ?<Link to="/creerCompte"><span className='text-blue-600 ml-16'>Créer un compte</span></Link></p>
                </div>
                
            </form>
        </div>
    );
}

export default Connecter;
