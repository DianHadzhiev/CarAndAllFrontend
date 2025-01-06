"use client";

import React, { useCallback, useState } from "react";
import { useAuth } from "@/src/app/context/AuthContext";
import { useRouter } from "next/navigation";

export const SearchBar = () => {
    const [formData, setFormData] = useState({
        selectedType: "",
        pickupDate: "",
        returnDate: "",
    });
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const router = useRouter();

    const today = new Date().toISOString().split("T")[0];
    const minReturnDate = formData.pickupDate || today;

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError("");
    }, []);

    const handleSearch = useCallback(
        (e) => {
            e.preventDefault();
            const { selectedType, pickupDate, returnDate } = formData;

            if (!pickupDate || !returnDate) {
                setError(!pickupDate ? "Voer ophaaldatum in!" : "Voer retourdatum in!");
                return;
            }

            const pickupDateTime = new Date(pickupDate);
            const returnDateTime = new Date(returnDate);
            const currentDate = new Date();

            if (pickupDateTime < currentDate.setHours(0, 0, 0, 0)) {
                setError("Ophaaldatum kan niet in het verleden liggen.");
                return;
            }

            if (pickupDateTime >= returnDateTime) {
                setError("Retourdatum moet na ophaaldatum liggen.");
                return;
            }

            const urlParams = new URLSearchParams({
                type: selectedType,
                pickupDate,
                returnDate,
            }).toString();

            router.push(`/search-results?${urlParams}`);
        },
        [formData, router]
    );

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <form
                onSubmit={handleSearch}
                className="max-w-screen-lg mx-auto mt-8 bg-white p-4 sm:p-6 rounded-lg shadow-md"
                aria-label="Vehicle search form"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Vehicle Type Select */}
                    <div className="w-full">
                        <label
                            htmlFor="vehicleType"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Type Voertuig
                        </label>
                        <select
                            id="vehicleType"
                            name="selectedType"
                            onChange={handleInputChange}
                            value={formData.selectedType}
                            className="w-full px-4 py-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            aria-required="true"
                        >
                            <option value="">Selecteer type</option>
                            <option value="Auto">Auto</option>
                            {user?.role !== "medewerker" && (
                                <>
                                    <option value="Camper">Camper</option>
                                    <option value="Caravan">Caravan</option>
                                </>
                            )}
                        </select>
                    </div>

                    {/* Pickup Date Input */}
                    <div className="w-full">
                        <label
                            htmlFor="pickupDate"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Ophaaldatum
                        </label>
                        <input
                            id="pickupDate"
                            type="date"
                            name="pickupDate"
                            value={formData.pickupDate}
                            min={today}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            aria-required="true"
                        />
                    </div>

                    {/* Return Date Input */}
                    <div className="w-full">
                        <label
                            htmlFor="returnDate"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Retourdatum
                        </label>
                        <input
                            id="returnDate"
                            type="date"
                            name="returnDate"
                            value={formData.returnDate}
                            min={minReturnDate}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            aria-required="true"
                        />
                    </div>

                    {/* Search Button */}
                    <div className="w-full flex items-end">
                        <button
                            type="submit"
                            className="w-full px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition 
                                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
                                     disabled:bg-gray-400 disabled:cursor-not-allowed"
                            disabled={
                                !formData.selectedType ||
                                !formData.pickupDate ||
                                !formData.returnDate
                            }
                        >
                            Zoeken
                        </button>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div
                        className="mt-4 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm"
                        role="alert"
                        aria-live="polite"
                    >
                        {error}
                    </div>
                )}
            </form>
        </div>
    );
};

export default SearchBar;
