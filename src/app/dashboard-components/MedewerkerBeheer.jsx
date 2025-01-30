



'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Trash2, Mail } from 'lucide-react';

export default function MedewerkerBeheer() {
  const [formData, setFormData] = useState({
    voorNaam: '',
    achterNaam: '',
    email: '',
  });
  const [medewerkers, setMedewerkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { apiClient } = useAuth();

  const loadMedewerkers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/api/User/GetMedewerkersObjectBijbedrijf');
      if (response.data) {
        setMedewerkers(response.data);
      }
    } catch (err) {
      console.error('Error loading employees:', err);
      setError(err.response?.data?.message || 'Failed to load employees. Please try again.');
      setMedewerkers([]);  // Reset employees list on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedewerkers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const registerData = {
        VoorNaam: formData.voorNaam,
        Achternaam: formData.achterNaam,
        Email: formData.email,
        Password: "Welcome123!",  // Default password
        TelefoonNummer: "",      // Empty string for optional fields
        StraatHuisnummer: "",
        Postcode: "",
        Kvk: null
      };

      const response = await apiClient.post('/api/Register/Medewerker', registerData);

      if (response.status === 200) {
        setSuccess('Employee added successfully');
        setFormData({
          voorNaam: '',
          achterNaam: '',
          email: '',
        });
        await loadMedewerkers();
      }
    } catch (err) {
      console.error('Error adding employee:', err);
      setError(err.response?.data?.message || 'Failed to add employee. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (medewerkerId) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

    try {
      setLoading(true);
      await apiClient.delete(`/api/Register/DeleteWerknemer?userId=${medewerkerId}`);
      setSuccess('Employee deleted successfully');
      await loadMedewerkers();
    } catch (err) {
      console.error('Error deleting employee:', err);
      setError('Failed to delete employee. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Add New Employee</h3>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="voorNaam"
                value={formData.voorNaam}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="achterNaam"
                value={formData.achterNaam}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={loading}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {loading ? 'Adding...' : 'Add Employee'}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Current Employees</h3>
        
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : medewerkers.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No employees found</div>
        ) : (
          <div className="space-y-4">
            {medewerkers.map((medewerker) => (
              <div
                key={medewerker.id}
                className="flex justify-between items-center p-4 border rounded hover:bg-gray-50"
              >
                <div className="space-y-1">
                  <p className="font-medium">
                    {medewerker.voornaam} {medewerker.achternaam}
                  </p>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{medewerker.emailAddress}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => handleDelete(medewerker.id)}
                  className="p-2 text-red-600 hover:text-red-800 focus:outline-none"
                  title="Delete employee"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}