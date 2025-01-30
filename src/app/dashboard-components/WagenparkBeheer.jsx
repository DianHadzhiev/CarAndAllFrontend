'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function WagenparkBeheer() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [newMedewerkerEmail, setNewMedewerkerEmail] = useState('');
    const [newMedewerkerVoornaam, setNewMedewerkerVoornaam] = useState('');
    const [newMedewerkerAchternaam, setNewMedewerkerAchternaam] = useState('');
    const { apiClient } = useAuth();

    const handleAddMedewerker = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);

            const response = await apiClient.post('/api/Register/Medewerker', {
                voorNaam: newMedewerkerVoornaam,
                achterNaam: newMedewerkerAchternaam,
                email: newMedewerkerEmail,
                password: "Welkom123!", // This should be changed by the user on first login
                telefoonNummer: "", // These can be updated by the employee later
                straatHuisnummer: "",
                postcode: ""
            });

            if (response.status === 200) {
                setSuccessMessage('Medewerker succesvol toegevoegd');
                setNewMedewerkerEmail('');
                setNewMedewerkerVoornaam('');
                setNewMedewerkerAchternaam('');
                setError(null);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Er is een fout opgetreden bij het toevoegen van de medewerker');
            console.error('Error adding medewerker:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}
                {successMessage && (
                    <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                        <p className="text-green-700">{successMessage}</p>
                    </div>
                )}

                <h3 className="text-lg font-semibold mb-4">Medewerker Toevoegen</h3>
                <form onSubmit={handleAddMedewerker} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Voornaam
                        </label>
                        <input
                            type="text"
                            value={newMedewerkerVoornaam}
                            onChange={(e) => setNewMedewerkerVoornaam(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                            placeholder="Voornaam"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Achternaam
                        </label>
                        <input
                            type="text"
                            value={newMedewerkerAchternaam}
                            onChange={(e) => setNewMedewerkerAchternaam(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                            placeholder="Achternaam"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Zakelijk Email
                        </label>
                        <input
                            type="email"
                            value={newMedewerkerEmail}
                            onChange={(e) => setNewMedewerkerEmail(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                            placeholder="naam@bedrijf.nl"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                            ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                        {loading ? 'Bezig met toevoegen...' : 'Medewerker Toevoegen'}
                    </button>
                </form>
            </div>
        </div>
    );
}