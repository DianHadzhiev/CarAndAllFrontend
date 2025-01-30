


import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';  // Add this import
import { loadStripe } from '@stripe/stripe-js';      // Add this import
import { useAuth } from '../context/AuthContext';

// Initialize Stripe with your public key
const stripePromise = loadStripe('pk_test_51QmKlCGL22As3pfWHklioEH6FhyaoWWBQdzj9xjeevR7hqyLsMHT7hDRc4dqR28wqyyJdE9pkq5Ck4nVxHkIPoKm009naWHJdZ');  

const PaymentForm = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const { apiClient } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const response = await apiClient.post('/api/payment/create-payment-intent', {
        amount: Math.round(amount * 100),
      });

      const { clientSecret } = response.data;

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message);
      } else if (paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError('An error occurred while processing your payment. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <CardElement options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
          hidePostalCode: true
        }} />
      </div>
      
      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}
      
      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full py-3 px-4 rounded-lg text-white font-semibold
          ${processing || !stripe ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
          transition duration-200`}
      >
        {processing ? 'Processing...' : `Pay €${amount.toFixed(2)}`}
      </button>
    </form>
  );
};

const PaymentFormWrapper = ({ amount, onSuccess }) => (
  <Elements stripe={stripePromise}>
    <PaymentForm amount={amount} onSuccess={onSuccess} />
  </Elements>
);

export default PaymentFormWrapper;