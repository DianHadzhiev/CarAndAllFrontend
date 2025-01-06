import SearchResults from "../components/SearchResults";
import { cookies } from "next/headers";
import axios from "axios";
import { redirect } from "next/navigation";


export default async function SearchResultPage({searchParams}) {

  const {type, pickupDate, returnDate} = await searchParams;

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  async function handleDealClick(vehicleId, vehicleCategorie ) {
    'use server'
    const type = vehicleCategorie.toString();
    const pickupDate = searchParams?.pickupDate || '';
    const returnDate = searchParams?.returnDate || '';
    
    redirect(`/search-results/${vehicleId}?type=${type || ''}&pickupDate=${pickupDate}&returnDate=${returnDate}`);
  }

  let initialResults = [];

  try{
    const response = await axios.get(`http://localhost:5279/api/Voertuig/GetVoertuigen`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: {type: type, pickupDate: pickupDate, returnDate: returnDate}
    });
    initialResults = response.data;
  }catch(error) {
    initialResults = [];
  };

  return (
    <div className="">
      <h1 className="text-xl font-bold mt-8 mb-4"> {initialResults.length} Zoekresultaten</h1>
        <SearchResults initialResults={initialResults}  searchParams={searchParams} handleDealClick={handleDealClick}/>
    </div>
  );
}

