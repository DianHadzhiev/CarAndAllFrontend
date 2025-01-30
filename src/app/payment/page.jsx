'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Elements } from '@stripe/react-stripe-js';
import getStripe from '../lib/stripe';
import PaymentForm from '../components/PaymentForm';
import { fetchVehicle } from '../lib/api';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPaymentDetails = async () => {
      try {
        const vehicleId = searchParams.get('vehicleId');
        const pickupDate = searchParams.get('pickupDate');
        const returnDate = searchParams.get('returnDate');
        const type = searchParams.get('type');

        if (!vehicleId || !pickupDate || !returnDate || !type) {
          throw new Error('Missing required parameters');
        }

        const response = await fetchVehicle(vehicleId, pickupDate, returnDate, type);
        const vehicle = response.data;

        const start = new Date(pickupDate);
        const end = new Date(returnDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const totalAmount = days * vehicle.prijsPerDag;

        setPaymentDetails({
          vehicle,
          pickupDate,
          returnDate,
          days,
          totalAmount
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPaymentDetails();
  }, [searchParams]);

  const handlePaymentSuccess = async (paymentIntentId) => {
    try {
      // You can add additional logic here if needed
      router.push(`/booking-confirmation?paymentId=${paymentIntentId}`);
      return true;
    } catch (error) {
      console.error('Booking confirmation error:', error);
      return false;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!paymentDetails) return <div>No payment details found</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Payment</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{paymentDetails.vehicle.merk} {paymentDetails.vehicle.model}</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-600">Pickup Date</p>
            <p className="font-semibold">{new Date(paymentDetails.pickupDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Return Date</p>
            <p className="font-semibold">{new Date(paymentDetails.returnDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Number of Days</p>
            <p className="font-semibold">{paymentDetails.days}</p>
          </div>
          <div>
            <p className="text-gray-600">Daily Rate</p>
            <p className="font-semibold">€{paymentDetails.vehicle.prijsPerDag}</p>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <p className="text-xl font-bold">Total Amount: €{paymentDetails.totalAmount.toFixed(2)}</p>
        </div>
      </div>

      <Elements stripe={getStripe()}>
        <PaymentForm
          amount={paymentDetails.totalAmount}
          onSuccess={handlePaymentSuccess}
        />
      </Elements>
    </div>
  );
}