import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, Car } from 'lucide-react';

export default function ActiveBookings() {
  const [activeBookings, setActiveBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { apiClient } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Instead of fetch, use apiClient (which likely handles authentication / tokens)
        const response = await apiClient.get('/api/Booking/getActiveBookingen');

        if (response && response.data) {
          // Ensure data is an array
          setActiveBookings(Array.isArray(response.data) ? response.data : []);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching active bookings:', err);
        setError('Er is een fout opgetreden bij het ophalen van de boekingen.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [apiClient]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('nl-NL');
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Actieve Boekingen</h3>
      <div className="space-y-4">
        {activeBookings.map((booking) => (
          <div key={booking.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <Car className="w-5 h-5 text-blue-500" />
                <span className="font-semibold">
                  {/* Display both merk and model if available */}
                  {booking.vehicle
                    ? `${booking.vehicle.merk || ''} ${booking.vehicle.model || ''}`.trim() 
                    : 'Voertuig niet gevonden'}
                </span>
              </div>
              <div className="text-gray-500 text-sm">Booking ID: {booking.id}</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 mb-1">Huurder:</p>
                <p className="font-medium">
                  {booking.user
                    ? `${booking.user.voornaam} ${booking.user.achternaam}`
                    : 'Gebruiker niet gevonden'}
                </p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Periode:</p>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>
                    {formatDate(booking.start)} - {formatDate(booking.einde)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
