import React from 'react';

function Page() {
    return (
        <div lang="nl" className="max-w-4xl mx-auto py-8">
            <header role="banner" className="mb-8">
                <h1 className="text-4xl font-bold mb-4">Privacyverklaring</h1>
                <p className="text-gray-600">
                    Laatst bijgewerkt: <time dateTime="2023-10-01">1 oktober 2023</time>
                </p>
            </header>
            
            <main role="main">
                <article className="space-y-8">
                    <section aria-labelledby="section1">
                        <h2 id="section1" className="text-2xl font-semibold mb-4">1. Inleiding</h2>
                        <p className="text-gray-800 leading-relaxed">
                            Wij hechten grote waarde aan de bescherming van uw privacy en persoonlijke gegevens. 
                            In deze privacyverklaring leggen we uit welke gegevens we verzamelen, waarom we deze 
                            verzamelen, en hoe we deze gebruiken en beschermen.
                        </p>
                    </section>

                    <section aria-labelledby="section2">
                        <h2 id="section2" className="text-2xl font-semibold mb-4">2. Wie zijn wij</h2>
                        <address className="not-italic">
                            <p className="font-semibold">CarAndAll B.V.</p>
                            <p>Hoofdstraat 1, 2511 AA Den Haag</p>
                            <p>+31 (0)70 123 4567</p>
                            <p>KVK: 5747657867</p>
                        </address>
                    </section>

                    <section aria-labelledby="section3">
                        <h2 id="section3" className="text-2xl font-semibold mb-4">3. Welke gegevens verzamelen wij</h2>
                        
                        <article aria-labelledby="subsection3-1" className="mb-6">
                            <h3 id="subsection3-1" className="text-xl font-semibold mb-3">3.1 Persoonsgegevens</h3>
                            <p className="mb-2">Wij verzamelen de volgende persoonsgegevens:</p>
                            <ul role="list" className="list-disc pl-6 space-y-1">
                                <li role="listitem">Naam</li>
                                <li role="listitem">Adres</li>
                                <li role="listitem">Telefoonnummer</li>
                                <li role="listitem">E-mailadres</li>
                                <li role="listitem">IP-adres</li>
                                <li role="listitem">Betaalgegevens</li>
                            </ul>
                        </article>

                        <article aria-labelledby="subsection3-2">
                            <h3 id="subsection3-2" className="text-xl font-semibold mb-3">3.2 Cookies</h3>
                            <p className="mb-4">Onze website maakt gebruik van cookies. Dit zijn kleine tekstbestanden die op uw apparaat worden opgeslagen.</p>
                            
                            <div className="space-y-6">
                                <section aria-labelledby="cookies-functional">
                                    <h4 id="cookies-functional" className="text-lg font-medium mb-2">Functionele cookies</h4>
                                    <ul role="list" className="list-disc pl-6 space-y-1">
                                        <li role="listitem">Deze zijn noodzakelijk voor het functioneren van de website</li>
                                        <li role="listitem">Worden gebruikt voor het onthouden van uw voorkeuren</li>
                                        <li role="listitem">Kunnen niet worden uitgeschakeld</li>
                                    </ul>
                                </section>

                                <section aria-labelledby="cookies-analytical">
                                    <h4 id="cookies-analytical" className="text-lg font-medium mb-2">Analytische cookies</h4>
                                    <ul role="list" className="list-disc pl-6 space-y-1">
                                        <li role="listitem">Worden gebruikt om het websitegebruik te analyseren</li>
                                        <li role="listitem">Helpen ons de website te verbeteren</li>
                                        <li role="listitem">Zijn geanonimiseerd waar mogelijk</li>
                                    </ul>
                                </section>

                                <section aria-labelledby="cookies-marketing">
                                    <h4 id="cookies-marketing" className="text-lg font-medium mb-2">Marketing cookies (indien van toepassing)</h4>
                                    <ul role="list" className="list-disc pl-6 space-y-1">
                                        <li role="listitem">Worden gebruikt voor gepersonaliseerde advertenties</li>
                                        <li role="listitem">Volgen uw surfgedrag op onze website</li>
                                        <li role="listitem">Kunnen worden uitgeschakeld via uw cookievoorkeuren</li>
                                    </ul>
                                </section>
                            </div>
                        </article>
                    </section>

                    <section aria-labelledby="section11">
                        <h2 id="section11" className="text-2xl font-semibold mb-4">11. Klachten</h2>
                        <p className="text-gray-800 leading-relaxed">
                            Als u een klacht heeft over de verwerking van uw persoonsgegevens, kunt u deze indienen bij de 
                            <a 
                                href="https://www.autoriteitpersoonsgegevens.nl" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
                            >
                                Autoriteit Persoonsgegevens
                            </a>.
                        </p>
                    </section>
                </article>
            </main>
        </div>
    );
}

export default Page;