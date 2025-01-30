import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AbonnementMedewerkerBeheer() {
    const [medewerkers, setMedewerkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { apiClient } = useAuth();

    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Get medewerkers list
            const response = await apiClient.get('/api/Abonnement/GetMedewerkersMetAbonnement');
            
            if (response.data) {
                setMedewerkers(response.data);
            }
        } catch (err) {
            console.error('Error loading data:', err);
            setError(err.response?.data?.message || 'Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleAddToAbonnement = async (medewerkerId) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await apiClient.post('/api/Abonnement/AddWerknemerToAbonnement', {
                userId: medewerkerId
            });

            if (response.status === 200) {
                // Refresh the list after successful addition
                await loadData();
            }
        } catch (err) {
            console.error('Error adding employee to subscription:', err);
            setError(err.response?.data?.message || 'Failed to add employee to subscription');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFromAbonnement = async (medewerkerId) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await apiClient.post('/api/Abonnement/RemoveWerknemerFromAbonnement', {
                userId: medewerkerId
            });

            if (response.status === 200) {
                // Refresh the list after successful removal
                await loadData();
            }
        } catch (err) {
            console.error('Error removing employee from subscription:', err);
            setError(err.response?.data?.message || 'Failed to remove employee from subscription');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    return (
        <div className="space-y-6">
            {error && (
                <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                    {error}
                </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Medewerkers Abonnement Beheer</h3>
                {medewerkers.length === 0 ? (
                    <p className="text-gray-500">Geen medewerkers gevonden.</p>
                ) : (
                    <div className="space-y-4">
                        {medewerkers.map((medewerker) => (
                            <div 
                                key={medewerker.id} 
                                className="flex justify-between items-center p-4 border rounded-lg"
                            >
                                <div>
                                    <p className="font-medium">
                                        {medewerker.voornaam} {medewerker.achternaam}
                                    </p>
                                    <p className="text-sm text-gray-600">{medewerker.emailAddress}</p>
                                </div>
                                <div>
                                    {medewerker.heeftAbonnementRechten ? (
                                        <button
                                            onClick={() => handleRemoveFromAbonnement(medewerker.id)}
                                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                            disabled={loading}
                                        >
                                            Verwijderen van Abonnement
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleAddToAbonnement(medewerker.id)}
                                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                            disabled={loading}
                                        >
                                            Toevoegen aan Abonnement
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}