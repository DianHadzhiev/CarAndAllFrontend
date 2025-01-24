// components/VehicleDetail.jsx

import Image from 'next/image';

export default function VehicleDetail({ vehicle, pickupDate, returnDate, handleBooking }) {
  const getDefaultImage = (category) => {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('auto')) return '/images/car.png';
    if (lowerCategory.includes('caravan')) return '/images/caravan.png';
    if (lowerCategory.includes('camper')) return '/images/camper.png';
    return '/images/car.png'; // fallback image
  };

  return (
    <div className="max-w-screen-lg mx-auto mt-8 p-4">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="relative h-64 w-full">
          <Image
            src={getDefaultImage(vehicle.categorie)}
            alt={`${vehicle.merk} ${vehicle.model}`}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">{vehicle.merk} {vehicle.model}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Voertuig Details</h2>
              <div className="space-y-3">
                <p><strong>Type:</strong> {vehicle.categorie}</p>
                <p><strong>Merk:</strong> {vehicle.merk}</p>
                <p><strong>Model:</strong> {vehicle.model}</p>
                <p><strong>Kenteken:</strong> {vehicle.kenteken}</p>
                <p><strong>Kleur:</strong> {vehicle.kleur}</p>
                <p><strong>Bouwjaar:</strong> {vehicle.bouwjaar}</p>
                <p className="text-xl font-semibold text-blue-600">
                  €{vehicle.prijsPerDag}/dag
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Huurperiode</h2>
              <div className="space-y-3">
                <p><strong>Ophaaldatum:</strong> {pickupDate}</p>
                <p><strong>Retourdatum:</strong> {returnDate}</p>
              </div>
              <button
                onClick={handleBooking}
                className="mt-8 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
              >
                Doorgaan naar Betaling
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}