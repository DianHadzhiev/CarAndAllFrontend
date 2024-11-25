"use client";

import React, { useState } from "react";
import Papa from "papaparse";
import { useRouter } from "next/navigation";

export default function PersonalLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = () => {
        Papa.parse("/personal_accounts.csv", {
            download: true,
            header: true,
            complete: (results) => {
                const accounts = results.data;
                const matchedUser = accounts.find(
                    (user) => user.Email === email && user.Password === password
                );

                if (matchedUser) {
                    router.push("/home"); // Redirect to search page
                } else {
                    setError("Invalid email or password.");
                }
            },
        });
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Personal Login</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
            />
            <button style={styles.button} onClick={handleLogin}>
                Login
            </button>
            {error && <p style={styles.error}>{error}</p>}
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
        textAlign: "center",
        backgroundColor: "#f4f4f4",
    },
    title: {
        fontSize: "2rem",
        marginBottom: "20px",
    },
    input: {
        padding: "10px",
        marginBottom: "10px",
        width: "300px",
        fontSize: "1rem",
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
    error: {
        color: "red",
        marginTop: "10px",
    },
};
