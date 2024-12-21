import VehicelDetail from "../../components/VehicleDetail";
import { cookies } from "next/headers";
import axios from "axios";

export default async function VehicleDetailPage({ params, searchParams}) {

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    
    const searchParamsObj = new URLSearchParams(await searchParams);
    const paramsObj = await params;

    const type = searchParamsObj.get('type') || '';
    const pickupDate = searchParamsObj.get('pickupDate') || '';
    const returnDate = searchParamsObj.get('returnDate') || '';
    const vehicleId = paramsObj.vehicleId || '';

    if (!vehicleId || !type || !pickupDate || !returnDate) {
        return (
          <div className="max-w-screen-lg mx-auto mt-8 p-4">
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
              Missing required parameters
            </div>
          </div>
        );
    }

    try {
      const response = await axios.get(`http://localhost:5279/api/Voertuig`, {
        params: {
          id: vehicleId,  
          pickupDate: pickupDate,
          returnDate: returnDate,
          type: type
        },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      return (
        <VehicleDetail
          vehicle={response.data}
          pickupDate={pickupDate}
          returnDate={returnDate}
        />
      );

    } catch (error) {
        console.error("API Error:", error.response?.status, error.response?.data);
    
        const errorMessage =
          error.response?.status === 404
            ? "Vehicle not found. It may have been removed or is no longer available."
            : "Error loading vehicle details. Please try again later.";
    
        return (
          <div className="max-w-screen-lg mx-auto mt-8 p-4">
            <div
              className={`${
                error.response?.status === 404
                  ? "bg-yellow-50 border-yellow-200 text-yellow-700"
                  : "bg-red-50 border-red-200 text-red-700"
              } px-4 py-3 rounded`}
            >
              {errorMessage}
            </div>
          </div>
        );
    }
}

