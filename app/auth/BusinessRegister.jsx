"use client";

import React, { useState } from "react";
import Papa from "papaparse";

const BusinessRegister = () => {
    const [formData, setFormData] = useState({
        businessName: "",
        address: "",
        kvkNumber: "",
        email: "",
        password: "",
        subscriptionType: "Pay-As-You-Go",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Write user data to business_users.csv
        const newData = [
            {
                "Business Name": formData.businessName,
                Address: formData.address,
                "KVK Number": formData.kvkNumber,
                Email: formData.email,
                Password: formData.password, // Hashing logic should be added
                "Subscription Type": formData.subscriptionType,
            },
        ];

        const csvString = Papa.unparse(newData);
        console.log(csvString); // Save the CSV data (Mocked for now)

        alert("Business account registered successfully!");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register as Business</h2>
            <input
                type="text"
                name="businessName"
                placeholder="Business Name"
                value={formData.businessName}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="kvkNumber"
                placeholder="KVK Number"
                value={formData.kvkNumber}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <select
                name="subscriptionType"
                value={formData.subscriptionType}
                onChange={handleChange}
            >
                <option value="Pay-As-You-Go">Pay-As-You-Go</option>
                <option value="Prepaid">Prepaid</option>
            </select>
            <button type="submit">Register</button>
        </form>
    );
};

export default BusinessRegister;
