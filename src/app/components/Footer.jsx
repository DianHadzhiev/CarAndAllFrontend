'use client';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-100" role="contentinfo" aria-label="Site footer">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Contact Information */}
                    <div>
                        <h3 id="contact-heading" className="text-lg font-semibold mb-4">Contact</h3>
                        <ul className="space-y-3" aria-labelledby="contact-heading">
                            <li>
                                <a 
                                    href="tel:+31701234567" 
                                    className="flex items-center gap-2 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded p-1"
                                    aria-label="Call us at +31 (0)70 123 4567"
                                >
                                    <Phone className="w-5 h-5" aria-hidden="true" />
                                    <span>+31 (0)70 123 4567</span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="mailto:info@carandall.nl" 
                                    className="flex items-center gap-2 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded p-1"
                                    aria-label="Email us at info@carandall.nl"
                                >
                                    <Mail className="w-5 h-5" aria-hidden="true" />
                                    <span>info@carandall.nl</span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="https://maps.google.com/?q=Hoofdstraat+1+2511+AA+Den+Haag" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded p-1"
                                    aria-label="Find us at Hoofdstraat 1, 2511 AA Den Haag. Opens in new tab"
                                >
                                    <MapPin className="w-5 h-5" aria-hidden="true" />
                                    <span>Hoofdstraat 1, 2511 AA Den Haag</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <nav aria-labelledby="quick-links-heading">
                        <h3 id="quick-links-heading" className="text-lg font-semibold mb-4">Snelle Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link 
                                    href="/login" 
                                    className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded p-1 inline-block"
                                >
                                    Inloggen
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/register" 
                                    className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded p-1 inline-block"
                                >
                                    Registreren
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/search-results" 
                                    className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded p-1 inline-block"
                                >
                                    Voertuigen
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/account" 
                                    className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded p-1 inline-block"
                                >
                                    Mijn Account
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Services */}
                    <div>
                        <h3 id="services-heading" className="text-lg font-semibold mb-4">Diensten</h3>
                        <ul className="space-y-2" aria-labelledby="services-heading">
                            <li>Auto Verhuur</li>
                            <li>Camper Verhuur</li>
                            <li>Caravan Verhuur</li>
                            <li>Zakelijke Verhuur</li>
                        </ul>
                    </div>

                    {/* Opening Hours */}
                    <div>
                        <h3 id="hours-heading" className="text-lg font-semibold mb-4">Openingstijden</h3>
                        <ul className="space-y-2" aria-labelledby="hours-heading">
                            <li>Maandag - Vrijdag: 08:00 - 18:00</li>
                            <li>Zaterdag: 09:00 - 17:00</li>
                            <li>Zondag: Gesloten</li>
                        </ul>
                        <div 
                            className="mt-4 flex gap-4" 
                            role="list" 
                            aria-label="Social media links"
                        >
                            <a 
                                href="https://facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded p-1"
                                aria-label="Visit our Facebook page. Opens in new tab"
                            >
                                <Facebook className="w-6 h-6" aria-hidden="true" />
                            </a>
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-600 rounded p-1"
                                aria-label="Visit our Instagram page. Opens in new tab"
                            >
                                <Instagram className="w-6 h-6" aria-hidden="true" />
                            </a>
                            <a 
                                href="https://linkedin.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800 rounded p-1"
                                aria-label="Visit our LinkedIn page. Opens in new tab"
                            >
                                <Linkedin className="w-6 h-6" aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p role="contentinfo">&copy; 2024 CarAndAll. Alle rechten voorbehouden.</p>
                        <nav aria-label="Legal links">
                            <div className="flex gap-4">
                                <Link 
                                    href="/privacy" 
                                    className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded p-1"
                                >
                                    Privacy Policy
                                </Link>
                                <Link 
                                    href="/terms" 
                                    className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded p-1"
                                >
                                    Algemene Voorwaarden
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
}