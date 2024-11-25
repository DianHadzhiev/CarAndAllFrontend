"use client";

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

export default Header;
