// src/app/booking-confirmation/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('paymentId');
  const router = useRouter();

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <div className="bg-white rounded-lg shadow-md p-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Booking Confirmed!</h1>
        <p className="text-gray-600 mb-6">
          Your payment has been processed successfully and your booking is confirmed.
        </p>
        <p className="text-gray-500 mb-4">Payment ID: {paymentId}</p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}