'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Roles from '../account/Roles';

import UserEditForm from '../components/UserEditForm';
import FrontofficeVehicleList from '../components/FrontofficeVehicleList';

export default function AccountPage() {
    const { user, apiClient } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [medewerkers, setMedewerkers] = useState([]);
    const [newMedewerkerEmail, setNewMedewerkerEmail] = useState('');
    const [gehuurdeVoertuigen, setGehuurdeVoertuigen] = useState([]);
    const [abonnementType, setAbonnementType] = useState('');
    const [abonnementDuur, setAbonnementDuur] = useState(12);
    const [abonnementAanvragen, setAbonnementAanvragen] = useState([]);
    const [rentalHistory, setRentalHistory] = useState([]);
    const [isLoadingRentalHistory, setIsLoadingRentalHistory] = useState(false);
    const [rentalHistoryError, setRentalHistoryError] = useState(null);

    //user.role = Roles.medewerker;
    //user.role = Roles.particulier;
    //user.role = Roles.frontoffice;
    //user.role = Roles.backoffice;
    //user.role = Roles.bedrijf;

    useEffect(() => {
        const initializeUser = async () => {
            try {
                const response = await apiClient.get('/api/auth/AuthMe');
                if (response.status === 200) {
                    const { role } = response.data;
                    // user.role = role;
                    user.role = Roles.bedrijf; // Assign role dynamically

                }
            } catch (error) {
                console.error('Error fetching user role:', error);
                setError('Failed to fetch user role.');
            }
        };

        if (apiClient) {
            initializeUser();
        }
    }, [apiClient, user]);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user?.email) {
                setIsLoading(true);
                try {
                    const response = await apiClient.get(`api/User/GetUserData?email=${user.email}`, {
                        withCredentials: true,
                    });
                    if (response.status === 200) {
                        setUserData(response.data);
                    } else {
                        setError('Failed to fetch user data');
                    }
                } catch (err) {
                    console.error('Error fetching user data:', err);
                    setError(err.message || 'An error occurred while fetching user data');
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchUserData();
    }, [user, apiClient]);

    useEffect(() => {
        const fetchMedewerkers = async () => {
            if (user?.role === 'bedrijf') {
                try {
                    const response = await apiClient.get('/api/User/GetMedewerkers');
                    setMedewerkers(response.data);
                } catch (error) {
                    console.error('Error fetching medewerkers:', error);
                }
            }
        };

        fetchMedewerkers();
    }, [user, apiClient]);

    const handleAddMedewerker = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/api/User/AddMedewerker', {
                email: newMedewerkerEmail,
            });

            if (response.status === 200) {
                setMedewerkers((prev) => [...prev, response.data]);
                setNewMedewerkerEmail('');
                alert('Medewerker succesvol toegevoegd!');
            }
        } catch (error) {
            console.error('Error adding medewerker:', error);
            alert('Er is een fout opgetreden bij het toevoegen van de medewerker.');
        }
    };

    useEffect(() => {
        const fetchGehuurdeVoertuigen = async () => {
            if (user?.role === 'bedrijf') {
                try {
                    const response = await apiClient.get('/api/Huur/GetHuurByBedrijf');
                    setGehuurdeVoertuigen(response.data);
                } catch (error) {
                    console.error('Error fetching gehuurde voertuigen:', error);
                }
            }
        };

        fetchGehuurdeVoertuigen();
    }, [user, apiClient]);

    // const handleAbonnementAanvraag = async (e) => {
    //     e.preventDefault();
    //     try {
    //         if (!userData || !userData.Kvk) {
    //             throw new Error('Bedrijf gegevens niet beschikbaar');
    //         }

    //         const response = await apiClient.post('/api/Abonnement/Create_Abonnementen', {
    //             idBedrijf: userData.Kvk,
    //             idAbonnement: abonnementType,
    //             duurInMaanden: parseInt(abonnementDuur)
    //         });

    //         if (response.status === 200) {
    //             alert('Abonnement aanvraag succesvol ingediend! De aanvraag wordt beoordeeld.');
    //             // Refresh the list of pending requests
    //             const aanvragenResponse = await apiClient.get('/api/Abonnement/GetAbonnementAanvragen');
    //             if (aanvragenResponse.status === 200) {
    //                 setAbonnementAanvragen(aanvragenResponse.data);
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error submitting subscription request:', error);
    //         const errorMessage = error.response?.data || 'Er is een fout opgetreden bij het indienen van de aanvraag.';
    //         alert(`Er is een fout opgetreden: ${errorMessage}`);
    //     }
    // };

    useEffect(() => {
        const fetchAbonnementAanvragen = async () => {
            if (user?.role === Roles.medewerker ||
                user?.role === Roles.frontoffice ||
                user?.role === Roles.backoffice) {
                setIsLoading(true);
                try {
                    const response = await apiClient.get('api/Abonnement/GetAbonnementAanvragen', {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    });
                    if (response.status === 200) {
                        setAbonnementAanvragen(response.data);
                    }
                } catch (error) {
                    console.error('Error fetching subscription requests:', error);
                    setError('Er is een fout opgetreden bij het ophalen van de aanvragen.');
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchAbonnementAanvragen();
    }, [user, apiClient]);

    useEffect(() => {
        const fetchBusinessData = async () => {
            if (user?.role === 'bedrijf') {
                try {
                    const response = await apiClient.get('api/User/GetBusinessData');
                    if (response.status === 200) {
                        setUserData(prevData => ({
                            ...prevData,
                            ...response.data,
                            KvkNummer: response.data.KvkNummer // Ensure this matches the database field
                        }));
                    }
                } catch (error) {
                    console.error('Error fetching business data:', error);
                    setError('Failed to fetch business data');
                }
            }
        };

        fetchBusinessData();
    }, [user, apiClient]);

    const handleAbonnementAanvraag = async (e) => {
        e.preventDefault();
        try {
            // Get the user's KvK number from userData
            if (!userData || !userData.KvkNummer) {
                console.error('KvK nummer not found in user data');
                alert('Bedrijfsgegevens niet gevonden. Neem contact op met de beheerder.');
                return;
            }

            const response = await apiClient.post('/api/Abonnement/Create_Abonnementen', {
                idBedrijf: userData.KvkNummer,  // This should match the KvkNummer from Bedrijven table
                idAbonnement: abonnementType,
                duurInMaanden: parseInt(abonnementDuur)
            });

            if (response.status === 200) {
                alert('Abonnement aanvraag succesvol ingediend!');
                // Optionally refresh the page or the abonnement list
                window.location.reload();
            }
        } catch (error) {
            console.error('Error submitting subscription request:', error);
            const errorMessage = error.response?.data || 'Er is een fout opgetreden bij het indienen van de aanvraag.';
            alert(errorMessage);
        }
    };

    const handleUpdateAbonnementRechten = async (medewerkerId, heeftRechten) => {
        try {
            const response = await apiClient.post('/api/User/UpdateMedewerkerAbonnementRechten', {
                medewerkerId,
                heeftRechten,
            });
            if (response.status === 200) {
                alert(`Abonnement rechten ${heeftRechten ? 'toegekend' : 'ingetrokken'}`);
                const updatedMedewerkers = await apiClient.get('/api/User/GetMedewerkers');
                setMedewerkers(updatedMedewerkers.data);
            }
        } catch (error) {
            console.error('Error updating subscription rights:', error);
            alert('Er is een fout opgetreden bij het bijwerken van de rechten.');
        }
    };

    useEffect(() => {
        const fetchRentalHistory = async () => {
            if (user?.role === Roles.particulier && activeTab === 'huurgeschiedenis') {
                setIsLoadingRentalHistory(true);
                setRentalHistoryError(null);

                try {
                    const response = await apiClient.get('/api/Aanvraag/GetHuurAanvragen');
                    if (response.status === 200) {
                        const filteredRentalHistory = response.data.filter(
                            (rental) => rental.HuurderId === user.Id
                        );
                        setRentalHistory(filteredRentalHistory);
                    }
                } catch (error) {
                    console.error('Error fetching rental history:', error);
                    setRentalHistoryError('Er is een fout opgetreden bij het ophalen van de huurgeschiedenis.');
                } finally {
                    setIsLoadingRentalHistory(false);
                }
            }
        };

        fetchRentalHistory();
    }, [user, activeTab, apiClient]);


    const [notifications, setNotifications] = useState([]);
    const [lastNotificationCheck, setLastNotificationCheck] = useState(new Date());

    useEffect(() => {
        const fetchNotifications = async () => {
            if (user?.role === 'bedrijf') {
                try {
                    const response = await apiClient.get('/api/Notificatie/GetNotificaties');
                    if (response.status === 200) {
                        setNotifications(response.data);
                        setLastNotificationCheck(new Date());
                    }
                } catch (error) {
                    console.error('Error fetching notifications:', error);
                }
            }
        };

        fetchNotifications();
        const intervalId = setInterval(fetchNotifications, 30000);

        return () => clearInterval(intervalId);
    }, [user, apiClient]);



    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">Account</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar Navigation */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Menu</h2>
                    <ul className="space-y-2">
                        <li>
                            <button
                                className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'dashboard' ? 'bg-blue-100' : ''}`}
                                onClick={() => setActiveTab('dashboard')}
                            >
                                Dashboard
                            </button>
                        </li>

                        {user?.role === Roles.particulier && (
                            <>
                                <li>
                                    <button
                                        className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'huurgeschiedenis' ? 'bg-blue-100' : ''}`}
                                        onClick={() => setActiveTab('huurgeschiedenis')}
                                    >
                                        Huurgeschiedenis
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'persoonlijke-info' ? 'bg-blue-100' : ''}`}
                                        onClick={() => setActiveTab('persoonlijke-info')}
                                    >
                                        Persoonlijke Info
                                    </button>
                                </li>
                            </>
                        )}

                        {user?.role === 'bedrijf' && (
                            <>
                                <li>
                                    <button
                                        className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'abonnementsbeheer' ? 'bg-blue-100' : ''}`}
                                        onClick={() => setActiveTab('abonnementsbeheer')}
                                    >
                                        Abonnementsbeheer
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'medewerkerbeheer' ? 'bg-blue-100' : ''}`}
                                        onClick={() => setActiveTab('medewerkerbeheer')}
                                    >
                                        Medewerkerbeheer
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'gehuurde-voertuigen' ? 'bg-blue-100' : ''}`}
                                        onClick={() => setActiveTab('gehuurde-voertuigen')}
                                    >
                                        Gehuurde Voertuigen
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'facturatie' ? 'bg-blue-100' : ''}`}
                                        onClick={() => setActiveTab('facturatie')}
                                    >
                                        Facturatie & Facturen
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'bedrijfsinfo' ? 'bg-blue-100' : ''}`}
                                        onClick={() => setActiveTab('bedrijfsinfo')}
                                    >
                                        Bedrijfsinformatie
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'persoonlijke-info' ? 'bg-blue-100' : ''}`}
                                        onClick={() => setActiveTab('persoonlijke-info')}
                                    >
                                        Persoonlijke Info
                                    </button>
                                </li>
                            </>
                        )}

                        {(user?.role === Roles.medewerker || user?.role === Roles.frontoffice || user?.role === Roles.backoffice) && (
                            <>
                                <li>
                                    <button
                                        className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'abonnementsgoedkeuringen' ? 'bg-blue-100' : ''}`}
                                        onClick={() => setActiveTab('abonnementsgoedkeuringen')}
                                    >
                                        Abonnementsgoedkeuringen
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'voertuigbeheer' ? 'bg-blue-100' : ''}`}
                                        onClick={() => setActiveTab('voertuigbeheer')}
                                    >
                                        Voertuigbeheer
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'schadeclaims' ? 'bg-blue-100' : ''}`}
                                        onClick={() => setActiveTab('schadeclaims')}
                                    >
                                        Schadeclaims
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'verhuuroverzicht' ? 'bg-blue-100' : ''}`}
                                        onClick={() => setActiveTab('verhuuroverzicht')}
                                    >
                                        Verhuuroverzicht
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'rapporten' ? 'bg-blue-100' : ''}`}
                                        onClick={() => setActiveTab('rapporten')}
                                    >
                                        Rapporten & Analyse
                                    </button>
                                </li>

                                <li>
                                    <button
                                        className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'persoonlijke-info' ? 'bg-blue-100' : ''}`}
                                        onClick={() => setActiveTab('persoonlijke-info')}
                                    >
                                        Persoonlijke Info
                                    </button>
                                </li>

                            </>
                        )}
                    </ul>
                </div>

                {/* Main Content */}
                <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Welkom, {user?.email}</h2>
                    <div className="space-y-4">
                        {activeTab === 'dashboard' && (
                            <div>
                                <h3 className="text-lg font-medium">Dashboard</h3>
                                {user?.role === Roles.particulier && (
                                    <>
                                        <p>Snelle acties:</p>
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded">Voertuig huren</button>
                                        <button className="bg-green-500 text-white px-4 py-2 rounded ml-2">Abonnement verlengen</button>
                                        <p className="mt-4">Lopende verhuringen:</p>
                                    </>
                                )}
                                {user?.role === 'bedrijf' && (
                                    <>
                                        <p>Overzicht van actieve abonnementen en lopende verhuringen:</p>
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded">Medewerker toevoegen</button>
                                        <button className="bg-green-500 text-white px-4 py-2 rounded ml-2">Abonnement verlengen</button>
                                    </>
                                )}
                                {(user?.role === Roles.medewerker || user?.role === Roles.frontoffice || user?.role === Roles.backoffice) && (
                                    <>
                                        <p>Openstaande taken:</p>
                                        <p>Systeemstatus:</p>
                                    </>
                                )}
                            </div>
                        )}

                        {activeTab === 'huurgeschiedenis' && (
                            <div>
                                <h3 className="text-lg font-medium">Huurgeschiedenis</h3>
                                <p>Hier kunt u uw eerdere en huidige verhuringen bekijken.</p>

                                {isLoadingRentalHistory ? (
                                    <p className="text-gray-600">Laden...</p>
                                ) : rentalHistoryError ? (
                                    <p className="text-red-500">{rentalHistoryError}</p>
                                ) : rentalHistory.length > 0 ? (
                                    <div className="mt-4">
                                        {rentalHistory.map((rental) => (
                                            <div key={rental.Id} className="p-4 border rounded bg-gray-50 mb-4">
                                                <p><strong>Voertuig ID:</strong> {rental.IdVoertuig}</p>
                                                <p><strong>Startdatum:</strong> {new Date(rental.Start).toLocaleDateString()}</p>
                                                <p><strong>Einddatum:</strong> {new Date(rental.Einde).toLocaleDateString()}</p>
                                                <p><strong>Status:</strong> {rental.Status}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600">Geen huurgeschiedenis gevonden.</p>
                                )}
                            </div>
                        )}

                        {activeTab === 'persoonlijke-info' && (
                            <div>
                                <h3 className="text-lg font-medium">Persoonlijke Info</h3>
                                <div className="bg-white shadow rounded-lg p-6">
                                    <h2 className="text-xl font-semibold mb-4">Gebruiker Data</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Voornaam</label>
                                            <p className="mt-1 text-sm text-gray-900">{userData?.voornaam}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Achternaam</label>
                                            <p className="mt-1 text-sm text-gray-900">{userData?.achternaam}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Email</label>
                                            <p className="mt-1 text-sm text-gray-900">{userData?.emailAddress}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Telefoon Nummer</label>
                                            <p className="mt-1 text-sm text-gray-900">{userData?.telefoonNummer}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Adres</label>
                                            <p className="mt-1 text-sm text-gray-900">{userData?.straatHuisnummer}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Postcode</label>
                                            <p className="mt-1 text-sm text-gray-900">{userData?.postcode}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Rol</label>
                                            <p className="mt-1 text-sm text-gray-900">{userData?.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'persoonlijke-info' && (
                            <div>
                                <h3 className="text-lg font-medium">Persoonlijke Info</h3>
                                <div className="bg-white shadow rounded-lg p-6">
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
                                <h3 className="text-lg font-medium">Abonnementsbeheer</h3>
                                {/* Add subscription type descriptions */}
                                <div className="mb-6 p-4 bg-gray-50 rounded">
                                    <h4 className="font-medium mb-2">Beschikbare Abonnementen:</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <h5 className="font-medium">Pay As You Go</h5>
                                            <p>Maandelijks vast bedrag met korting op huurtarieven</p>
                                        </div>
                                        <div>
                                            <h5 className="font-medium">Prepaid</h5>
                                            <p>Vooraf betaald pakket met vast aantal huurdagen</p>
                                        </div>
                                    </div>
                                </div>

                                <form onSubmit={handleAbonnementAanvraag}>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Abonnement Type:
                                    </label>
                                    <select
                                        value={abonnementType}
                                        onChange={(e) => setAbonnementType(e.target.value)}
                                        className="w-full p-2 border rounded mb-4"
                                        required
                                    >
                                        <option value="">Selecteer type</option>
                                        <option value="pay-as-you-go">Pay As You Go</option>
                                        <option value="prepaid">Prepaid</option>
                                    </select>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Duur in maanden:
                                    </label>
                                    <select
                                        value={abonnementDuur}
                                        onChange={(e) => setAbonnementDuur(e.target.value)}
                                        className="w-full p-2 border rounded mb-4"
                                        required
                                    >
                                        <option value="12">12 maanden</option>
                                        <option value="24">24 maanden</option>
                                        <option value="36">36 maanden</option>
                                    </select>

                                    <button
                                        type="submit"
                                        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                    >
                                        Aanvragen
                                    </button>
                                </form>

                                {/* Show pending requests */}
                                {abonnementAanvragen.length > 0 && (
                                    <div className="mt-6">
                                        <h4 className="font-medium mb-2">Lopende Aanvragen:</h4>
                                        {abonnementAanvragen.map((aanvraag) => (
                                            <div key={aanvraag.id} className="p-4 border rounded mb-2">
                                                <p><strong>Type:</strong> {aanvraag.type}</p>
                                                <p><strong>Status:</strong> {aanvraag.status}</p>
                                                <p><strong>Aanvraagdatum:</strong> {new Date(aanvraag.datum).toLocaleDateString()}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'medewerkerbeheer' && (
                            <div>
                                <h3 className="text-lg font-medium">Medewerkerbeheer</h3>
                                <form onSubmit={handleAddMedewerker}>
                                    <label>Medewerker toevoegen:</label>
                                    <input
                                        type="email"
                                        className="border p-2 w-full"
                                        placeholder="E-mailadres"
                                        value={newMedewerkerEmail}
                                        onChange={(e) => setNewMedewerkerEmail(e.target.value)}
                                    />
                                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                                        Toevoegen
                                    </button>
                                </form>
                                <p>Medewerkersoverzicht:</p>
                                <div className="mt-4">
                                    {medewerkers.map((medewerker) => (
                                        <div key={medewerker.id} className="p-4 border rounded bg-gray-50 mb-4">
                                            <p><strong>Naam:</strong> {medewerker.Voornaam} {medewerker.Achternaam}</p>
                                            <p><strong>E-mail:</strong> {medewerker.EmailAddress}</p>
                                            <button
                                                onClick={() => handleUpdateAbonnementRechten(medewerker.id, !medewerker.HeeftAbonnementRechten)}
                                                className={`mt-2 px-4 py-2 rounded ${medewerker.HeeftAbonnementRechten ? 'bg-red-500' : 'bg-green-500'} text-white`}
                                            >
                                                {medewerker.HeeftAbonnementRechten ? 'Rechten intrekken' : 'Rechten toekennen'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'gehuurde-voertuigen' && (
                            <div>
                                <h3 className="text-lg font-medium">Gehuurde Voertuigen</h3>
                                <p>Bekijk voertuigen die door medewerkers zijn gehuurd.</p>
                                <div className="mt-4">
                                    {gehuurdeVoertuigen.map((voertuig) => (
                                        <div key={voertuig.Id} className="p-4 border rounded bg-gray-50 mb-4">
                                            <p><strong>Kenteken:</strong> {voertuig.Kenteken}</p>
                                            <p><strong>Merk:</strong> {voertuig.Merk}</p>
                                            <p><strong>Model:</strong> {voertuig.Model}</p>
                                            <p><strong>Huurperiode:</strong> {new Date(voertuig.Start).toLocaleDateString()} - {new Date(voertuig.Einde).toLocaleDateString()}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'facturatie' && (
                            <div>
                                <h3 className="text-lg font-medium">Facturatie & Facturen</h3>
                                <p>Bekijk en download facturen.</p>
                            </div>
                        )}




                        {activeTab === 'bedrijfsinfo' && (
                            <div>
                                <h3 className="text-lg font-medium">Bedrijfsinformatie</h3>
                                {/* Existing bedrijfsinfo content */}

                                {/* Add this new notifications section */}
                                <div className="mt-6">
                                    <h4 className="text-md font-medium">Notificaties</h4>
                                    <div className="space-y-2 mt-2">
                                        {notifications.map((notification) => (
                                            <div
                                                key={notification.Id}
                                                className="p-4 bg-blue-50 rounded-lg border border-blue-200"
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
                                <h3 className="text-lg font-medium">Abonnementsgoedkeuringen</h3>
                                <p>Bekijk en keur abonnementsaanvragen van bedrijven goed of af.</p>

                                {isLoading ? (
                                    <p>Laden...</p>
                                ) : error ? (
                                    <p className="text-red-500">{error}</p>
                                ) : abonnementAanvragen.length === 0 ? (
                                    <p className="text-gray-600">Geen openstaande aanvragen.</p>
                                ) : (
                                    <div className="mt-4 space-y-4">
                                        {abonnementAanvragen.map((aanvraag) => (
                                            <div key={aanvraag.Id} className="p-4 border rounded bg-gray-50">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p><strong>Bedrijf:</strong> {aanvraag.BedrijfNaam}</p>
                                                        <p><strong>Type:</strong> {aanvraag.AbonnementId}</p>
                                                        <p><strong>Status:</strong> {aanvraag.GoedGekeurd ? 'Goedgekeurd' : 'In afwachting'}</p>
                                                        {aanvraag.Opmerkingen && (
                                                            <p><strong>Opmerkingen:</strong> {aanvraag.Opmerkingen}</p>
                                                        )}
                                                    </div>
                                                    {!aanvraag.GoedGekeurd && (
                                                        <div className="space-x-2">
                                                            <button
                                                                onClick={() => handleApproveOrReject(aanvraag.Id, true)}
                                                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                                            >
                                                                Goedkeuren
                                                            </button>
                                                            <button
                                                                onClick={() => handleApproveOrReject(aanvraag.Id, false)}
                                                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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
                            </div>
                        )}

                        {activeTab === 'voertuigbeheer' && (
                            <div>
                                <h3 className="text-lg font-medium">Voertuigbeheer</h3>
                                <form>
                                    <label>Voertuig toevoegen:</label>
                                    <input type="text" className="border p-2 w-full" placeholder="Merk" />
                                    <input type="text" className="border p-2 w-full" placeholder="Model" />
                                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Toevoegen</button>
                                </form>
                                <p>Voertuigenoverzicht:</p>
                            </div>
                        )}

                        {activeTab === 'voertuigbeheer' && (
                            <div>
                                <h3 className="text-lg font-medium">Voertuigbeheer</h3>
                                <div className="mt-4">
                                    <FrontofficeVehicleList />
                                </div>
                            </div>
                        )}

                        {activeTab === 'schadeclaims' && (
                            <div>
                                <h3 className="text-lg font-medium">Schadeclaims</h3>
                                <p>Behandel schadeclaims en reparaties.</p>
                            </div>
                        )}

                        {activeTab === 'verhuuroverzicht' && (
                            <div>
                                <h3 className="text-lg font-medium">Verhuuroverzicht</h3>
                                <p>Bekijk alle lopende en eerdere verhuringen.</p>
                            </div>
                        )}

                        {activeTab === 'rapporten' && (
                            <div>
                                <h3 className="text-lg font-medium">Rapporten & Analyse</h3>
                                <p>Genereer rapporten over verhuringen, omzet en voertuiggebruik.</p>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded">Rapport genereren</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}