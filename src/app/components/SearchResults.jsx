'use client'
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchResults({initialResults, handleDealClick}) {
    const [results, setResults] = useState(initialResults);
    const [filters, setFilters] = useState({
        prijsPerDag: null,
        merk: [],
        model: [],
        kleur: []
    });


    const onDealClick = useCallback((vehicleId, categorie) => {
        handleDealClick(vehicleId, categorie);
    }, [handleDealClick]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const applyFilters = () => {
        const filteredResults = initialResults.filter((vehicle) => {
            return (
                (filters.prijsPerDag === '' || vehicle.prijsPerDag <= parseFloat(filters.prijsPerDag)) &&
                (filters.merk === '' || vehicle.merk.toLowerCase().includes(filters.merk.toLowerCase())) &&
                (filters.model === '' || vehicle.model.toLowerCase().includes(filters.model.toLowerCase())) &&
                (filters.kleur === '' || vehicle.kleur.toLowerCase().includes(filters.kleur.toLowerCase()))
            );
        });
        setResults(filteredResults);
    };

    return (
        <div className='container px-4container max-w-200'>
            <div className="flex flex-col gap-4 mb-6">
                <input
                    type="range"
                    name="prijsPerDag"
                    placeholder="Max prijs per dag"
                    value={filters.prijsPerDag}
                    onChange={handleFilterChange}
                    className="p-2 border rounded"
                />
                <input
                    type="radio"
                    name="merk"
                    placeholder="Merk"
                    value={filters.merk}
                    onChange={handleFilterChange}
                    className="p-2 border rounded"
                />
                <input
                    type="radio"
                    name="model"
                    placeholder="Model"
                    value={filters.model}
                    onChange={handleFilterChange}
                    className="p-2 border rounded"
                />
                <input
                    type="radio"
                    name="kleur"
                    placeholder="Kleur"
                    value={filters.kleur}
                    onChange={handleFilterChange}
                    className="p-2 border rounded"
                />
                <button
                    onClick={applyFilters}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Apply Filters
                </button>
            </div>
            {results.length === 0 ? (
                <p className="text-gray-600">No vehicles found matching your search criteria.</p>
            ) : (
                <div className="flex flex-col gap-6">
                    {results.map((vehicle, index) => (
                        <div
                            key={index}
                            className="w-full p-6 border rounded bg-gray-50 shadow-sm hover:shadow-md transition"
                        >
                            <h1><strong>{vehicle.merk} {vehicle.model}</strong></h1>
                            <p><strong>Kenteken:</strong> {vehicle.kenteken}</p>
                            <p><strong>Kleur:</strong> {vehicle.kleur}</p>
                            <p><strong>Aanschafjaar:</strong> {vehicle.bouwjaar}</p>
                            <p><strong>Prijs per dag:</strong> €{vehicle.prijsPerDag}</p>
                            <form onSubmit={(e) =>{e.preventDefault();
                                onDealClick(vehicle.id, vehicle.categorie)
                            }}>
                            
                                <button
                                    type='sumbit'
                                    className="mt-2  px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                >
                                    Toon deal
                                </button>
                            </form>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}