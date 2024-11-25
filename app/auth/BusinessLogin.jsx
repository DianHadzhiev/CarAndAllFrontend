"use client";

import React, { useState } from "react";
import Papa from "papaparse";

const BusinessLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [businessAccounts, setBusinessAccounts] = useState([]);

    // Fetch business accounts from CSV
    React.useEffect(() => {
        Papa.parse("/business_accounts.csv", {
            download: true,
            header: true,
            complete: (result) => {
                setBusinessAccounts(result.data);
            },
        });
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        const account = businessAccounts.find(
            (account) => account.Email === email && account.Password === password
        );

        if (account) {
            alert("Login Successful! Welcome, " + account.BusinessName);
        } else {
            setLoginError("Invalid email or password. Please try again.");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
            <h2>Business Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                    />
                </div>
                <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#007BFF", color: "white", border: "none", cursor: "pointer" }}>
                    Login
                </button>
                {loginError && (
                    <p style={{ color: "red", marginTop: "10px" }}>{loginError}</p>
                )}
            </form>
        </div>
    );
};

export default BusinessLogin;
