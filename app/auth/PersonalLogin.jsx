"use client";

import React, { useState } from "react";
import Papa from "papaparse";

const PersonalLogin = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Read personal_users.csv and validate credentials
        const response = await fetch("/personal_users.csv");
        const text = await response.text();

        const users = Papa.parse(text, { header: true }).data;
        const user = users.find(
            (u) => u.Email === credentials.email && u.Password === credentials.password
        );

        if (user) {
            alert("Login successful!");
        } else {
            alert("Invalid credentials!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login as Personal User</h2>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={credentials.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default PersonalLogin;
