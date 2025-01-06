'use client'
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import Roles from "../account/Roles";

export default function AccountPage() {
    const { user, apiClient } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [userData, setUserData] = useState(null);

    user.role = Roles.medewerker;
    //user.role = Roles.particulier;
    //user.role = Roles.frontoffice;
    //user.role = Roles.backoffice;
    //user.role = Roles.bedrijf;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                let endpoint = '';
                if (user?.role === Roles.particulier) {
                    endpoint = '/api/User/GetUserData';
                } else if (user?.role === 'bedrijf') {
                    endpoint = '/api/User/GetBusinessData';
                } else if (user?.role === Roles.medewerker || user?.role === Roles.frontoffice || user?.role === Roles.backoffice) {
                    endpoint = '/api/User/GetEmployeeData';
                }
    
                if (endpoint) {
                    const response = await apiClient.get(endpoint);
                    console.log('API Response:', response.data); // Log the response
                    if (response.status === 200) {
                        setUserData(response.data);
                    } else {
                        console.error('Unexpected response:', response);
                        alert('Er is een fout opgetreden bij het ophalen van gebruikersgegevens.');
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                alert('Er is een fout opgetreden bij het ophalen van gebruikersgegevens.');
            }
        };
    
        if (user) {
            fetchUserData();
        }
    }, [user, apiClient]);



    const [medewerkers, setMedewerkers] = useState([]);
    const [newMedewerkerEmail, setNewMedewerkerEmail] = useState('');

    // Fetch employees for bedrijf
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

    // Add a new medewerker
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


    const [gehuurdeVoertuigen, setGehuurdeVoertuigen] = useState([]);

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

    {
        activeTab === 'gehuurde-voertuigen' && (
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
        )
    }

    const [abonnementType, setAbonnementType] = useState('');
    const [abonnementDuur, setAbonnementDuur] = useState(12); // Default duration in months

    const handleAbonnementAanvraag = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/api/Abonnement/Create_Abonnementen', {
                idBedrijf: user.KvkNummer, // Assuming the business user's KvK number is stored in the user object
                idAbonnement: abonnementType,
                duurInMaanden: abonnementDuur,
            });
            if (response.status === 200) {
                alert('Abonnement aanvraag succesvol ingediend!');
            }
        } catch (error) {
            console.error('Error submitting subscription request:', error);
            alert('Er is een fout opgetreden bij het indienen van de aanvraag.');
        }
    };

    const [abonnementAanvragen, setAbonnementAanvragen] = useState([]);

    useEffect(() => {
        const fetchAbonnementAanvragen = async () => {
            try {
                const response = await apiClient.get('/api/Abonnement/GetAbonnementAanvragen');
                setAbonnementAanvragen(response.data);
            } catch (error) {
                console.error('Error fetching subscription requests:', error);
            }
        };

        if (user?.role === Roles.medewerker || user?.role === Roles.frontoffice || user?.role === Roles.backoffice) {
            fetchAbonnementAanvragen();
        }
    }, [user, apiClient]);


    const handleApproveOrReject = async (aanvraagId, isApproved) => {
        try {
            const response = await apiClient.post('/api/Abonnement/ApproveOrRejectAbonnement', {
                aanvraagId,
                isApproved,
            });
            if (response.status === 200) {
                alert(`Aanvraag ${isApproved ? 'goedgekeurd' : 'afgewezen'}`);
                // Refresh the list of subscription requests
                const updatedAanvragen = await apiClient.get('/api/Abonnement/GetAbonnementAanvragen');
                setAbonnementAanvragen(updatedAanvragen.data);
            }
        } catch (error) {
            console.error('Error approving/rejecting subscription request:', error);
            alert('Er is een fout opgetreden bij het goedkeuren/afwijzen van de aanvraag.');
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
                // Refresh the list of employees
                const updatedMedewerkers = await apiClient.get('/api/User/GetMedewerkers');
                setMedewerkers(updatedMedewerkers.data);
            }
        } catch (error) {
            console.error('Error updating subscription rights:', error);
            alert('Er is een fout opgetreden bij het bijwerken van de rechten.');
        }
    };


    const handleSave = async () => {
        try {
            const response = await apiClient.put('/api/User/UpdateUser', userData);
            if (response.status === 200) {
                alert('Gegevens succesvol opgeslagen!');
                setActiveTab('persoonlijke-info');
            }
        } catch (error) {
            console.error('Error updating user data:', error);
            alert('Er is een fout opgetreden bij het opslaan van de gegevens.');
        }
    };



    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">Account</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar Navigation */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Menu</h2>
                    <ul className="space-y-2">
                        {/* Dashboard Tab */}
                        <li>
                            <button
                                className={`w-full text-left p-2 hover:bg-gray-100 rounded ${activeTab === 'dashboard' ? 'bg-blue-100' : ''}`}
                                onClick={() => setActiveTab('dashboard')}
                            >
                                Dashboard
                            </button>
                        </li>

                        {/* Individual (Particulier) */}
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

                        {/* Business */}
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
                            </>
                        )}

                        {/* Employee (Medewerker, Frontoffice, Backoffice) */}
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
                            </>
                        )}
                    </ul>
                </div>

                {/* Main Content */}
                <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Welkom, {user?.email}</h2>
                    <div className="space-y-4">
                        {/* Dashboard Tab */}
                        {activeTab === 'dashboard' && (
                            <div>
                                <h3 className="text-lg font-medium">Dashboard</h3>
                                {user?.role === Roles.particulier && (
                                    <>
                                        <p>Snelle acties:</p>
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded">Voertuig huren</button>
                                        <button className="bg-green-500 text-white px-4 py-2 rounded ml-2">Abonnement verlengen</button>
                                        <p className="mt-4">Lopende verhuringen:</p>
                                        {/* Display ongoing rentals */}
                                    </>
                                )}
                                {user?.role === 'bedrijf' && (
                                    <>
                                        <p>Overzicht van actieve abonnementen en lopende verhuringen:</p>
                                        {/* Display active subscriptions and rentals */}
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded">Medewerker toevoegen</button>
                                        <button className="bg-green-500 text-white px-4 py-2 rounded ml-2">Abonnement verlengen</button>
                                    </>
                                )}
                                {(user?.role === Roles.medewerker || user?.role === Roles.frontoffice || user?.role === Roles.backoffice) && (
                                    <>
                                        <p>Openstaande taken:</p>
                                        {/* Display pending tasks */}
                                        <p>Systeemstatus:</p>
                                        {/* Display system status */}
                                    </>
                                )}
                            </div>
                        )}

                        {/* Individual (Particulier) */}
                        {activeTab === 'huurgeschiedenis' && (
                            <div>
                                <h3 className="text-lg font-medium">Huurgeschiedenis</h3>
                                <p>Hier kunt u uw eerdere en huidige verhuringen bekijken.</p>
                                {/* Display rental history */}
                            </div>
                        )}



                        {
                            activeTab === 'persoonlijke-info' && (
                                <div>
                                    <h3 className="text-lg font-medium">Persoonlijke Info</h3>
                                    <form>
                                        <label>Voornaam:</label>
                                        <input
                                            type="text"
                                            className="border p-2 w-full"
                                            value={userData?.Voornaam || ''}
                                            onChange={(e) => setUserData({ ...userData, Voornaam: e.target.value })}
                                        />
                                        <label>Achternaam:</label>
                                        <input
                                            type="text"
                                            className="border p-2 w-full"
                                            value={userData?.Achternaam || ''}
                                            onChange={(e) => setUserData({ ...userData, Achternaam: e.target.value })}
                                        />
                                        <label>E-mail:</label>
                                        <input
                                            type="email"
                                            className="border p-2 w-full"
                                            value={userData?.EmailAddress || ''}
                                            readOnly
                                        />
                                        <label>Telefoonnummer:</label>
                                        <input
                                            type="tel"
                                            className="border p-2 w-full"
                                            value={userData?.TelefoonNummer || ''}
                                            onChange={(e) => setUserData({ ...userData, TelefoonNummer: e.target.value })}
                                        />
                                        <label>Adres:</label>
                                        <input
                                            type="text"
                                            className="border p-2 w-full"
                                            value={userData?.StraatHuisnummer || ''}
                                            onChange={(e) => setUserData({ ...userData, StraatHuisnummer: e.target.value })}
                                        />
                                        <label>Postcode:</label>
                                        <input
                                            type="text"
                                            className="border p-2 w-full"
                                            value={userData?.Postcode || ''}
                                            onChange={(e) => setUserData({ ...userData, Postcode: e.target.value })}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleSave}
                                            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                                        >
                                            Opslaan
                                        </button>
                                    </form>
                                </div>
                            )
                        }





                        {/* Business */}{
                            activeTab === 'abonnementsbeheer' && (
                                <div>
                                    <h3 className="text-lg font-medium">Abonnementsbeheer</h3>
                                    <form onSubmit={handleAbonnementAanvraag}>
                                        <label>Nieuw abonnement aanvragen:</label>
                                        <select
                                            value={abonnementType}
                                            onChange={(e) => setAbonnementType(e.target.value)}
                                            className="border p-2 w-full"
                                            required
                                        >
                                            <option value="">Selecteer abonnementstype</option>
                                            <option value="abonnement1">Pay As You Go</option>
                                            <option value="abonnement2">Prepaid</option>
                                        </select>
                                        <label>Duur in maanden:</label>
                                        <input
                                            type="number"
                                            value={abonnementDuur}
                                            onChange={(e) => setAbonnementDuur(e.target.value)}
                                            className="border p-2 w-full"
                                            required
                                        />
                                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                                            Aanvragen
                                        </button>
                                    </form>
                                    <p>Bestaande abonnementen:</p>
                                    {/* Display existing subscriptions if needed */}
                                </div>
                            )
                        }
                        {
                            activeTab === 'medewerkerbeheer' && (
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
                            )
                        }

                        {activeTab === 'gehuurde-voertuigen' && (
                            <div>
                                <h3 className="text-lg font-medium">Gehuurde Voertuigen</h3>
                                <p>Bekijk voertuigen die door medewerkers zijn gehuurd.</p>
                                {/* Display rented vehicles */}
                            </div>
                        )}

                        {activeTab === 'facturatie' && (
                            <div>
                                <h3 className="text-lg font-medium">Facturatie & Facturen</h3>
                                <p>Bekijk en download facturen.</p>
                                {/* Display invoices */}
                            </div>
                        )}

                        {
                            activeTab === 'bedrijfsinfo' && (
                                <div>
                                    <h3 className="text-lg font-medium">Bedrijfsinformatie</h3>
                                    <form>
                                        <label>Bedrijfsnaam:</label>
                                        <input
                                            type="text"
                                            className="border p-2 w-full"
                                            value={userData?.BedrijfNaam || ''}
                                            readOnly
                                        />
                                        <label>KVK Nummer:</label>
                                        <input
                                            type="text"
                                            className="border p-2 w-full"
                                            value={userData?.KvkNummer || ''}
                                            readOnly
                                        />
                                        <label>E-mail:</label>
                                        <input
                                            type="email"
                                            className="border p-2 w-full"
                                            value={userData?.Email || ''}
                                            readOnly
                                        />
                                        <label>Adres:</label>
                                        <input
                                            type="text"
                                            className="border p-2 w-full"
                                            value={userData?.StraatHuisnummer || ''}
                                            readOnly
                                        />
                                        <label>Postcode:</label>
                                        <input
                                            type="text"
                                            className="border p-2 w-full"
                                            value={userData?.Postcode || ''}
                                            readOnly
                                        />
                                    </form>
                                </div>
                            )
                        }



                        {/* Employee (Medewerker, Frontoffice, Backoffice) */}
                        {
                            activeTab === 'abonnementsgoedkeuringen' && (
                                <div>
                                    <h3 className="text-lg font-medium">Abonnementsgoedkeuringen</h3>
                                    <p>Bekijk en keur abonnementsaanvragen van bedrijven goed of af.</p>
                                    <div className="mt-4">
                                        {abonnementAanvragen.map((aanvraag) => (
                                            <div key={aanvraag.Id} className="p-4 border rounded bg-gray-50 mb-4">
                                                <p><strong>Bedrijf:</strong> {aanvraag.BedrijfNaam}</p>
                                                <p><strong>Abonnementstype:</strong> {aanvraag.AbonnementId}</p>
                                                <p><strong>Status:</strong> {aanvraag.GoedGekeurd ? 'Goedgekeurd' : 'In afwachting'}</p>
                                                {!aanvraag.GoedGekeurd && (
                                                    <div className="mt-2">
                                                        <button
                                                            onClick={() => handleApproveOrReject(aanvraag.Id, true)}
                                                            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                                                        >
                                                            Goedkeuren
                                                        </button>
                                                        <button
                                                            onClick={() => handleApproveOrReject(aanvraag.Id, false)}
                                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                                        >
                                                            Afwijzen
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }

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
                                {/* Display vehicles */}
                            </div>
                        )}

                        {activeTab === 'schadeclaims' && (
                            <div>
                                <h3 className="text-lg font-medium">Schadeclaims</h3>
                                <p>Behandel schadeclaims en reparaties.</p>
                                {/* Display damage claims */}
                            </div>
                        )}

                        {activeTab === 'verhuuroverzicht' && (
                            <div>
                                <h3 className="text-lg font-medium">Verhuuroverzicht</h3>
                                <p>Bekijk alle lopende en eerdere verhuringen.</p>
                                {/* Display rental overview */}
                            </div>
                        )}

                        {activeTab === 'rapporten' && (
                            <div>
                                <h3 className="text-lg font-medium">Rapporten & Analyse</h3>
                                <p>Genereer rapporten over verhuringen, omzet en voertuiggebruik.</p>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded">Rapport genereren</button>
                                {/* Generate reports */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}