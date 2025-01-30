
'use client';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-100">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Contact Information */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2">
                                <Phone className="w-5 h-5" />
                                <span>+31 (0)70 123 4567</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-5 h-5" />
                                <span>info@carandall.nl</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                <span>Hoofdstraat 1, 2511 AA Den Haag</span>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Snelle Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/login" className="hover:text-blue-600">Inloggen</Link></li>
                            <li><Link href="/register" className="hover:text-blue-600">Registreren</Link></li>
                            <li><Link href="/search-results" className="hover:text-blue-600">Voertuigen</Link></li>
                            <li><Link href="/account" className="hover:text-blue-600">Mijn Account</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Diensten</h3>
                        <ul className="space-y-2">
                            <li>Auto Verhuur</li>
                            <li>Camper Verhuur</li>
                            <li>Caravan Verhuur</li>
                            <li>Zakelijke Verhuur</li>
                        </ul>
                    </div>

                    {/* Opening Hours */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Openingstijden</h3>
                        <ul className="space-y-2">
                            <li>Maandag - Vrijdag: 08:00 - 18:00</li>
                            <li>Zaterdag: 09:00 - 17:00</li>
                            <li>Zondag: Gesloten</li>
                        </ul>
                        <div className="mt-4 flex gap-4">
                            <Facebook className="w-6 h-6 cursor-pointer hover:text-blue-600" />
                            <Instagram className="w-6 h-6 cursor-pointer hover:text-pink-600" />
                            <Linkedin className="w-6 h-6 cursor-pointer hover:text-blue-800" />
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p>&copy; 2024 CarAndAll. Alle rechten voorbehouden.</p>
                        <div className="flex gap-4">
                            <Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-blue-600">Algemene Voorwaarden</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}