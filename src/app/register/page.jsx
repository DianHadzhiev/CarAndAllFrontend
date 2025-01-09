"use client";
import { useState } from "react";
import { register } from "../lib/api";
import Register from "../components/Register";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    voorNaam: "",
    achterNaam: "",
    email: "",
    password: "",
    telefoonNummer: "",
    straatHuisnummer: "",
    postcode: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await register(formData);
      setSuccess(true);
      setError("");
      console.log("Registration successful:", result);
      router.push(`/confirm-email?email=${encodeURIComponent(formData.email)}`);
    } catch (err) {
      setSuccess(false);
      setError(err.toString());
      console.error("Registration failed:", err);
    }
  };

  return (
    <Register
      formData={formData}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      error={error}
      success={success}
    />
  );
}