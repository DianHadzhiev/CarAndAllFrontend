/*//CarAndAll/page.js
import SearchBar from "../components/SearchBar";

export default function Home() {
    return (
        <div>
            <h1>Kies uw Voertuig</h1>
            <SearchBar />
        </div>
    );
}*/
import SearchBar from "../components/SearchBar.js";

export default function Home() {
    return (
        <div className="min-h-screen bg-blue-500">
            <h1 className="text-white text-center text-3xl font-bold py-8">Kies uw Voertuig</h1>
            <SearchBar />
        </div>
    );
}
