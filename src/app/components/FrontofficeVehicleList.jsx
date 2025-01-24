import React, { useState, useEffect } from 'react';
import { useAuth } from '@/src/app/context/AuthContext';

const FrontofficeVehicleList = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({
        type: 'all',
        status: 'all',
        searchTerm: ''
    });

    const { apiClient } = useAuth();

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get('/api/Voertuig/GetAllVehiclesForFrontoffice');
                if (response.status === 200) {
                    setVehicles(response.data || []);
                }
            } catch (err) {
                setError('Failed to load vehicles');
                console.error('Error fetching vehicles:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, [apiClient]);

    const filteredVehicles = vehicles.filter(vehicle => {
        if (!vehicle) return false;

        const vehicleType = vehicle.type?.toLowerCase() || '';
        const vehicleStatus = vehicle.status?.toLowerCase() || '';

        const matchesType = filter.type === 'all' || vehicleType === filter.type.toLowerCase();
        const matchesStatus = filter.status === 'all' || vehicleStatus.includes(filter.status.toLowerCase());
        const matchesSearch = !filter.searchTerm || Object.entries(vehicle).some(([key, value]) => {
            return value && value.toString().toLowerCase().includes(filter.searchTerm.toLowerCase());
        });

        return matchesType && matchesStatus && matchesSearch;
    });
    
    if (loading) {
        return <div className="flex justify-center items-center h-64">
            <p className="text-lg">Loading vehicles...</p>
        </div>;
    }

    if (error) {
        return <div className="text-red-500 p-4">{error}</div>;
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-4 mb-6">
                <select
                    className="p-2 border rounded"
                    value={filter.type}
                    onChange={(e) => setFilter(prev => ({ ...prev, type: e.target.value }))}
                >
                    <option value="all">Alle Types</option>
                    <option value="auto">Auto's</option>
                    <option value="camper">Campers</option>
                    <option value="caravan">Caravans</option>
                </select>

                <select
                    className="p-2 border rounded"
                    value={filter.status}
                    onChange={(e) => setFilter(prev => ({ ...prev, status: e.target.value }))}
                >
                    <option value="all">Alle Statussen</option>
                    <option value="beschikbaar">Beschikbaar</option>
                    <option value="reparatie">In Reparatie</option>
                    <option value="verhuurd">Verhuurd</option>
                </select>

                <input
                    type="text"
                    placeholder="Zoeken..."
                    className="p-2 border rounded"
                    value={filter.searchTerm}
                    onChange={(e) => setFilter(prev => ({ ...prev, searchTerm: e.target.value }))}
                />
            </div>

            <div className="grid gap-4">
                {filteredVehicles.map((vehicle) => (
                    <div key={vehicle.Id || Math.random()} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {vehicle.merk || 'Onbekend'} {vehicle.model || ''}
                                    </h3>
                                    <p className="text-sm text-gray-600">Type: {vehicle.type || 'Onbekend'}</p>
                                    <p className="text-sm text-gray-600">Kenteken: {vehicle.kenteken || 'Onbekend'}</p>
                                </div>

                                <div>
                                    <p className="text-sm">
                                        <span className="font-medium">Bouwjaar:</span> {vehicle.bouwjaar || 'Onbekend'}
                                    </p>
                                    <p className="text-sm">
                                        <span className="font-medium">Kleur:</span> {vehicle.kleur || 'Onbekend'}
                                    </p>
                                    <p className="text-sm">
                                        <span className="font-medium">Prijs per dag:</span> {vehicle.prijsPerDag ? `€${vehicle.prijsPerDag}` : 'Onbekend'}
                                    </p>
                                </div>

                                <div>
                                    <p className={`text-sm font-semibold ${vehicle.status === 'Beschikbaar' ? 'text-green-600' :
                                        vehicle.status === 'In Reparatie' ? 'text-red-600' :
                                            'text-yellow-600'
                                        }`}>
                                        Status: {vehicle.status || 'Onbekend'}
                                    </p>
                                    <p className="text-sm">
                                        <span className="font-medium">Huurstatus:</span> {vehicle.huurStatus || 'Onbekend'}
                                    </p>
                                    {vehicle.heeftSchade && (
                                        <p className="text-sm text-red-600">
                                            Schade geregistreerd
                                        </p>
                                    )}
                                </div>
                            </div>

                            {vehicle.LaatsteOpmerking && (
                                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                                    <p className="text-sm">
                                        <span className="font-medium">Laatste opmerking:</span> {vehicle.LaatsteOpmerking}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FrontofficeVehicleList;