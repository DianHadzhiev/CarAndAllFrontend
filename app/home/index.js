"use client";

import React from "react";
import { useRouter } from "next/navigation"; // For navigation

export default function IndexPage() {
    const router = useRouter();

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Welcome to Car Rental</h1>
            <div style={styles.buttonContainer}>
                <button style={styles.button} onClick={() => router.push("/register")}>
                    Register
                </button>
                <button style={styles.button} onClick={() => router.push("/login")}>
                    Login
                </button>
            </div>
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
    buttonContainer: {
        display: "flex",
        gap: "20px",
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
