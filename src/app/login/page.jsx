"use client";

import React, { useState } from "react";
import Login from "../components/Login";
import { useAuth } from "@/src/app/context/AuthContext";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, error } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({
        email: formData.email,
        password: formData.password,
        type: activeTab
      });
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <Login
      handleLogin={handleLogin}
      activeTab={activeTab}
      formData={formData}
      error={error}
      setActiveTab={setActiveTab}
      setFormData={setFormData}
    />
  );
}