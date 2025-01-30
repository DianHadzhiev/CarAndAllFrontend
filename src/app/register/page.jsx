'use client'
import { useState } from "react";
import { register } from "../lib/api";
import { useRouter } from "next/navigation";
import Register from "../components/Register";

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
    // Business fields
    bedrijfnaam: "",
    kvk: "",
    bedrijfTelefoonNummer: "",
    bedrijfStraatHuisnummer: "",
    bedrijfPostcode: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (activeTab === "personal") {
        const result = await register(null, {
          voorNaam: formData.voorNaam,
          achterNaam: formData.achterNaam,
          email: formData.email,
          password: formData.password,
          telefoonNummer: formData.telefoonNummer,
          straatHuisnummer: formData.straatHuisnummer,
          postcode: formData.postcode
        });
        
        setSuccess(true);
        setError("");
        router.push(`/confirm-email?email=${encodeURIComponent(formData.email)}`);
      } else {
        const userDto = {
          voorNaam: formData.voorNaam,
          achterNaam: formData.achterNaam,
          email: formData.email,
          password: formData.password,
          kvk: formData.kvk,
          straatHuisnummer: formData.straatHuisnummer,
          postcode: formData.postcode  
        };
  
        const bedrijfDto = {
          bedrijfnaam: formData.bedrijfnaam,
          kvk: formData.kvk,
          bedrijfTelefoonNummer: formData.bedrijfTelefoonNummer,
          bedrijfStraatHuisnummer: formData.bedrijfStraatHuisnummer,
          bedrijfPostcode: formData.bedrijfPostcode
        };
  
        const result = await register(null, userDto, bedrijfDto);
        
        setSuccess(true);
        setError("");
        router.push(`/confirm-email?email=${encodeURIComponent(formData.email)}`);
      }
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