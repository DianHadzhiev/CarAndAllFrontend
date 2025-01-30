import SearchBar from "./components/SearchBar";
import { ChevronRight, Car, Clock, Users, BookOpen, Building, Shield } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-b from-blue-100 to-white py-12 md:py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4">CarAndAll</h1>
                    <p className="text-lg md:text-xl lg:text-2xl mb-8">Jouw Reis, Onze Prioriteit</p>
                </div>
            </div>

            {/* Search Section */}
            <div className="py-6 md:py-12 px-4 bg-white">
                <h2 className="text-black text-center text-2xl md:text-3xl font-bold mb-6 md:mb-8">
                    Klik Hier Om Uw Voertuig Te Huren
                </h2>
                <SearchBar />
            </div>

            {/* Features Section */}
            <div className="bg-gray-50 py-12 md:py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Waarom Kiest U Voor Ons</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white text-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <Car className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                            <h3 className="text-xl font-semibold mb-2">Diverse Vloot</h3>
                            <p className="text-gray-600">Kies uit ons brede assortiment auto's, campers en caravans</p>
                        </div>
                        <div className="bg-white text-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <Clock className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                            <h3 className="text-xl font-semibold mb-2">24/7 Ondersteuning</h3>
                            <p className="text-gray-600">Ons team staat altijd voor u klaar</p>
                        </div>
                        <div className="bg-white text-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                            <h3 className="text-xl font-semibold mb-2">Zakelijke Oplossingen</h3>
                            <p className="text-gray-600">Speciale plannen en kortingen voor zakelijke klanten</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Vehicle Types Section */}
            <div className="bg-white py-12 md:py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Ons Wagenpark</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-semibold mb-4">Auto's</h3>
                            <p className="text-gray-600 mb-4">Voor particulieren en zakelijke rijders</p>
                            <ul className="text-gray-600 space-y-2">
                                <li className="flex items-center"><span className="mr-2">•</span>Diverse modellen beschikbaar</li>
                                <li className="flex items-center"><span className="mr-2">•</span>Geschikt voor dagelijks gebruik</li>
                                <li className="flex items-center"><span className="mr-2">•</span>Direct online te reserveren</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-semibold mb-4">Campers</h3>
                            <p className="text-gray-600 mb-4">Voor een onvergetelijke vakantie</p>
                            <ul className="text-gray-600 space-y-2">
                                <li className="flex items-center"><span className="mr-2">•</span>Volledig uitgeruste campers</li>
                                <li className="flex items-center"><span className="mr-2">•</span>Verschillende groottes</li>
                                <li className="flex items-center"><span className="mr-2">•</span>Alleen voor particuliere huur</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-semibold mb-4">Caravans</h3>
                            <p className="text-gray-600 mb-4">Voor de vrijheid van het kamperen</p>
                            <ul className="text-gray-600 space-y-2">
                                <li className="flex items-center"><span className="mr-2">•</span>Van compact tot luxueus</li>
                                <li className="flex items-center"><span className="mr-2">•</span>Verschillende indelingen</li>
                                <li className="flex items-center"><span className="mr-2">•</span>Alleen voor particuliere huur</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="bg-gray-50 py-12 md:py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Hoe Werkt Het?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                            <h3 className="font-semibold mb-2">Selecteer</h3>
                            <p className="text-gray-600">Kies uw voertuig en huurperiode</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                            <h3 className="font-semibold mb-2">Aanvraag</h3>
                            <p className="text-gray-600">Vul uw gegevens in</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                            <h3 className="font-semibold mb-2">Bevestiging</h3>
                            <p className="text-gray-600">Wacht op goedkeuring</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                            <h3 className="font-semibold mb-2">Ophalen</h3>
                            <p className="text-gray-600">Ontvang ophaalinstructies</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Abonnement Section */}
            <div className="bg-white py-12 md:py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Zakelijke Abonnementen</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-bold mb-4">Pay As You Go</h3>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center"><span className="mr-2">•</span>Vast maandelijks bedrag</li>
                                <li className="flex items-center"><span className="mr-2">•</span>Procentuele korting op huurbedragen</li>
                                <li className="flex items-center"><span className="mr-2">•</span>Flexibele huurmogelijkheden</li>
                                <li className="flex items-center"><span className="mr-2">•</span>Geschikt voor onregelmatig gebruik</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-bold mb-4">Prepaid Bundel</h3>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center"><span className="mr-2">•</span>Vooraf betaald huurdagen pakket</li>
                                <li className="flex items-center"><span className="mr-2">•</span>Voordeliger bij regelmatig gebruik</li>
                                <li className="flex items-center"><span className="mr-2">•</span>Planbare kosten</li>
                                <li className="flex items-center"><span className="mr-2">•</span>Ideaal voor frequente huurders</li>
                            </ul>
                        </div>
                    </div>
                    <p className="text-center mt-6 text-gray-600">
                        Neem contact op voor meer informatie over onze zakelijke abonnementen
                    </p>
                </div>
            </div>

            {/* Business Features Section */}
            <div className="bg-gray-50 py-12 md:py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Zakelijke Mogelijkheden</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> 
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-semibold mb-4">Voor Wagenparkbeheerders</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center"><span className="mr-2">•</span>Beheer van medewerkers</li>
                                <li className="flex items-center"><span className="mr-2">•</span>Overzicht van alle verhuringen</li>
                                <li className="flex items-center"><span className="mr-2">•</span>Maandelijkse rapportages</li>
                                <li className="flex items-center"><span className="mr-2">•</span>Controle over gebruik</li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-semibold mb-4">Voor Zakelijke Huurders</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center"><span className="mr-2">•</span>Eenvoudig online reserveren</li>
                                <li className="flex items-center"><span className="mr-2">•</span>Zakelijke auto's beschikbaar</li>
                                <li className="flex items-center"><span className="mr-2">•</span>Automatische facturatie</li>
                                <li className="flex items-center"><span className="mr-2">•</span>24/7 ondersteuning</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="bg-white py-12 md:py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Over CarAndAll</h2>
                    <p className="text-gray-700 text-center mb-8">
                        CarAndAll is uw premier bestemming voor voertuigverhuur in Nederland.
                        Wij zijn gespecialiseerd in het aanbieden van hoogwaardige auto's, campers
                        en caravans voor zowel particuliere als zakelijke klanten.
                    </p>
                </div>
            </div>
        </div>
    );
}