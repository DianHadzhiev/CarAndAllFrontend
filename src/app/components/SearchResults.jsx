'use client'
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SearchResults({ initialResults, handleDealClick }) {
    const [results, setResults] = useState(initialResults);
    const [filters, setFilters] = useState({
        prijsPerDag: null,
        merk: [],
        model: [],
        kleur: []
    });

    const getDefaultImage = (category) => {
        const lowerCategory = category.toLowerCase();
        if (lowerCategory.includes('auto')) return '/images/car.png';
        if (lowerCategory.includes('caravan')) return '/images/caravan.png';
        if (lowerCategory.includes('camper')) return '/images/camper.png';
        return '/images/car.png'; // fallback image
    };


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
        <div className='container px-4 container max-w-200'>
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
                    Filters Toepassen
                </button>
            </div>
            {results.length === 0 ? (
                <p className="text-gray-600">Geen voertuigen gevonden die aan uw zoekcriteria voldoen.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map((vehicle, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                        >
                            <div className="relative h-48 w-full">
                                <Image
                                    src={getDefaultImage(vehicle.categorie)}
                                    alt={`${vehicle.merk} ${vehicle.model}`}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-2">{vehicle.merk} {vehicle.model}</h2>
                                <div className="space-y-2 text-gray-600">
                                    <p><strong>Kenteken:</strong> {vehicle.kenteken}</p>
                                    <p><strong>Kleur:</strong> {vehicle.kleur}</p>
                                    <p><strong>Bouwjaar:</strong> {vehicle.bouwjaar}</p>
                                    <p className="text-lg font-semibold text-blue-600">
                                        €{vehicle.prijsPerDag}/dag
                                    </p>
                                </div>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    handleDealClick(vehicle.id, vehicle.categorie);
                                }} className="mt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                    >
                                        Details Bekijken
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}