"use client";

import React, { useState } from "react";
import Register from "../components/Register";

export default function RegisterPage() {
    const [activeTab, setActiveTab] = useState("personal");
    const [formData, setFormData] = useState(
        activeTab === "personal"
            ? { name: "", email: "", password: "", phone: "" }
            : { companyName: "", kvkNumber: "", email: "", password: "" }
    );
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <Register formData={formData} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        setFormData={setFormData} 
        handleSubmit={handleSubmit} 
        error={error} 
        success={success} />
    );
}
