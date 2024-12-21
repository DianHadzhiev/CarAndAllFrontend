
import SearchBar from "./components/SearchBar";
import { cookies } from "next/headers.js";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";


export default function Home() {
    
    return (
        <div className="min-h-screen">
            <h1 className="text-black text-center text-3xl font-bold py-8">Kies uw Voertuig</h1>
            <SearchBar/>
        </div>
    );
}



