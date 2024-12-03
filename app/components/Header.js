/*components/Header.js*/
/*"use client";

import React from "react";
import "./Header.css"; // Import Header-specific styles

const Header = () => {
    return (
        <nav className="header">
            <div className="header-container">
                <h1 className="header-logo">CarAndAll</h1>
                <div className="header-buttons">
                    <button className="header-button">Registreren</button>
                    <button className="header-button">Inloggen</button>
                </div>
            </div>
        </nav>
    );
};

export default Header; */
"use client";

import React from "react";

const Header = () => {
    return (
        <nav className="bg-blue-700 p-4 border-b border-gray-300">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4">
                <h1 className="text-white text-2xl font-semibold">CarAndAll</h1>
                <div className="flex gap-4">
                    <button
                        className="px-4 py-2 bg-white text-blue-700 border border-blue-700 rounded hover:bg-blue-700 hover:text-white transition"
                        onClick={() => window.location.href = "/login"}
                    >
                        Inloggen
                    </button>
                    <button
                        className="px-4 py-2 bg-white text-blue-700 border border-blue-700 rounded hover:bg-blue-700 hover:text-white transition"
                        onClick={() => window.location.href = "/register"}
                    >
                        Registreren
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Header;
