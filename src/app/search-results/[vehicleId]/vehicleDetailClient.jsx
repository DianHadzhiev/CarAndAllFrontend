'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { submitHuuraanvraag, fetchVehicle } from '../../lib/api';
import Image from 'next/image';

// VehicleDetail component
function VehicleDetail({ 
  vehicle, 
  pickupDate, 
  returnDate, 
  totalAmount, 
  handleReserveren, 
  isLoading, 
  error 
}) {
  const getDefaultImage = (category) => {
    const lowerCategory = category?.toLowerCase() || '';
    if (lowerCategory.includes('auto')) return '/images/car.png';
    if (lowerCategory.includes('caravan')) return '/images/caravan.png';
    if (lowerCategory.includes('camper')) return '/images/camper.png';
    return '/images/car.png';
  };

  const start = new Date(pickupDate);
  const end = new Date(returnDate);
  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

  return (
    <div className="max-w-screen-lg mx-auto mt-8 p-4">
      <div className="bg-white shadow rounded-lg overflow-hidden">
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
            <div>
              <h2 className="text-xl font-semibold mb-4">Rental Period</h2>
              <div className="space-y-3">
                <p><strong>Pickup:</strong> {new Date(pickupDate).toLocaleDateString()}</p>
                <p><strong>Return:</strong> {new Date(returnDate).toLocaleDateString()}</p>
                <p><strong>Total Days:</strong> {days}</p>
                <p><strong>Total Price:</strong> €{totalAmount.toFixed(2)}</p>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              <button
                onClick={handleReserveren}
                disabled={isLoading}
                className={`mt-8 w-full px-6 py-3 bg-blue-600 text-white rounded-lg 
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'} 
                  transition duration-300 font-semibold`}
              >
                {isLoading ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// VehicleDetailClient component
export default function VehicleDetailClient({ initialVehicle, pickupDate, returnDate }) {
  const router = useRouter();
  const { user } = useAuth();
  const [vehicle, setVehicle] = React.useState(initialVehicle);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const calculateTotalAmount = () => {
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return days * vehicle.prijsPerDag;
  };

  const handleReserveren = () => {
    const params = new URLSearchParams({
      vehicleId: vehicle.id,
      pickupDate: pickupDate,
      returnDate: returnDate,
      type: vehicle.categorie,
    });
    router.push(`/payment?${params.toString()}`);
  };

  const handleBookingAfterPayment = async (paymentIntentId) => {
    if (!user) {
      setError('You must be logged in to book a vehicle');
      return false;
    }

    try {
      setIsLoading(true);
      // Use the existing booking submission logic
      const response = await submitHuuraanvraag(
        vehicle.id, 
        user.userId, 
        user.email, 
        pickupDate, 
        returnDate
      );

      // Redirect to confirmation page
      router.push(`/booking-confirmation?paymentId=${paymentIntentId}`);
      
      return true;
    } catch (err) {
      console.error('Booking error:', err);
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VehicleDetail
      vehicle={vehicle}
      pickupDate={pickupDate}
      returnDate={returnDate}
      totalAmount={calculateTotalAmount()}
      handleReserveren={handleReserveren}
      isLoading={isLoading}
      error={error}
    />
  );
}