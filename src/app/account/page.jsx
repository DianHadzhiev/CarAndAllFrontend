'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Roles from '../account/Roles';
import { useRouter } from 'next/navigation';

import UserEditForm from '../dashboard-components/UserEditForm';
import FrontofficeVehicleList from '../dashboard-components/FrontofficeVehicleList';
import AbonnementMedewerkerBeheer from '../dashboard-components/AbonnementMedewerkerBeheer';
import WagenparkBeheer from '../dashboard-components/WagenparkBeheer';
import BedrijfsAbonnementBehandeling from '../dashboard-components/BedrijfsAbonnementBehandeling';
import BookingsHistory from '../dashboard-components/BookingsHistory';
import ActiveBookings from '../dashboard-components/ActiveBookings';
import SubscriptionCheckout from '../components/SubscriptionCheckout';
import MedewerkerBeheer from '../dashboard-components/MedewerkerBeheer';
import VehicleReturn from '../dashboard-components/VehicleReturn';
import FrontofficeDashboard from '../dashboard-components/FrontofficeDashboard';


export default function AccountPage() {
    const [dashboardData, setDashboardData] = useState(null);
    const [bookingHistory, setBookingHistory] = useState([]);
    const [userData, setUserData] = useState(null);
    const [abonnementData, setAbonnementData] = useState(null);
    const [medewerkers, setMedewerkers] = useState([]);
    const [gehuurdeVoertuigen, setGehuurdeVoertuigen] = useState([]);
    const [businessData, setBusinessData] = useState(null);
    const [abonnementRequests, setAbonnementRequests] = useState([]);
    const [voertuigen, setVoertuigen] = useState([]);
    const [schadeClaims, setSchadeClaims] = useState([]);
    const [activeBookings, setActiveBookings] = useState([]);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isLoadingRentalHistory, setIsLoadingRentalHistory] = useState(false);
    const [rentalHistoryError, setRentalHistoryError] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [newMedewerkerEmail, setNewMedewerkerEmail] = useState('');
    const [abonnementType, setAbonnementType] = useState('');
    const [abonnementDuur, setAbonnementDuur] = useState(12);
    const [notifications, setNotifications] = useState([]);


    const { user, apiClient } = useAuth();
    const [abonnementAanvragen, setAbonnementAanvragen] = useState([]);
    const [rentalHistory, setRentalHistory] = useState([]);
    const [lastNotificationCheck, setLastNotificationCheck] = useState(new Date());

    // Dashboard Data
    useEffect(() => {
        if (activeTab === 'dashboard') {
            const fetchDashboardData = async () => {
                try {
                    const response = await apiClient.get('/api/auth/AuthMe');
                    setDashboardData(response.data);
                } catch (error) {
                    console.error('Error fetching dashboard data:', error);
                }
            };
            fetchDashboardData();
        }
    }, [activeTab]);

    // Booking History (for particulier)
    useEffect(() => {
        if (activeTab === 'huurgeschiedenis') {
            const fetchBookingHistory = async () => {
                try {
                    const response = await apiClient.get('/api/Booking/bookings');
                    setBookingHistory(response.data);
                } catch (error) {
                    console.error('Error fetching booking history:', error);
                }
            };
            fetchBookingHistory();
        }
    }, [activeTab, user?.role]);

    // User Data
    useEffect(() => {
        if (activeTab === 'persoonlijke-info') {
            const fetchUserData = async () => {
                try {
                    const response = await apiClient.get(`/api/User/GetUserData?email=${user.email}`);
                    setUserData(response.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
            fetchUserData();
        }
    }, [activeTab, user?.email]);

    // Abonnement Data
    useEffect(() => {
        if (activeTab === 'abonnementsbeheer') {
            const fetchAbonnementData = async () => {
                try {
                    const response = await apiClient.get('/api/Abonnement/beschikbare-abonnementen');
                    setAbonnementData(response.data);
                } catch (error) {
                    console.error('Error fetching abonnement data:', error);
                }
            };
            fetchAbonnementData();
        }
    }, [activeTab]);

    // Medewerkers Data
    useEffect(() => {
        if (activeTab === 'medewerkerbeheer') {
            const fetchMedewerkers = async () => {
                try {
                    const response = await apiClient.get('/api/User/GetMedewerkersObjectBijbedrijf');
                    setMedewerkers(response.data);
                } catch (error) {
                    console.error('Error fetching medewerkers:', error);
                }
            };
            fetchMedewerkers();
        }
    }, [activeTab]);

    // Gehuurde Voertuigen
    useEffect(() => {
        if (activeTab === 'gehuurde-voertuigen') {
            const fetchGehuurdeVoertuigen = async () => {
                try {
                    const response = await apiClient.get('/api/Booking/GetBookingsyByBedrijf');
                    setGehuurdeVoertuigen(response.data);
                } catch (error) {
                    console.error('Error fetching gehuurde voertuigen:', error);
                }
            };
            fetchGehuurdeVoertuigen();
        }
    }, [activeTab]);

    // Business Data
    useEffect(() => {
        if (activeTab === 'bedrijfsinfo') {
            const fetchBusinessData = async () => {
                try {
                    const response = await apiClient.get('/api/User/GetBusinessData');
                    setBusinessData(response.data);
                } catch (error) {
                    console.error('Error fetching business data:', error);
                }
            };
            fetchBusinessData();
        }
    }, [activeTab]);

    // Abonnement Requests
    useEffect(() => {
        if (activeTab === 'abonnementsgoedkeuringen') {
            const fetchAbonnementRequests = async () => {
                try {
                    const response = await apiClient.get('/api/Abonnement/check-abonnement-status');
                    setAbonnementRequests(response.data);
                } catch (error) {
                    console.error('Error fetching abonnement requests:', error);
                }
            };
            fetchAbonnementRequests();
        }
    }, [activeTab]);

    // Voertuigen
    useEffect(() => {
        if (activeTab === 'voertuigbeheer') {
            const fetchVoertuigen = async () => {
                try {
                    const response = await apiClient.get('/api/Voertuig/GetVoertuigen');
                    setVoertuigen(response.data);
                } catch (error) {
                    console.error('Error fetching voertuigen:', error);
                }
            };
            fetchVoertuigen();
        }
    }, [activeTab]);

    // Schade Claims
    // useEffect(() => {
    //     if (activeTab === 'schadeclaims') {
    //         const fetchSchadeClaims = async () => {
    //             try {
    //                 // Assuming you'll create this endpoint
    //                 const response = await apiClient.get('/api/Schade/GetSchadeClaims');
    //                 setSchadeClaims(response.data);
    //             } catch (error) {
    //                 console.error('Error fetching schade claims:', error);
    //             }
    //         };
    //         fetchSchadeClaims();
    //     }
    // }, [activeTab]);
    useEffect(() => {
        if (activeTab === 'schadeclaims') {
            const fetchSchadeClaims = async () => {
                try {
                    const response = await apiClient.get('/api/Schade/claims');
                    setSchadeClaims(response.data);
                } catch (error) {
                    console.error('Error fetching schade claims:', error);
                }
            };
            fetchSchadeClaims();
        }
    }, [activeTab]);

    // Active Bookings
    useEffect(() => {
        if (activeTab === 'verhuuroverzicht') {
            const fetchActiveBookings = async () => {
                try {
                    const response = await apiClient.get('/api/Booking/getActiveBookingen');
                    setActiveBookings(response.data);
                } catch (error) {
                    console.error('Error fetching active bookings:', error);
                }
            };
            fetchActiveBookings();
        }
    }, [activeTab]);

    const handleAddMedewerker = async (medewerkerData) => {
        try {
            await apiClient.post('/api/Abonnement/AddWerknemerToAbonnement', medewerkerData);
            const updatedMedewerkers = await apiClient.get('/api/User/GetMedewerkersObjectBijbedrijf');
            setMedewerkers(updatedMedewerkers.data);
        } catch (error) {
            console.error('Error adding medewerker:', error);
        }
    };

    const handleAbonnementAanvraag = async (abonnementData) => {
        try {
            const response = await apiClient.post('/api/Abonnement/create-bedrijfsabonnementAanvraag', abonnementData);
            const updatedAbonnementen = await apiClient.get('/api/Abonnement/beschikbare-abonnementen');
            setAbonnementData(updatedAbonnementen.data);
        } catch (error) {
            console.error('Error submitting abonnement aanvraag:', error);
        }
    };

    const handleApproveOrReject = async (aanvraagId, isApproved) => {
        try {
            await apiClient.put('/api/Abonnement/wijzigingKeuren', {
                id: aanvraagId,
                Goedgekeurd: isApproved,
                userId: user.id
            });

            // Refresh the list after approval/rejection
            const response = await apiClient.get('/api/Abonnement/check-abonnement-status');
            setAbonnementRequests(response.data);
        } catch (error) {
            console.error('Error approving/rejecting request:', error);
            setError('Failed to process request');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            {/* Main page title with aria attributes for accessibility */}
            <h1
                className="text-3xl font-bold mb-8"
                id="accountPageTitle"
                tabIndex={0}
                aria-label="Accountpagina"
            >
                Account
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Navigation area with ARIA role */}
                <nav
                    className="bg-white p-6 rounded-lg shadow-md"
                    aria-label="Account navigatie"
                >
                    <h2
                        className="text-xl font-semibold mb-4"
                        id="menuTitle"
                        tabIndex={0}
                        aria-label="Menu"
                    >
                        Menu
                    </h2>
                    <ul className="space-y-2" aria-labelledby="menuTitle">
                        <li>
                            <button
                                className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'dashboard' ? 'bg-blue-100' : ''
                                    }`}
                                onClick={() => setActiveTab('dashboard')}
                                aria-pressed={activeTab === 'dashboard'}
                                aria-label="Ga naar Dashboard"
                            >
                                Dashboard
                            </button>
                        </li>

                        {(user?.role === Roles.particulier || user?.role === Roles.wagenParkBeheerder) && (
                            <>
                                <li>
                                    <button
                                        className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'huurgeschiedenis' ? 'bg-blue-100' : ''
                                            }`}
                                        onClick={() => setActiveTab('huurgeschiedenis')}
                                        aria-pressed={activeTab === 'huurgeschiedenis'}
                                        aria-label="Ga naar Huurgeschiedenis"
                                    >
                                        Huurgeschiedenis
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'persoonlijke-info' ? 'bg-blue-100' : ''
                                            }`}
                                        onClick={() => setActiveTab('persoonlijke-info')}
                                        aria-pressed={activeTab === 'persoonlijke-info'}
                                        aria-label="Ga naar Persoonlijke Info"
                                    >
                                        Persoonlijke Info
                                    </button>
                                </li>
                            </>
                        )}

                        {user?.role === Roles.wagenParkBeheerder && (
                            <>
                                <li>
                                    <button
                                        className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'abonnementsbeheer' ? 'bg-blue-100' : ''
                                            }`}
                                        onClick={() => setActiveTab('abonnementsbeheer')}
                                        aria-pressed={activeTab === 'abonnementsbeheer'}
                                        aria-label="Ga naar Abonnementsbeheer"
                                    >
                                        Abonnementsbeheer
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'medewerkerbeheer' ? 'bg-blue-100' : ''
                                            }`}
                                        onClick={() => setActiveTab('medewerkerbeheer')}
                                        aria-pressed={activeTab === 'medewerkerbeheer'}
                                        aria-label="Ga naar Medewerkerbeheer"
                                    >
                                        Medewerkerbeheer
                                    </button>
                                </li>
                                {/* <li>
                                    <button
                                        className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'gehuurde-voertuigen' ? 'bg-blue-100' : ''
                                            }`}
                                        onClick={() => setActiveTab('gehuurde-voertuigen')}
                                        aria-pressed={activeTab === 'gehuurde-voertuigen'}
                                        aria-label="Ga naar Gehuurde Voertuigen"
                                    >
                                        Gehuurde Voertuigen
                                    </button>
                                </li> */}
                                <li>
                                    <button
                                        className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'facturatie' ? 'bg-blue-100' : ''
                                            }`}
                                        onClick={() => setActiveTab('facturatie')}
                                        aria-pressed={activeTab === 'facturatie'}
                                        aria-label="Ga naar Facturatie en Facturen"
                                    >
                                        Facturatie &amp; Facturen
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'bedrijfsinfo' ? 'bg-blue-100' : ''
                                            }`}
                                        onClick={() => setActiveTab('bedrijfsinfo')}
                                        aria-pressed={activeTab === 'bedrijfsinfo'}
                                        aria-label="Ga naar Bedrijfsinformatie"
                                    >
                                        Bedrijfsinformatie
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'persoonlijke-info' ? 'bg-blue-100' : ''
                                            }`}
                                        onClick={() => setActiveTab('persoonlijke-info')}
                                        aria-pressed={activeTab === 'persoonlijke-info'}
                                        aria-label="Ga naar Persoonlijke Info"
                                    >
                                        Persoonlijke Info
                                    </button>
                                </li>
                            </>
                        )}

                        {(user?.role === Roles.medewerker ||
                            user?.role === Roles.frontoffice ||
                            user?.role === Roles.backoffice ||
                            user?.role === Roles.wagenParkBeheerder) && (
                                <>
                                    <li>
                                        <button
                                            className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'abonnementsgoedkeuringen' ? 'bg-blue-100' : ''
                                                }`}
                                            onClick={() => setActiveTab('abonnementsgoedkeuringen')}
                                            aria-pressed={activeTab === 'abonnementsgoedkeuringen'}
                                            aria-label="Ga naar Abonnementsgoedkeuringen"
                                        >
                                            Abonnementsgoedkeuringen
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'voertuigbeheer' ? 'bg-blue-100' : ''
                                                }`}
                                            onClick={() => setActiveTab('voertuigbeheer')}
                                            aria-pressed={activeTab === 'voertuigbeheer'}
                                            aria-label="Ga naar Voertuigbeheer"
                                        >
                                            Voertuigbeheer
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'schadeclaims' ? 'bg-blue-100' : ''
                                                }`}
                                            onClick={() => setActiveTab('schadeclaims')}
                                            aria-pressed={activeTab === 'schadeclaims'}
                                            aria-label="Ga naar Schadeclaims"
                                        >
                                            Schadeclaims
                                        </button>
                                    </li>

                                    <li>
                                        <button
                                            className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'rapporten' ? 'bg-blue-100' : ''
                                                }`}
                                            onClick={() => setActiveTab('rapporten')}
                                            aria-pressed={activeTab === 'rapporten'}
                                            aria-label="Ga naar Rapporten en Analyse"
                                        >
                                            Rapporten &amp; Analyse
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'persoonlijke-info' ? 'bg-blue-100' : ''
                                                }`}
                                            onClick={() => setActiveTab('persoonlijke-info')}
                                            aria-pressed={activeTab === 'persoonlijke-info'}
                                            aria-label="Ga naar Persoonlijke Info"
                                        >
                                            Persoonlijke Info
                                        </button>
                                    </li>


                                    <li>
                                        <button
                                            className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'vehicle-return' ? 'bg-blue-100' : ''}`}
                                            onClick={() => setActiveTab('vehicle-return')}
                                        >
                                            Vehicle Return
                                        </button>
                                    </li>
                                </>
                            )}
                    </ul>
                </nav>

                {/* Main content area */}
                <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h2
                        className="text-xl font-semibold mb-4"
                        aria-live="polite"
                        tabIndex={0}
                    >
                        Welkom, {user?.email}
                    </h2>
                    <div className="space-y-4">
                        {activeTab === 'dashboard' && (
                            <div>
                                <h3
                                    className="text-lg font-medium mb-4"
                                    tabIndex={0}
                                    aria-label="Dashboard overzicht"
                                >
                                    Dashboard
                                </h3>

                                {user?.role === Roles.particulier && (
                                    <div
                                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                                        role="region"
                                        aria-label="Particulier dashboard panelen"
                                    >
                                        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                                            <h4
                                                className="text-md font-semibold mb-2"
                                                tabIndex={0}
                                                aria-label="Lopende Verhuringen"
                                            >
                                                Lopende Verhuringen
                                            </h4>
                                            <ActiveBookings />
                                        </div>

                                        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                                            <h4
                                                className="text-md font-semibold mb-2"
                                                tabIndex={0}
                                                aria-label="Huurgeschiedenis"
                                            >
                                                Huurgeschiedenis
                                            </h4>
                                            <BookingsHistory />
                                        </div>

                                        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                                            <h4
                                                className="text-md font-semibold mb-2"
                                                tabIndex={0}
                                                aria-label="Snelle Acties"
                                            >
                                                Snelle Acties
                                            </h4>
                                            <div className="space-y-2">
                                                <button
                                                    onClick={() => router.push('/search-results')}
                                                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                                    aria-label="Nieuw Voertuig Huren"
                                                >
                                                    Nieuw Voertuig Huren
                                                </button>
                                                <button
                                                    onClick={() => setActiveTab('huurgeschiedenis')}
                                                    className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                                    aria-label="Bekijk Huurgeschiedenis"
                                                >
                                                    Bekijk Huurgeschiedenis
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {user?.role === Roles.wagenParkBeheerder && (
                                    <div
                                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                                        role="region"
                                        aria-label="Wagenparkbeheerder dashboard panelen"
                                    >
                                        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                                            <h4
                                                className="text-md font-semibold mb-2"
                                                tabIndex={0}
                                                aria-label="Actieve Boekingen"
                                            >
                                                Actieve Boekingen
                                            </h4>
                                            <ActiveBookings />
                                        </div>

                                        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                                            <h4
                                                className="text-md font-semibold mb-2"
                                                tabIndex={0}
                                                aria-label="Abonnement Status"
                                            >
                                                Abonnement Status
                                            </h4>
                                            <div>
                                                {abonnementData && (
                                                    <>
                                                        <p tabIndex={0}>
                                                            <strong>Type:</strong>{' '}
                                                            {abonnementData.type || 'Niet gespecificeerd'}
                                                        </p>
                                                        <p tabIndex={0}>
                                                            <strong>Geldig tot:</strong>{' '}
                                                            {new Date(abonnementData.geldigtot).toLocaleDateString()}
                                                        </p>
                                                        <p tabIndex={0}>
                                                            <strong>Resterend budget:</strong>{' '}
                                                            {abonnementData.remainingPrepaidDays} dagen
                                                        </p>
                                                    </>
                                                )}
                                                <button
                                                    onClick={() => setActiveTab('abonnementsbeheer')}
                                                    className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                                    aria-label="Beheer Abonnement"
                                                >
                                                    Beheer Abonnement
                                                </button>
                                            </div>
                                        </div>

                                        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                                            <h4
                                                className="text-md font-semibold mb-2"
                                                tabIndex={0}
                                                aria-label="Wagenparkbeheer"
                                            >
                                                Wagenparkbeheer
                                            </h4>
                                            <div className="space-y-2">
                                                <button
                                                    onClick={() => setActiveTab('medewerkerbeheer')}
                                                    className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                                    aria-label="Medewerkers Beheren"
                                                >
                                                    Medewerkers Beheren
                                                </button>
                                                <button
                                                    onClick={() => setActiveTab('voertuigbeheer')}
                                                    className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
                                                    aria-label="Voertuigen Beheren"
                                                >
                                                    Voertuigen Beheren
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {(user?.role === Roles.medewerker ||
                                    user?.role === Roles.frontoffice ||
                                    user?.role === Roles.backoffice) && (
                                        <div
                                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                                            role="region"
                                            aria-label="Medewerker/frontoffice/backoffice dashboard panelen"
                                        >
                                            <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                                                <h4
                                                    className="text-md font-semibold mb-2"
                                                    tabIndex={0}
                                                    aria-label="Openstaande Taken"
                                                >
                                                    Openstaande Taken
                                                </h4>
                                                <div>
                                                    <p tabIndex={0}>Nieuwe boekingsaanvragen</p>
                                                    <p tabIndex={0}>Openstaande schadeclaims</p>
                                                    <button
                                                        onClick={() => setActiveTab('abonnementsgoedkeuringen')}
                                                        className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                                        aria-label="Bekijk Aanvragen"
                                                    >
                                                        Bekijk Aanvragen
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                                                <h4
                                                    className="text-md font-semibold mb-2"
                                                    tabIndex={0}
                                                    aria-label="Systeem Statistieken"
                                                >
                                                    Systeem Statistieken
                                                </h4>
                                                <div>
                                                    <p tabIndex={0}>
                                                        Totaal aantal voertuigen: {voertuigen.length}
                                                    </p>
                                                    <p tabIndex={0}>
                                                        Actieve boekingen: {activeBookings.length}
                                                    </p>
                                                    <button
                                                        onClick={() => setActiveTab('rapporten')}
                                                        className="mt-2 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                                        aria-label="Bekijk Rapporten"
                                                    >
                                                        Bekijk Rapporten
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                                                <h4
                                                    className="text-md font-semibold mb-2"
                                                    tabIndex={0}
                                                    aria-label="Snelle Acties"
                                                >
                                                    Snelle Acties
                                                </h4>
                                                <div className="space-y-2">
                                                    <button
                                                        onClick={() => setActiveTab('voertuigbeheer')}
                                                        className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
                                                        aria-label="Voertuig Toevoegen"
                                                    >
                                                        Voertuig Toevoegen
                                                    </button>
                                                    <button
                                                        onClick={() => setActiveTab('schadeclaims')}
                                                        className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                                        aria-label="Schadeclaims Bekijken"
                                                    >
                                                        Schadeclaims Bekijken
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                            </div>
                        )}



                        {activeTab === 'huurgeschiedenis' && (
                            <div className="space-y-8">
                                <ActiveBookings />
                                {/* <div className="border-t pt-8">
                                    <BookingsHistory />
                                </div> */}
                            </div>
                        )}



                        {activeTab === 'persoonlijke-info' && (
                            <div>
                                <div
                                    className="bg-white shadow rounded-lg p-6"
                                    role="region"
                                    aria-label="Formulier Gebruiker Data Bewerken"
                                >
                                    <UserEditForm
                                        userData={userData}
                                        onUpdate={(updatedData) => {
                                            setUserData({
                                                ...userData,
                                                ...updatedData
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'abonnementsbeheer' && (
                            <div>
                                <h3
                                    className="text-lg font-medium"
                                    tabIndex={0}
                                    aria-label="Abonnementsbeheer"
                                >
                                    Abonnementsbeheer
                                </h3>
                                <div
                                    className="mb-6 p-4 bg-gray-50 rounded"
                                    role="region"
                                    aria-label="Beschikbare Abonnementen"
                                >
                                    <h4 className="font-medium mb-2">Beschikbare Abonnementen:</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <h5 className="font-medium">Pay As You Go</h5>
                                            <p>
                                                Maandelijks vast bedrag met korting op huurtarieven
                                            </p>
                                        </div>
                                        <div>
                                            <h5 className="font-medium">Prepaid</h5>
                                            <p>Vooraf betaald pakket met vast aantal huurdagen</p>
                                        </div>
                                    </div>
                                </div>

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleAbonnementAanvraag({
                                            type: abonnementType,
                                            duur: abonnementDuur
                                        });
                                    }}
                                    aria-label="Abonnement Aanvraag Formulier"
                                >
                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                        htmlFor="abonnementTypeSelect"
                                    >
                                        Abonnement Type:
                                    </label>
                                    <select
                                        id="abonnementTypeSelect"
                                        value={abonnementType}
                                        onChange={(e) => setAbonnementType(e.target.value)}
                                        className="w-full p-2 border rounded mb-4"
                                        required
                                        aria-required="true"
                                        aria-label="Selecteer Abonnement Type"
                                    >
                                        <option value="">Selecteer type</option>
                                        <option value="pay-as-you-go">Pay As You Go</option>
                                        <option value="prepaid">Prepaid</option>
                                    </select>

                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                        htmlFor="abonnementDuurSelect"
                                    >
                                        Duur in maanden:
                                    </label>
                                    <select
                                        id="abonnementDuurSelect"
                                        value={abonnementDuur}
                                        onChange={(e) => setAbonnementDuur(e.target.value)}
                                        className="w-full p-2 border rounded mb-4"
                                        required
                                        aria-required="true"
                                        aria-label="Selecteer duur in maanden"
                                    >
                                        <option value="12">12 maanden</option>
                                        <option value="24">24 maanden</option>
                                        <option value="36">36 maanden</option>
                                    </select>

                                    <button
                                        type="submit"
                                        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                        aria-label="Dien abonnement aanvraag in"
                                    >
                                        Aanvragen
                                    </button>
                                </form>

                                {abonnementAanvragen.length > 0 && (
                                    <div className="mt-6" role="region" aria-label="Lopende Aanvragen">
                                        <h4 className="font-medium mb-2">Lopende Aanvragen:</h4>
                                        {abonnementAanvragen.map((aanvraag) => (
                                            <div
                                                key={aanvraag.id}
                                                className="p-4 border rounded mb-2"
                                                tabIndex={0}
                                                aria-label={`Abonnementsaanvraag type: ${aanvraag.type}, status: ${aanvraag.status}`}
                                            >
                                                <p>
                                                    <strong>Type:</strong> {aanvraag.type}
                                                </p>
                                                <p>
                                                    <strong>Status:</strong> {aanvraag.status}
                                                </p>
                                                <p>
                                                    <strong>Aanvraagdatum:</strong>{' '}
                                                    {new Date(aanvraag.datum).toLocaleDateString()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div>
                                    <h3 className="text-lg font-medium mb-6">Abonnementsbeheer</h3>
                                    <AbonnementMedewerkerBeheer />
                                </div>
                            </div>
                        )}

                        {activeTab === 'abonnementsbeheer' && (
                            <div>
                                <h3
                                    className="text-lg font-medium"
                                    tabIndex={0}
                                    aria-label="Abonnementsbeheer Pakketten"
                                >
                                    Abonnementsbeheer
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                    <div className="bg-white p-6 rounded-lg shadow">
                                        <h4 className="text-xl font-semibold mb-4">Pay As You Go</h4>
                                        <ul className="mb-4 space-y-2">
                                            <li>• Maandelijks vast bedrag</li>
                                            <li>• Geen korting op huurtarieven</li>
                                            <li>• Maximaal 5 medewerkers</li>
                                            <li>• Flexibele huurmogelijkheden</li>
                                        </ul>
                                        <p className="text-2xl font-bold mb-4">€50/maand</p>
                                        <SubscriptionCheckout
                                            abonnementType="pay-as-you-go"
                                            bedrijfKvk={userData?.kvk}
                                        />
                                    </div>

                                    <div className="bg-white p-6 rounded-lg shadow">
                                        <h4 className="text-xl font-semibold mb-4">
                                            Prepaid Package
                                        </h4>
                                        <ul className="mb-4 space-y-2">
                                            <li>• Vooraf betaald pakket</li>
                                            <li>• 30 huurdagen inbegrepen</li>
                                            <li>• Maximaal 10 medewerkers</li>
                                            <li>• Geldig voor 12 maanden</li>
                                        </ul>
                                        <p className="text-2xl font-bold mb-4">€500 eenmalig</p>
                                        <SubscriptionCheckout
                                            abonnementType="prepaid"
                                            bedrijfKvk={userData?.kvk}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'medewerkerbeheer' && (
                            <div>
                                <h3
                                    className="text-lg font-medium mb-6"
                                    tabIndex={0}
                                    aria-label="Medewerkerbeheer"
                                >
                                    Medewerkerbeheer
                                </h3>
                                <MedewerkerBeheer />
                            </div>
                        )}

                        {activeTab === 'gehuurde-voertuigen' && (
                            <div>
                                <h3
                                    className="text-lg font-medium"
                                    tabIndex={0}
                                    aria-label="Gehuurde Voertuigen"
                                >
                                    Gehuurde Voertuigen
                                </h3>
                                <p>Bekijk voertuigen die door medewerkers zijn gehuurd.</p>
                                <div className="mt-4">
                                    {gehuurdeVoertuigen.map((voertuig) => (
                                        <div
                                            key={voertuig.Id}
                                            className="p-4 border rounded bg-gray-50 mb-4"
                                            tabIndex={0}
                                            aria-label={`Gehuurd voertuig kenteken: ${voertuig.Kenteken}, merk: ${voertuig.Merk}, model: ${voertuig.Model}`}
                                        >
                                            <p>
                                                <strong>Kenteken:</strong> {voertuig.Kenteken}
                                            </p>
                                            <p>
                                                <strong>Merk:</strong> {voertuig.Merk}
                                            </p>
                                            <p>
                                                <strong>Model:</strong> {voertuig.Model}
                                            </p>
                                            <p>
                                                <strong>Huurperiode:</strong>{' '}
                                                {new Date(voertuig.Start).toLocaleDateString()} -{' '}
                                                {new Date(voertuig.Einde).toLocaleDateString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'facturatie' && (
                            <div>
                                <h3
                                    className="text-lg font-medium"
                                    tabIndex={0}
                                    aria-label="Facturatie en Facturen"
                                >
                                    Facturaties &amp; Facturen
                                </h3>
                                <p>Bekijk en download facturen.</p>
                            </div>
                        )}

                        {activeTab === 'bedrijfsinfo' && (
                            <div>
                                <h3
                                    className="text-lg font-medium"
                                    tabIndex={0}
                                    aria-label="Bedrijfsinformatie"
                                >
                                    Bedrijfsinformatie
                                </h3>
                                <div className="mt-6">
                                    <h4 className="text-md font-medium">Notificaties</h4>
                                    <div className="space-y-2 mt-2">
                                        {notifications.map((notification) => (
                                            <div
                                                key={notification.Id}
                                                className="p-4 bg-blue-50 rounded-lg border border-blue-200"
                                                tabIndex={0}
                                                aria-label={`Notificatie: ${notification.bericht}`}
                                            >
                                                <p className="text-blue-800">{notification.bericht}</p>
                                                <p className="text-sm text-blue-600 mt-1">
                                                    {new Date(notification.Verzondenop).toLocaleString()}
                                                </p>
                                            </div>
                                        ))}
                                        {notifications.length === 0 && (
                                            <p className="text-gray-500">Geen nieuwe notificaties</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'abonnementsgoedkeuringen' && (
                            <div>
                                <h3
                                    className="text-lg font-medium"
                                    tabIndex={0}
                                    aria-label="Abonnementsgoedkeuringen"
                                >
                                    Abonnementsgoedkeuringen
                                </h3>
                                <p>Bekijk en keur abonnementsaanvragen van bedrijven goed of af.</p>

                                {isLoading ? (
                                    <p aria-live="polite">Laden...</p>
                                ) : error ? (
                                    <p className="text-red-500" aria-live="assertive">
                                        {error}
                                    </p>
                                ) : abonnementAanvragen.length === 0 ? (
                                    <p className="text-gray-600" aria-live="polite">
                                        Geen openstaande aanvragen.
                                    </p>
                                ) : (
                                    <div className="mt-4 space-y-4">
                                        {abonnementAanvragen.map((aanvraag) => (
                                            <div
                                                key={aanvraag.Id}
                                                className="p-4 border rounded bg-gray-50"
                                                tabIndex={0}
                                                aria-label={`Abonnementsaanvraag voor bedrijf: ${aanvraag.BedrijfNaam}`}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p>
                                                            <strong>Bedrijf:</strong>{' '}
                                                            {aanvraag.BedrijfNaam}
                                                        </p>
                                                        <p>
                                                            <strong>Type:</strong>{' '}
                                                            {aanvraag.AbonnementId}
                                                        </p>
                                                        <p>
                                                            <strong>Status:</strong>{' '}
                                                            {aanvraag.GoedGekeurd
                                                                ? 'Goedgekeurd'
                                                                : 'In afwachting'}
                                                        </p>
                                                        {aanvraag.Opmerkingen && (
                                                            <p>
                                                                <strong>Opmerkingen:</strong>{' '}
                                                                {aanvraag.Opmerkingen}
                                                            </p>
                                                        )}
                                                    </div>
                                                    {!aanvraag.GoedGekeurd && (
                                                        <div className="space-x-2">
                                                            <button
                                                                onClick={() =>
                                                                    handleApproveOrReject(aanvraag.Id, true)
                                                                }
                                                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                                                aria-label="Keur aanvraag goed"
                                                            >
                                                                Goedkeuren
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleApproveOrReject(aanvraag.Id, false)
                                                                }
                                                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                                                aria-label="Wijs aanvraag af"
                                                            >
                                                                Afwijzen
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <h3
                                    className="text-lg font-medium mb-6"
                                    tabIndex={0}
                                    aria-label="Bedrijfsabonnement Behandeling"
                                >
                                    Abonnementsgoedkeuringen
                                </h3>
                                <BedrijfsAbonnementBehandeling />
                            </div>
                        )}

                        {/* {activeTab === 'voertuigbeheer' && (
                            <div>
                                <h3
                                    className="text-lg font-medium"
                                    tabIndex={0}
                                    aria-label="Voertuigbeheer"
                                >
                                    Voertuigbeheer
                                </h3>
                                <form
                                    aria-label="Formulier Voertuig Toevoegen"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        // Placeholder for actual submit logic
                                    }}
                                >
                                    <label
                                        htmlFor="merkField"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Voertuig toevoegen:
                                    </label>
                                    <input
                                        type="text"
                                        id="merkField"
                                        className="border p-2 w-full"
                                        placeholder="Merk"
                                        aria-label="Voer het merk van het voertuig in"
                                    />
                                    <input
                                        type="text"
                                        className="border p-2 w-full mt-2"
                                        placeholder="Model"
                                        aria-label="Voer het model van het voertuig in"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                                        aria-label="Voertuig toevoegen"
                                    >
                                        Toevoegen
                                    </button>
                                </form>
                                <p className="mt-4">Voertuigenoverzicht:</p>
                            </div>
                        )} */}

                        {activeTab === 'voertuigbeheer' && (
                            <div>
                                <h3
                                    className="text-lg font-medium"
                                    tabIndex={0}
                                    aria-label="Voertuigbeheer Lijst"
                                >
                                    Voertuigbeheer
                                </h3>
                                <div className="mt-4">
                                    <FrontofficeVehicleList />
                                </div>
                            </div>
                        )}

                        {activeTab === 'schadeclaims' && (
                            <div>
                                <h3 className="text-lg font-medium">Schadeclaims</h3>
                                <div className="mt-4 space-y-4">
                                    {schadeClaims.map((claim) => (
                                        <div key={claim.id} className="p-4 border rounded bg-gray-50">
                                            <p><strong>Claim ID:</strong> {claim.id}</p>
                                            <p><strong>Voertuig ID:</strong> {claim.carId}</p>
                                            <p><strong>Gebruiker ID:</strong> {claim.userId}</p>
                                            <p><strong>Datum:</strong> {new Date(claim.date).toLocaleDateString()}</p>
                                            <p><strong>Status:</strong> {claim.isGoedgekeurd ? 'Goedgekeurd' : 'In behandeling'}</p>
                                            {claim.opmerking && <p><strong>Opmerking:</strong> {claim.opmerking}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}





                        {activeTab === 'rapporten' && (
                            <div>
                                <h3
                                    className="text-lg font-medium"
                                    tabIndex={0}
                                    aria-label="Rapporten en Analyse"
                                >
                                    Rapporten &amp; Analyse
                                </h3>
                                <p>Genereer rapporten over verhuringen, omzet en voertuiggebruik.</p>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                    aria-label="Rapport genereren"
                                >
                                    Rapport genereren
                                </button>
                            </div>
                        )}


                        {activeTab === 'vehicle-return' && (
                            <div>
                                <h3 className="text-lg font-medium mb-6">Process Vehicle Returns</h3>
                                <VehicleReturn />
                            </div>
                        )}


                    </div>
                </div>
            </div>
        </div>
    );
}
