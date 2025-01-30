import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const VehicleReturn = () => {
    const [activeBookings, setActiveBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [damageReport, setDamageReport] = useState({
        heeftSchade: false,
        beschrijving: ''
    });
    const [submitStatus, setSubmitStatus] = useState({ success: false, message: null });
    const { apiClient } = useAuth();

    useEffect(() => {
        fetchActiveBookings();
    }, []);

    const fetchActiveBookings = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/api/Booking/getActiveBookingen');
            setActiveBookings(response.data);
        } catch (err) {
            setError('Fout bij het laden van actieve boekingen');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleBookingSelect = (booking) => {
        setSelectedBooking(booking);
        setDamageReport({
            heeftSchade: false,
            beschrijving: ''
        });
        setSubmitStatus({ success: false, message: null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedBooking) return;

        try {
            setLoading(true);
            const response = await apiClient.post('/api/Booking/Inname', {
                bookingId: selectedBooking.id,
                heeftSchade: damageReport.heeftSchade,
                beschrijving: damageReport.beschrijving
            });

            if (response.status === 200) {
                setSubmitStatus({
                    success: true,
                    message: 'Voertuig succesvol ingeleverd'
                });
                fetchActiveBookings(); // Refresh the list
                setSelectedBooking(null);
            }
        } catch (err) {
            setSubmitStatus({
                success: false,
                message: 'Fout bij het verwerken van voertuig inname'
            });
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Vehicle Return Processing</h2>

            {/* Active Bookings List */}
            <div className="grid gap-4">
                {activeBookings.length === 0 ? (
                    <p className="text-gray-600">No active bookings found</p>
                ) : (
                    activeBookings.map((booking) => (
                        <div
                            key={booking.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors
                                ${selectedBooking?.id === booking.id
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'hover:border-gray-400'}`}
                            onClick={() => handleBookingSelect(booking)}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-medium">Booking ID: {booking.id}</p>
                                    <p className="text-sm text-gray-600">Vehicle ID: {booking.carId}</p>
                                    <p className="text-sm text-gray-600">
                                        Inleverdatum: {new Date(booking.einde).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Return Form */}
            {selectedBooking && (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4 bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Verwerk Inname</h3>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="damageCheck"
                                checked={damageReport.heeftSchade}
                                onChange={(e) => setDamageReport(prev => ({
                                    ...prev,
                                    heeftSchade: e.target.checked
                                }))}
                                className="h-4 w-4 text-blue-600"
                            />
                            <label htmlFor="damageCheck" className="text-sm font-medium">
                                Schade gemeld

                            </label>
                        </div>

                        {damageReport.heeftSchade && (
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Schade beschrijving
                                </label>
                                <textarea
                                    value={damageReport?.beschrijving}
                                    onChange={(e) => setDamageReport(prev => ({
                                        ...prev,
                                        beschrijving: e.target.value
                                    }))}
                                    className="w-full p-2 border rounded-md"
                                    rows="3"
                                ></textarea>
                            </div>
                        )}
                    </div>

                    {submitStatus.message && (
                        <div className={`p-4 rounded-md ${submitStatus.success
                            ? 'bg-green-50 text-green-700'
                            : 'bg-red-50 text-red-700'
                            }`}>
                            {submitStatus.success ? (
                                <div className="flex items-center">
                                    <CheckCircle className="w-5 h-5 mr-2" />
                                    {submitStatus.message}
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <AlertTriangle className="w-5 h-5 mr-2" />
                                    {submitStatus.message}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-4 py-2 rounded-md text-white
                                ${loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'}`}
                        >
                            {loading ? 'Processing...' : 'Process Return'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default VehicleReturn;