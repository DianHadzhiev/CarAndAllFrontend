"use client";

import React, { useState } from "react";
import Papa from "papaparse";

const PersonalRegister = () => {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        email: "",
        phoneNumber: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Write user data to personal_users.csv
        const newData = [
            {
                Name: formData.name,
                Address: formData.address,
                Email: formData.email,
                "Phone Number": formData.phoneNumber,
                Password: formData.password, // Hashing logic should be added
            },
        ];

        const csvString = Papa.unparse(newData);
        console.log(csvString); // Save the CSV data (Mocked for now)

        alert("Personal account registered successfully!");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register as Personal User</h2>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
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
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
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
            <button type="submit">Register</button>
        </form>
    );
};

export default PersonalRegister;
