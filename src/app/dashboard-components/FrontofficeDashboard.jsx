import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, Check, X } from 'lucide-react';

const FrontofficeDashboard = () => {
    const [activeBookings, setActiveBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [returnForm, setReturnForm] = useState({
        bookingId: '',
        hasDamage: false,
        description: ''
    });
    const { apiClient } = useAuth();

    useEffect(() => {
        loadActiveBookings();
    }, []);

    const loadActiveBookings = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/api/Booking/getActiveBookingen');
            setActiveBookings(response.data);
        } catch (err) {
            setError('Error loading active bookings');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleVehicleReturn = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await apiClient.post('/api/Booking/Inname', {
                bookingId: returnForm.bookingId,
                heeftSchade: returnForm.hasDamage,
                beschrijving: returnForm.description
            });
            
            // Reset form and refresh bookings
            setReturnForm({
                bookingId: '',
                hasDamage: false,
                description: ''
            });
            await loadActiveBookings();
            
        } catch (err) {
            setError('Error processing vehicle return');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Vehicle Return Dashboard</h2>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-center text-red-700">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    {error}
                </div>
            )}

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Process Vehicle Return</h3>
                <form onSubmit={handleVehicleReturn} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Select Booking
                        </label>
                        <select
                            value={returnForm.bookingId}
                            onChange={(e) => setReturnForm(prev => ({ ...prev, bookingId: e.target.value }))}
                            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="">Select a booking</option>
                            {activeBookings.map((booking) => (
                                <option key={booking.id} value={booking.id}>
                                    {`Booking ${booking.id} - ${booking.carId}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={returnForm.hasDamage}
                                onChange={(e) => setReturnForm(prev => ({ ...prev, hasDamage: e.target.checked }))}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Vehicle has damage</span>
                        </label>
                    </div>

                    {returnForm.hasDamage && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Damage Description
                            </label>
                            <textarea
                                value={returnForm.description}
                                onChange={(e) => setReturnForm(prev => ({ ...prev, description: e.target.value }))}
                                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                rows={4}
                                required
                                placeholder="Describe the damage..."
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Processing...' : 'Process Return'}
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Active Bookings</h3>
                <div className="space-y-4">
                    {activeBookings.length === 0 ? (
                        <p className="text-gray-500">No active bookings found</p>
                    ) : (
                        activeBookings.map((booking) => (
                            <div key={booking.id} 
                                 className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium">Booking ID: {booking.id}</p>
                                        <p className="text-sm text-gray-600">Vehicle ID: {booking.carId}</p>
                                        <p className="text-sm text-gray-600">
                                            Start: {new Date(booking.start).toLocaleDateString()}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            End: {new Date(booking.einde).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setReturnForm(prev => ({ ...prev, bookingId: booking.id }))}
                                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                                    >
                                        Process Return
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default FrontofficeDashboard;