import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PaymentFormWrapper from './PaymentForm';
import { useAuth } from '../context/AuthContext';

export default function VehicleDetail({ vehicle, pickupDate, returnDate }) {
    const [showPayment, setShowPayment] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { apiClient, user } = useAuth();

    const calculateTotalAmount = () => {
        const start = new Date(pickupDate);
        const end = new Date(returnDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        return days * vehicle.prijsPerDag;
    };

    const handlePaymentSuccess = async (paymentIntent) => {
        try {
            setLoading(true);
            
            // Create the booking after successful payment
            const bookingData = {
                IdVoertuig: vehicle.id,
                HuurderId: user.userId,  // Make sure this matches your user ID field
                Start: pickupDate,
                Einde: returnDate
            };

            // Submit the booking
            const bookingResponse = await apiClient.post('/api/Booking/AanvraagIndienen', bookingData);

            if (bookingResponse.status === 200 || bookingResponse.status === 201) {
                // Redirect to confirmation page with both payment and booking info
                router.push(`/booking-confirmation?paymentId=${paymentIntent.id}&bookingId=${bookingResponse.data.id}`);
            } else {
                throw new Error('Failed to create booking');
            }
        } catch (err) {
            console.error('Booking error:', err);
            setError('Failed to complete booking. Please contact support with your payment ID: ' + paymentIntent.id);
        } finally {
            setLoading(false);
        }
    };

    const getDefaultImage = (category) => {
        const lowerCategory = category?.toLowerCase() || '';
        if (lowerCategory.includes('auto')) return '/images/car.png';
        if (lowerCategory.includes('caravan')) return '/images/caravan.png';
        if (lowerCategory.includes('camper')) return '/images/camper.png';
        return '/images/car.png';
    };

    return (
        <div className="max-w-screen-lg mx-auto mt-8 p-4">
            <div className="bg-white shadow rounded-lg overflow-hidden">
                {/* Vehicle Image */}
                <div className="relative h-64 w-full">
                    <Image
                        src={getDefaultImage(vehicle?.categorie)}
                        alt={`${vehicle?.merk || ''} ${vehicle?.model || ''}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </div>

                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-6">{vehicle?.merk} {vehicle?.model}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Vehicle Details */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Vehicle Details</h2>
                            <div className="space-y-3">
                                <p><strong>Type:</strong> {vehicle?.categorie}</p>
                                <p><strong>Brand:</strong> {vehicle?.merk}</p>
                                <p><strong>Model:</strong> {vehicle?.model}</p>
                                <p><strong>License Plate:</strong> {vehicle?.kenteken}</p>
                                <p><strong>Color:</strong> {vehicle?.kleur}</p>
                                <p><strong>Year:</strong> {vehicle?.bouwjaar}</p>
                                <p className="text-xl font-semibold text-blue-600">
                                    €{vehicle?.prijsPerDag}/day
                                </p>
                            </div>
                        </div>

                        {/* Rental Period and Payment */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Rental Period</h2>
                            <div className="space-y-3">
                                <p><strong>Pickup:</strong> {new Date(pickupDate).toLocaleDateString()}</p>
                                <p><strong>Return:</strong> {new Date(returnDate).toLocaleDateString()}</p>
                                <p className="text-lg font-semibold">
                                    Total Amount: €{calculateTotalAmount().toFixed(2)}
                                </p>
                            </div>

                            {error && (
                                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                    {error}
                                </div>
                            )}

                            {!showPayment ? (
                                <button
                                    onClick={() => setShowPayment(true)}
                                    disabled={loading}
                                    className="mt-4 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    Proceed to Payment
                                </button>
                            ) : (
                                <div className="mt-4">
                                    <PaymentFormWrapper
                                        amount={calculateTotalAmount()}
                                        onSuccess={handlePaymentSuccess}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}