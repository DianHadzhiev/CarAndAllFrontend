import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function MedewerkerBeheer() {
  const [medewerkers, setMedewerkers] = useState([]);
  const [email, setEmail] = useState('');
  const { apiClient } = useAuth();

  useEffect(() => {
    loadMedewerkers();
  }, []);

  const loadMedewerkers = async () => {
    try {
      const response = await apiClient.get('/api/User/GetMedewerkers');
      setMedewerkers(response.data);
    } catch (error) {
      console.error('Error loading medewerkers:', error);
    }
  };

  const handleAddMedewerker = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/api/User/AddMedewerker', { email });
      setEmail('');
      loadMedewerkers();
    } catch (error) {
      console.error('Error adding medewerker:', error);
    }
  };

  const handleRemoveMedewerker = async (medewerkerId) => {
    try {
      await apiClient.delete(`/api/User/RemoveMedewerker/${medewerkerId}`);
      loadMedewerkers();
    } catch (error) {
      console.error('Error removing medewerker:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Medewerker Beheer</h2>
      <form onSubmit={handleAddMedewerker} className="mb-4">
        <input
          type="email"
          className="border p-2 mr-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Medewerker email"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Toevoegen
        </button>
      </form>

      <div className="space-y-4">
        {medewerkers.map((medewerker) => (
          <div key={medewerker.id} className="border p-4 rounded">
            <p>Email: {medewerker.email}</p>
            <button
              onClick={() => handleRemoveMedewerker(medewerker.id)}
              className="bg-red-500 text-white px-2 py-1 rounded mt-2"
            >
              Verwijderen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}