import SearchResults from "../components/SearchResults";
import { cookies } from "next/headers";
import axios from "axios";
import { redirect } from "next/navigation";

export default async function SearchResultPage({searchParams}) {
  // Await the searchParams object
  const params = await searchParams;
  const type = params.type;
  const pickupDate = params.pickupDate;
  const returnDate = params.returnDate;

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  async function handleDealClick(vehicleId, vehicleCategorie) {
    'use server'
    const vehicleType = vehicleCategorie.toString();
    redirect(`/search-results/${vehicleId}?type=${vehicleType}&pickupDate=${pickupDate}&returnDate=${returnDate}`);
  }

  let initialResults = [];

  try {
    const response = await axios.get(`http://localhost:5279/api/Voertuig/GetVoertuigen`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: {
        type,
        pickupDate,
        returnDate
      }
    });
    initialResults = response.data;
  } catch(error) {
    console.error('Error fetching results:', error);
    initialResults = [];
  }

  return (
    <div className="">
      <h1 className="text-xl font-bold mt-8 mb-4">
        {initialResults.length} Zoekresultaten
      </h1>
      <SearchResults 
        initialResults={initialResults}
        searchParams={params}
        handleDealClick={handleDealClick}
      />
    </div>
  );
}