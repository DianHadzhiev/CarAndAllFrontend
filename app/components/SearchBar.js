// /*components/SearchBar.js*/
// "use client";
//
// import React, { useState, useEffect } from "react";
// import Papa from "papaparse";
// import "./SearchBar.css";
//
// const SearchBar = () => {
//     const [vehicles, setVehicles] = useState([]);
//     const [filteredVehicles, setFilteredVehicles] = useState([]);
//     const [selectedType, setSelectedType] = useState("");
//     const [selectedBrand, setSelectedBrand] = useState("");
//     const [pickupDate, setPickupDate] = useState("");
//     const [returnDate, setReturnDate] = useState("");
//
//     useEffect(() => {
//         // Load CSV data
//         Papa.parse("/vehicles.csv", {
//             download: true,
//             header: true,
//             complete: (result) => {
//                 setVehicles(result.data);
//             },
//         });
//     }, []);
//
//     const handleSearch = () => {
//         // Filter based on type and brand
//         const results = vehicles.filter((vehicle) => {
//             const matchesType = selectedType ? vehicle.Type === selectedType : true;
//             const matchesBrand = selectedBrand ? vehicle.Merk === selectedBrand : true;
//             return matchesType && matchesBrand;
//         });
//         setFilteredVehicles(results);
//     };
//
//     return (
//         <div className="search-bar-container">
//             <div className="search-bar">
//                 {/* Type Dropdown */}
//                 <select
//                     onChange={(e) => {
//                         setSelectedType(e.target.value);
//                         setSelectedBrand(""); // Reset brand if type changes
//                     }}
//                     value={selectedType}
//                     className="search-bar-dropdown"
//                 >
//                     <option value="">Type Voertuig</option>
//                     <option value="Auto">Auto</option>
//                     <option value="Camper">Camper</option>
//                     <option value="Caravan">Caravan</option>
//                 </select>
//
//                 {/* Brand Dropdown */}
//                 <select
//                     onChange={(e) => setSelectedBrand(e.target.value)}
//                     value={selectedBrand}
//                     className="search-bar-dropdown"
//                 >
//                     <option value="">Kies Merk</option>
//                     {vehicles
//                         .filter((vehicle) => !selectedType || vehicle.Type === selectedType)
//                         .map((vehicle, index) => (
//                             <option key={index} value={vehicle.Merk}>
//                                 {vehicle.Merk}
//                             </option>
//                         ))}
//                 </select>
//
//                 {/* Pickup Date */}
//                 <input
//                     type="date"
//                     value={pickupDate}
//                     onChange={(e) => setPickupDate(e.target.value)}
//                     className="search-bar-date"
//                 />
//
//                 {/* Return Date */}
//                 <input
//                     type="date"
//                     value={returnDate}
//                     onChange={(e) => setReturnDate(e.target.value)}
//                     className="search-bar-date"
//                 />
//
//                 {/* Search Button */}
//                 <button className="search-bar-button" onClick={handleSearch}>
//                     Zoeken
//                 </button>
//             </div>
//
//             {/* Display Results */}
//             <div className="vehicle-list">
//                 {filteredVehicles.map((vehicle, index) => (
//                     <div key={index} className="vehicle-item">
//                         <p><strong>Type:</strong> {vehicle.Type}</p>
//                         <p><strong>Merk:</strong> {vehicle.Merk}</p>
//                         <p><strong>Model:</strong> {vehicle.Model}</p>
//                         <p><strong>Kenteken:</strong> {vehicle.Kenteken}</p>
//                         <p><strong>Kleur:</strong> {vehicle.Kleur}</p>
//                         <p><strong>Aanschafjaar:</strong> {vehicle.Aanschafjaar}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default SearchBar;

"use client";

import React, { useState, useEffect } from "react";
import Papa from "papaparse";

const SearchBar = () => {
    const [vehicles, setVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [pickupDate, setPickupDate] = useState("");
    const [returnDate, setReturnDate] = useState("");

    useEffect(() => {
        // Load CSV data
        Papa.parse("/vehicles.csv", {
            download: true,
            header: true,
            complete: (result) => {
                setVehicles(result.data);
            },
        });
    }, []);

    const handleSearch = () => {
        // Filter based on type and brand
        const results = vehicles.filter((vehicle) => {
            const matchesType = selectedType ? vehicle.Type === selectedType : true;
            const matchesBrand = selectedBrand ? vehicle.Merk === selectedBrand : true;
            return matchesType && matchesBrand;
        });
        setFilteredVehicles(results);
    };

    return (
        <div className="max-w-screen-lg mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-wrap gap-4 items-center">
                <select
                    onChange={(e) => {
                        setSelectedType(e.target.value);
                        setSelectedBrand(""); // Reset brand if type changes
                    }}
                    value={selectedType}
                    className="flex-1 px-4 py-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">Type Voertuig</option>
                    <option value="Auto">Auto</option>
                    <option value="Camper">Camper</option>
                    <option value="Caravan">Caravan</option>
                </select>

                <select
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    value={selectedBrand}
                    className="flex-1 px-4 py-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">Kies Merk</option>
                    {vehicles
                        .filter((vehicle) => !selectedType || vehicle.Type === selectedType)
                        .map((vehicle, index) => (
                            <option key={index} value={vehicle.Merk}>
                                {vehicle.Merk}
                            </option>
                        ))}
                </select>

                <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    onClick={handleSearch}
                >
                    Zoeken
                </button>
            </div>

            <div className="mt-6">
                {filteredVehicles.map((vehicle, index) => (
                    <div
                        key={index}
                        className="p-4 border rounded mb-4 bg-gray-50 shadow-sm"
                    >
                        <p>
                            <strong>Type:</strong> {vehicle.Type}
                        </p>
                        <p>
                            <strong>Merk:</strong> {vehicle.Merk}
                        </p>
                        <p>
                            <strong>Model:</strong> {vehicle.Model}
                        </p>
                        <p>
                            <strong>Kenteken:</strong> {vehicle.Kenteken}
                        </p>
                        <p>
                            <strong>Kleur:</strong> {vehicle.Kleur}
                        </p>
                        <p>
                            <strong>Aanschafjaar:</strong> {vehicle.Aanschafjaar}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
