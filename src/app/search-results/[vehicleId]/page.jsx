
import { fetchVehicle } from "../../lib/api";
import VehicleDetailClient from "./vehicleDetailClient";

export default async function VehicleDetailPage({ params, searchParams }) {
  const { vehicleId } = await params;
  const { type, pickupDate, returnDate } = await searchParams;

  // Validate required parameters
  if (!vehicleId || !type || !pickupDate || !returnDate) {
    throw new Error('Missing required parameters');
  }

  try {
    const response = await fetchVehicle(vehicleId, pickupDate, returnDate, type);
    
    return (
      <VehicleDetailClient 
        initialVehicle={response.data} 
        pickupDate={pickupDate} 
        returnDate={returnDate} 
      />
    );
  } catch (error) {
    if (error.response?.status === 404) {
      
    }
    
    throw error;
  }
}