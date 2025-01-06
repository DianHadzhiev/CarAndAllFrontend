export default function VehicleDetail({ vehicle, pickupDate, returnDate, handleBooking}) {
    return (
      <div className="max-w-screen-lg mx-auto mt-8 p-4">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">{vehicle.merk} {vehicle.model}</h1>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="font-semibold">Vehicle Details</h2>
              <p><strong>Type:</strong> {vehicle.categorie}</p>
              <p><strong>Merk:</strong> {vehicle.merk}</p>
              <p><strong>Model:</strong> {vehicle.model}</p>
              <p><strong>Kenteken:</strong> {vehicle.kenteken}</p>
              <p><strong>Kleur:</strong> {vehicle.kleur}</p>
              <p><strong>Bouwjaar:</strong> {vehicle.bouwjaar}</p>
            </div>  
            <div>
              <h2 className="font-semibold">Rental Period</h2>
              <p><strong>Pick-up Date:</strong> {pickupDate}</p>
              <p><strong>Return Date:</strong> {returnDate}</p>
            </div>
            <button onClick={handleBooking}>
              Reserveer nu
            </button>
          </div>
        </div>
      </div>
    );
  }