// src/app/lib/stripe.js
import { loadStripe } from '@stripe/stripe-js';

let stripePromise;
export default function getStripe () {
  if (!stripePromise) {
    stripePromise = loadStripe('pk_test_51QmKlCGL22As3pfWHklioEH6FhyaoWWBQdzj9xjeevR7hqyLsMHT7hDRc4dqR28wqyyJdE9pkq5Ck4nVxHkIPoKm009naWHJdZ');
  }
  return stripePromise;
};
