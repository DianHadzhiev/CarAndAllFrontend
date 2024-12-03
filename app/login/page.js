//app/login/page.js
"use client";

import React, { useState } from "react";
import Papa from "papaparse";
import {useRouter} from "next/navigation";

export default function LoginPage() {
    const [activeTab, setActiveTab] = useState("personal");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        const csvFile = activeTab === "personal" ? "/personal_accounts.csv" : "/business_accounts.csv";

        Papa.parse(csvFile, {
            download: true,
            header: true,
            complete: (results) => {
                const accounts = results.data;
                const user = accounts.find(
                    (account) =>
                        account.Email === formData.email && account.Password === formData.password
                );
                if (user) {
                    router.push("/CarAndAll");
                } else {
                    setError("Invalid email or password.");
                }
            },
        });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-blue-500">
            <div className="w-full max-w-md bg-white rounded shadow-md">
                <div className="flex border-b">
                    <button
                        onClick={() => setActiveTab("personal")}
                        className={`flex-1 p-4 text-center ${
                            activeTab === "personal"
                                ? "bg-blue-700 text-white"
                                : "bg-gray-100 text-gray-600"
                        }`}
                    >
                        Personal
                    </button>
                    <button
                        onClick={() => setActiveTab("business")}
                        className={`flex-1 p-4 text-center ${
                            activeTab === "business"
                                ? "bg-blue-700 text-white"
                                : "bg-gray-100 text-gray-600"
                        }`}
                    >
                        Business
                    </button>
                </div>
                <form className="p-6" onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full mb-4 px-4 py-2 border rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full mb-4 px-4 py-2 border rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
                    >
                        Login
                    </button>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </form>
            </div>
        </div>
    );
}
