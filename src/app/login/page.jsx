"use client";

import React, { useState } from "react";
import {useRouter} from "next/navigation";
import Login from "../components/Login";
import axios from "axios";
import { useAuth } from "@/src/context/AuthContext";

export default function LoginPage() {
    const [activeTab, setActiveTab] = useState("personal");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const router = useRouter();
    const {login} = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        let url = activeTab == "personal" ?
        'http://localhost:5279/api/Login/login' 
        : 'http://localhost:5279/api/Login/loginBedrijf'

        try {
            const response = await axios.post(url,
                {Email: formData.email, Password: formData.password},
                {withCredentials: true, 
                headers: {
                    "Content-Type" : 'application/json'
                }
            });
            console.log('Full Response:', response);
            console.log('Response Data:', response.data);
              
            if (response.status !== 200){
                throw new Error(response.data.Message || "Login failed")
            };

            login();
            router.push("/")
        } catch(err){
            setError(err.message || 'error bij inloggen');
        };
    };

    return (
        <Login handleLogin = {handleLogin}
        activeTab = {activeTab} 
        formData = {formData} 
        error = {error}
        setActiveTab = {setActiveTab} 
        setFormData = {setFormData} />
    );

}
