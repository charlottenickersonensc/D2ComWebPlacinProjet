import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Student() {
    const location = useLocation();
    const data = location.state.data;
    const navigate = useNavigate();
    console.log(data);


    const { utilisateur, notes } = data;

    function deconnecter() {
        
        navigate('/');
    }
    
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
                <h1 className="text-3xl font-bold text-gray-800">Bienvenue, {utilisateur.prenom}</h1>

                <div>
                    <h2 className="text-xl font-semibold mb-2">Vos Notes</h2>
                    <table className="w-full table-auto border border-gray-300 rounded-md overflow-hidden">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-2 border">Matière</th>
                                <th className="p-2 border">Note</th>
                                <th className="p-2 border">Commentaire</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.map((note, index) => (
                                <tr key={index} className="text-center">
                                    <td className="border p-2">{note.nom}</td>
                                    <td className="border p-2">{note.note}</td>
                                    <td className="border p-2">{note.commentaire}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        onClick={deconnecter}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                        Se déconnecter
                    </button>
                    
                </div>
            </div>
        </div>
    );
}

export default Student;
