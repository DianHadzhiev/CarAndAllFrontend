// src/app/components/BedrijfsAbonnementBehandeling.jsx
'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function BedrijfsAbonnementBehandeling() {
    const [abonnementAanvragen, setAbonnementAanvragen] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const { apiClient } = useAuth();

    useEffect(() => {
        loadAanvragen();
    }, []);

    const loadAanvragen = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/api/Abonnement/abonnement-aanvragen');
            setAbonnementAanvragen(response.data);
            setError(null);
        } catch (err) {
            console.error('Error loading subscription requests:', err);
            setError('Goedgekeurd!!!');
        } finally {
            setLoading(false);
        }
    };

    const handleAanvraagBeslissing = async (aanvraagId, isApproved, opmerkingen = "") => {
        try {
            setLoading(true);
            const response = await apiClient.post('/api/Abonnement/approve-abonnement-aanvraag', null, {
                params: {
                    aanvraagId: aanvraagId,
                    isApproved: isApproved,
                    opmerkingen: opmerkingen
                }
            });

            if (response.status === 200) {
                setSuccessMessage(isApproved ? 'Aanvraag goedgekeurd' : 'Aanvraag afgewezen');
                await loadAanvragen(); // Refresh the list
            }
        } catch (err) {
            setError('Error processing request: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center p-4">Laden...</div>;
    }

    if (error) {
        return (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <p className="text-red-700">{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {successMessage && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                    <p className="text-green-700">{successMessage}</p>
                </div>
            )}

            <h3 className="text-lg font-bold mb-4">Openstaande Abonnement Aanvragen</h3>

            {abonnementAanvragen.length === 0 ? (
                <p className="text-gray-500">Geen openstaande aanvragen</p>
            ) : (
                <div className="grid gap-6">
                    {abonnementAanvragen.map((aanvraag) => (
                        <div 
                            key={aanvraag.id} 
                            className="bg-white p-6 rounded-lg shadow border border-gray-200"
                        >
                            <div className="mb-4">
                                <h4 className="font-semibold text-lg mb-2">Bedrijfsgegevens</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-600">Bedrijf KvK:</p>
                                        <p className="font-medium">{aanvraag.kvkBedrijf}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Type Abonnement:</p>
                                        <p className="font-medium">{aanvraag.abonnementType}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => handleAanvraagBeslissing(aanvraag.id, false)}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                    disabled={loading}
                                >
                                    Afwijzen
                                </button>
                                <button
                                    onClick={() => handleAanvraagBeslissing(aanvraag.id, true)}
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                    disabled={loading}
                                >
                                    Goedkeuren
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}