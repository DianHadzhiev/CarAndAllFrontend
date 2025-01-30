// src/app/components/BookingsHistory.jsx
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function BookingsHistory() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { apiClient } = useAuth();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get('/api/Booking/bookings');
                setBookings(response.data);
            } catch (err) {
                setError('Error loading booking history');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Huurgeschiedenis</h3>
            <div className="space-y-4">
                {bookings.length === 0 ? (
                    <p className="text-gray-500">Geen boekingen gevonden</p>
                ) : (
                    bookings.map((booking) => (
                        <div key={booking.id} className="bg-white p-4 rounded-lg shadow border">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="font-medium">Boeking ID: {booking.id}</p>
                                    <p>Start: {new Date(booking.start).toLocaleDateString()}</p>
                                    <p>Einde: {new Date(booking.einde).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p>Voertuig ID: {booking.carId}</p>
                                    <p className="mt-2">
                                        Status: <span className="font-medium">{booking.status}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}