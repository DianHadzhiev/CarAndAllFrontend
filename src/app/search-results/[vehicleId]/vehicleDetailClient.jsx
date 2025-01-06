'use client'

import VehicleDetail from "../../components/VehicleDetail";
import { submitHuuraanvraag, fetchVehicle } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";

export default function VehicleDetailClient({ initialVehicle, pickupDate, returnDate }) {
  const { user } = useAuth();
  const [vehicle, setVehicle] = useState(initialVehicle);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const refreshVehicleData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchVehicle(vehicle.id, pickupDate, returnDate, vehicle.categorie);
        setVehicle(response.data);
      } catch (err) {
        setError(err.message || 'Failed to refresh vehicle data');
      } finally {
        setIsLoading(false);
      }
    };

    refreshVehicleData();
  }, [vehicle.id, pickupDate, returnDate, vehicle.categorie]);

  const handleBooking = async () => {
    if (!user) {
      setError('You must be logged in to book a vehicle');
      return;
    }
    try {
      await submitHuuraanvraag(vehicle.id, user.userId, user.email, pickupDate, returnDate);
      
    } catch (err) {
      setError(err.message || 'Booking failed');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <VehicleDetail
      vehicle={vehicle}
      pickupDate={pickupDate}
      returnDate={returnDate}
      handleBooking={handleBooking}
    />
  );
}
