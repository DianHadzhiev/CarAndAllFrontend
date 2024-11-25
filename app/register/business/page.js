"use client";

import React, { useState } from "react";

export default function BusinessRegisterPage() {
    const [formData, setFormData] = useState({
        companyName: "",
        kvkNumber: "",
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Registering business:", formData);
        // Redirect to login or dashboard upon successful registration
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Business Registration</h1>
            <form style={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    style={styles.input}
                    required
                />
                <input
                    type="text"
                    placeholder="KVK Number"
                    value={formData.kvkNumber}
                    onChange={(e) => setFormData({ ...formData, kvkNumber: e.target.value })}
                    style={styles.input}
                    required
                />
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
                    Register
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
