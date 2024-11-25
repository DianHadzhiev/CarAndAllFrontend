"use client";

import React, { useState } from "react";

export default function BusinessLoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Logging in business user:", formData);
        // Redirect to home/dashboard upon successful login
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Business Login</h1>
            <form style={styles.form} onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.button}>
                    Login
                </button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
    },
    title: {
        fontSize: "2rem",
        marginBottom: "20px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
    },
    input: {
        padding: "10px",
        width: "300px",
        borderRadius: "5px",
        border: "1px solid #ccc",

    },
    button: {
        padding: "10px 20px",
        fontSize: "1rem",
        color: "white",
        backgroundColor: "#0071c2",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};