
'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function SubscriptionCheckout({ abonnementType, bedrijfKvk }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [duurInMaanden, setDuurInMaanden] = useState(12);
    const { apiClient } = useAuth();

    const handleSubscribe = async () => {
        try {
            setLoading(true);
            setError(null);
            
            if (!bedrijfKvk) {
                setError('KvK nummer niet gevonden. Neem contact op met de beheerder.');
                return;
            }

            const response = await apiClient.post('/api/Abonnement/create-bedrijfsabonnementAanvraag', {
                bedrijfNaam: "Auto Verhuur", 
                kvkNummer: bedrijfKvk,
                abonnementType: abonnementType,
                duurInMaanden: parseInt(duurInMaanden)
            });

            if (response.status === 200) {
                setError(null);
                alert('Abonnement aanvraag succesvol ingediend!');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Er is een fout opgetreden bij het aanmaken van het abonnement');
            console.error('Abonnement fout:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            {error && (
                <div className="text-red-500 mb-4">{error}</div>
            )}
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duur in maanden:
                </label>
                <select
                    value={duurInMaanden}
                    onChange={(e) => setDuurInMaanden(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    disabled={loading}
                >
                    <option value="12">12 maanden</option>
                    <option value="24">24 maanden</option>
                    <option value="36">36 maanden</option>
                </select>
            </div>

            <button
                onClick={handleSubscribe}
                disabled={loading}
                className={`w-full py-2 px-4 rounded ${
                    loading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                } text-white font-medium transition-colors`}
            >
                {loading ? 'Verwerken...' : 'Abonnement Aanvragen'}
            </button>
        </div>
    );
}