'use client'
import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';

export default function SearchResults({ initialResults, handleDealClick }) {
    const [results, setResults] = useState(initialResults);
    const [filters, setFilters] = useState({
        priceRange: { min: 0, max: 170 },
        selectedColor: '',
        selectedBrand: '',
        yearRange: { min: 2015, max: 2025 },
    });

    const [sortOption, setSortOption] = useState('default');

    const sortOptions = [
        { value: 'default', label: 'Standaard' },
        { value: 'price-asc', label: 'Prijs: Laag naar Hoog' },
        { value: 'price-desc', label: 'Prijs: Hoog naar Laag' },
        { value: 'year-asc', label: 'Bouwjaar: Oud naar Nieuw' },
        { value: 'year-desc', label: 'Bouwjaar: Nieuw naar Oud' },
        { value: 'brand-asc', label: 'Merk: A-Z' },
        { value: 'brand-desc', label: 'Merk: Z-A' }
    ];

    // Extract unique values for filters
    useEffect(() => {
        if (initialResults.length > 0) {
            const allPrices = initialResults.map(v => v.prijsPerDag || 0);
            const allYears = initialResults.map(v => v.bouwjaar || 2015);

            setFilters(prev => ({
                ...prev,
                priceRange: {
                    min: Math.min(...allPrices),
                    max: Math.max(...allPrices)
                },
                yearRange: {
                    min: Math.min(...allYears),
                    max: Math.max(...allYears)
                }
            }));
        }
    }, [initialResults]);

    const uniqueColors = [...new Set(initialResults.map(v => v.kleur))].sort();
    const uniqueBrands = [...new Set(initialResults.map(v => v.merk))].sort();

    const getDefaultImage = (category) => {
        const lowerCategory = category?.toLowerCase() || '';
        if (lowerCategory.includes('auto')) return '/images/car.png';
        if (lowerCategory.includes('caravan')) return '/images/caravan.png';
        if (lowerCategory.includes('camper')) return '/images/camper.png';
        return '/images/car.png';
    };

    const applyFiltersAndSort = useCallback(() => {
        let filteredResults = initialResults.filter(vehicle => {
            const priceMatch = vehicle.prijsPerDag <= filters.priceRange.max;
            const colorMatch = !filters.selectedColor || vehicle.kleur === filters.selectedColor;
            const brandMatch = !filters.selectedBrand || vehicle.merk === filters.selectedBrand;
            const yearMatch = vehicle.bouwjaar >= filters.yearRange.min && 
                            vehicle.bouwjaar <= filters.yearRange.max;

            return priceMatch && colorMatch && brandMatch && yearMatch;
        });

        // Apply sorting
        switch (sortOption) {
            case 'price-asc':
                filteredResults.sort((a, b) => (a.prijsPerDag || 0) - (b.prijsPerDag || 0));
                break;
            case 'price-desc':
                filteredResults.sort((a, b) => (b.prijsPerDag || 0) - (a.prijsPerDag || 0));
                break;
            case 'year-asc':
                filteredResults.sort((a, b) => (a.bouwjaar || 0) - (b.bouwjaar || 0));
                break;
            case 'year-desc':
                filteredResults.sort((a, b) => (b.bouwjaar || 0) - (a.bouwjaar || 0));
                break;
            case 'brand-asc':
                filteredResults.sort((a, b) => a.merk.localeCompare(b.merk));
                break;
            case 'brand-desc':
                filteredResults.sort((a, b) => b.merk.localeCompare(a.merk));
                break;
            default:
                // Keep original order
                break;
        }

        setResults(filteredResults);
    }, [initialResults, filters, sortOption]);

    useEffect(() => {
        applyFiltersAndSort();
    }, [applyFiltersAndSort]);

    return (
        <div className='container mx-auto px-4'>
            {/* Filters and Sort Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {/* Sort Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sorteren
                        </label>
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                        >
                            {sortOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Price Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Maximum Prijs per Dag: €{filters.priceRange.max}
                        </label>
                        <input
                            type="range"
                            min={filters.priceRange.min}
                            max={Math.max(filters.priceRange.max, 170)}
                            value={filters.priceRange.max}
                            onChange={(e) => setFilters(prev => ({
                                ...prev,
                                priceRange: { ...prev.priceRange, max: parseInt(e.target.value) }
                            }))}
                            className="w-full"
                        />
                    </div>

                    {/* Brand Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Merk
                        </label>
                        <select
                            value={filters.selectedBrand}
                            onChange={(e) => setFilters(prev => ({
                                ...prev,
                                selectedBrand: e.target.value
                            }))}
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Alle Merken</option>
                            {uniqueBrands.map(brand => (
                                <option key={brand} value={brand}>
                                    {brand}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Color Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Kleur
                        </label>
                        <select
                            value={filters.selectedColor}
                            onChange={(e) => setFilters(prev => ({
                                ...prev,
                                selectedColor: e.target.value
                            }))}
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Alle Kleuren</option>
                            {uniqueColors.map(color => (
                                <option key={color} value={color}>
                                    {color}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Clear Filters Button */}
                    <div className="flex items-end">
                        <button
                            onClick={() => {
                                setFilters({
                                    priceRange: { min: 0, max: 170 },
                                    selectedColor: '',
                                    selectedBrand: '',
                                    yearRange: { min: 2015, max: 2025 }
                                });
                                setSortOption('default');
                            }}
                            className="w-full p-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                        >
                            Filters Wissen
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-4">
                <p className="text-gray-600">{results.length} voertuigen gevonden</p>
            </div>

            {/* Results Section */}
            {results.length === 0 ? (
                <p className="text-center text-gray-600 py-8">Geen voertuigen gevonden die aan uw zoekcriteria voldoen.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map((vehicle, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
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