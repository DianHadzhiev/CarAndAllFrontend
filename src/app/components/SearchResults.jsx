'use client'
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchResults({initialResults, handleDealClick}) {
    const router = useRouter();
    const [results, setResults] = useState(initialResults);

    const onDealClick = useCallback((vehicleId, categorie) => {
        handleDealClick(vehicleId, categorie);
    }, [handleDealClick]);

    return (
        <div>
            {results.length === 0 ? (
                <p className="text-gray-600">No vehicles found matching your search criteria.</p>
            ) : (
                <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.map((vehicle, index) => (
                        <div
                            key={index}
                            className="p-4 border rounded bg-gray-50 shadow-sm hover:shadow-md transition"
                        >
                            <p><strong>Type:</strong> {vehicle.categorie}</p>
                            <p><strong>Merk:</strong> {vehicle.merk}</p>
                            <p><strong>Model:</strong> {vehicle.model}</p>
                            <p><strong>Kenteken:</strong> {vehicle.kenteken}</p>
                            <p><strong>Kleur:</strong> {vehicle.kleur}</p>
                            <p><strong>Aanschafjaar:</strong> {vehicle.bouwjaar}</p>
                            <p><strong>Prijs per dag:</strong> €{vehicle.prijsPerDag}</p>
                            <form onSubmit={(e) =>{e.preventDefault();
                                onDealClick(vehicle.id, vehicle.categorie)
                            }}>
                            
                                <button
                                    type='sumbit'
                                    className="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                >
                                    Toon deal
                                </button>\
                            </form>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}