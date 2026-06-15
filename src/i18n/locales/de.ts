import { defineLocale, defineNamespace, defineTranslations } from 'ilingo';

/**
 * German catalog. Mirrors the namespace/key structure of the English
 * catalog (see `./en.ts`). Interpolation uses ilingo's `{{var}}` syntax.
 */
export default defineLocale('de', [
    defineNamespace('navigation', [defineTranslations({
        home: 'Startseite',
        news: 'Neuigkeiten',
        blog: 'Blog',
        team: 'Team',
        partners: 'Partner',
        publications: 'Publikationen',
    })]),

    defineNamespace('home', [defineTranslations({
        hero: {
            title: 'Willkommen bei PrivateAIM',
            subtitle: 'Förderung der medizinischen Forschung durch datenschutzfreundliche Analytik',
            explorePlatform: 'Unsere Plattform entdecken',
            joinNetwork: 'Netzwerk beitreten',
        },
        intro: {
            paragraph1: 'Medizinische Datenanalyse ist entscheidend für die Weiterentwicklung der Gesundheitsforschung und ermöglicht präzisere Diagnosen, innovative Behandlungen und zukunftsfähige Patientenversorgung. Aufgrund der Sensibilität solcher Daten sind jedoch strenge Datenschutzvorkehrungen erforderlich, um gesetzliche Vorschriften einzuhalten und die Vertraulichkeit der Patienten zu schützen.',
            paragraph2: 'Diese Herausforderung wird besonders bei KI-Anwendungen im medizinischen Bereich deutlich, wo umfangreiche Datensätze erforderlich sind, um zuverlässige und aussagekräftige Ergebnisse zu erzielen.',
        },
        mission: {
            title: 'Unsere Mission',
            paragraph1: 'PrivateAIM (Privacy-preserving Analytics in Medicine) widmet sich der Überbrückung der Kluft zwischen Datenschutz und medizinischer Innovation. Nach dem Prinzip "Code to Data" stellen wir sicher, dass Patientendaten sicher in Universitätskliniken gespeichert bleiben, während nur Analysealgorithmen ausgetauscht werden.',
            paragraph2: 'Dieser föderierte Ansatz garantiert, dass sensible medizinische Informationen ihre geschützte Umgebung nie verlassen und die Identität der Patienten jederzeit geschützt bleibt.',
            paragraph3: 'FLAME (Federated Learning and Analysis in Medicine) steht im Mittelpunkt unserer Initiative. Es ist eine neuartige Softwareplattform, die eine sichere, dezentrale Datenanalyse innerhalb der Medizininformatik-Initiative (MII) ermöglicht.',
        },
        howItWorks: {
            title: 'Wie es funktioniert',
            step1: {
                title: 'Daten bleiben lokal',
                description: 'Patientendaten bleiben in Krankenhaussystemen sicher und verlassen ihre geschützte Umgebung nie.',
            },
            step2: {
                title: 'Code-to-Data-Ansatz',
                description: 'Analysealgorithmen reisen zu den Daten, anstatt sensible Informationen zu bewegen.',
            },
            step3: {
                title: 'Föderierte Analyse',
                description: 'Ergebnisse werden über Institutionen hinweg aggregiert, wobei die Privatsphäre gewahrt und die Forschungsqualität verbessert wird.',
            },
            experienceFlame: 'Erleben Sie FLAME',
            flamePlatform: 'Unsere innovative Plattform für sichere, föderierte medizinische Datenanalyse',
            explorePlatform: 'Plattform erkunden',
        },
        vision: {
            title: 'Unsere Vision',
            paragraph1: 'Wir stellen uns eine Zukunft vor, in der KI-gestützte medizinische Forschung nahtlos mit Datenschutz-by-Design-Prinzipien integriert ist. PrivateAIM setzt neue Maßstäbe für sichere, föderierte medizinische KI, indem es ein Kooperationsnetzwerk aus Krankenhäusern, Forschern und Patienten fördert.',
            paragraph2: 'PrivateAIM bindet Patienten, [Partner](/partners:internal) und die Öffentlichkeit aktiv durch Workshops, Bildungsmaterialien und offenen Dialog ein, um breite Akzeptanz und Transparenz zu gewährleisten. Wir wollen KI und föderiertes Lernen entmystifizieren und alle Sicherheitsgarantien und Vorteile verständlich machen.',
            paragraph3: 'Während der Projektlaufzeit werden PrivateAIM und [FLAME](https://docs.privateaim.net:external) dem [MII](https://www.medizininformatik-initiative.de/de/start:external) eine sichere und skalierbare Lösung für die einrichtungsübergreifende Analyse medizinischer Daten bieten. Wir gestalten die Zukunft einer vertrauenswürdigen und wirkungsvollen medizinischen Forschung, indem wir KI-gesteuerte Innovationen im Gesundheitswesen ermöglichen und gleichzeitig die Privatsphäre der Patienten schützen.',
            contribute: 'Open-Source Beitragen',
            explanation: 'Erkunden Sie unsere Code-Repositories und tragen Sie zur Zukunft der datenschutzfreundlichen Forschung medizinischer Daten bei.',
            github: 'GitHub öffnen',
        },
        partners: {
            title: 'Vertraut von führenden Institutionen',
            viewAll: 'Alle Partner anzeigen',
        },
        news: {
            latestNews: 'Neueste Nachrichten',
            description: 'Hier finden Sie die neuesten Nachrichten und Updates zu PrivateAIM.',
            button: 'Mehr lesen',
        },
    })]),

    defineNamespace('footer', [defineTranslations({
        documentation: 'Dokumentation',
        flame: 'FLAME Plattform',
        github: 'GitHub',
        legal: 'Rechtliches',
        imprint: 'Impressum',
        privacy: 'Datenschutz',
        copyright: '© {{year}} PrivateAIM. Alle Rechte vorbehalten.',
        sponsor: 'Gefördert vom',
    })]),

    defineNamespace('imprint', [defineTranslations({
        title: 'Impressum',
        information: {
            entity: 'Berliner Institut für Gesundheitsforschung in der Charité',
            department: 'Translationsforschungsbereich der Charité – Universitätsmedizin Berlin',
            address1: 'Anna-Louisa-Karsch-Str. 2',
            address2: '10178 Berlin',
            contact: {
                phone: 'Tel.',
                fax: 'Fax',
                email: 'E-Mail',
            },
        },
        representation: {
            title: 'Vertretungsberechtigt',
        },
        contact: {
            title: 'Kontakt',
            department: 'AG Medizininformatik',
            institute: 'Berlin Institute of Health @Charité - Universitätsmedizin Berlin',
            address1: 'Charitéplatz 1',
            address2: '10117 Berlin',
            email: 'E-Mail',
        },
        disclaimer: {
            title: 'Haftungsausschluss',
            content: {
                title: 'Haftung für Inhalte',
                text: 'Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.',
            },
            links: {
                title: 'Haftung für Links',
                text: 'Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.',
            },
            copyright: {
                title: 'Urheberrecht',
                text: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.',
            },
        },
    })]),

    defineNamespace('partners', [defineTranslations({
        title: 'Unsere Partner',
        description: 'Insgesamt sind 17 Partner aus allen vier Konsortien der Medizininformatik-Initiative (MII) an PrivateAIM beteiligt. Mit dabei sind auch drei MII geförderte Nachwuchsgruppen. Das Projekt wird vom Universitätsklinikum Tübingen, dem Berlin Institute of Health in der Charité sowie der Technischen Universität München koordiniert.\n\nHier finden Sie eine Übersicht an beteiligte Universitäten und Forschungseinrichtungen:',
        subsection1: 'Koordination',
        subsection2: 'Projektpartner',
        subsection3: 'Assoziierte Partner',
        partner: {
            info: 'Mehr informationen →',
            name: 'Universitätsklinikum',
        },
        network: {
            title: 'Teil unseres Netzwerks werden',
            subtitle: 'Interessiert an einer Zusammenarbeit mit PrivateAIM? Wir sind stets auf der Suche nach Partnern, die unsere Vision einer datenschutzfreundlichen medizinischen Forschung teilen.\n',
            box1: {
                title: 'Zugang zu modernster Technologie',
                text: 'Arbeiten Sie mit unserem Team zusammen, um hochmoderne föderierte Lernsysteme zu implementieren.',
            },
            box2: {
                title: 'Gemeinsame Forschungsvorhaben',
                text: 'Nehmen Sie an institutionenübergreifenden Studien teil, ohne die Datensouveränität zu gefährden.',
            },
            box3: {
                title: 'Die Zukunft der medizinischen Forschung mitgestalten',
                text: 'Helfen Sie mit, Standards und Best Practices für datenschutzfreundliche Analysen zu definieren.',
            },
            button: 'Kontaktieren Sie uns für eine Partnerschaft',
        },
    })]),

    defineNamespace('privacy', [defineTranslations({
        title: 'Datenschutzerklärung',
    })]),

    defineNamespace('cookie', [defineTranslations({
        title: 'Cookie-Einstellungen',
        subtitle: 'Diese Website verwendet Cookies, um Ihr Browsing-Erlebnis zu verbessern und Analysen zur Website-Nutzung durchzuführen. Sie können selbst entscheiden, welche Cookies Sie zulassen möchten.\n',
        accept: 'Alle akzeptieren',
        deny: 'Nur notwendige',
        preference: 'Auswahl speichern',
        setting: {
            required: {
                title: 'Notwendige Cookies',
                description: 'Diese Cookies sind für das Funktionieren der Website erforderlich und können nicht deaktiviert werden.',
            },
            analysis: {
                title: 'Analyse-Cookies',
                description: 'Diese Cookies ermöglichen es uns, Besuche und Verkehrsquellen anonymisiert zu zählen, damit wir die Leistung unserer Website messen und verbessern können.',
            },
        },
    })]),

    defineNamespace('team', [defineTranslations({
        title: 'Unser Team',
        subtitle: 'Lernen Sie die engagierten Personen kennen, die an der Weiterentwicklung datenschutzfreundlicher Analytik in der Medizin arbeiten.',
        leadership: 'Projektleitung',
        alumni: 'Alumni',
        alumniNote: 'Wir danken unseren Alumni für ihre wertvollen Beiträge zum Projekt.',
    })]),

    defineNamespace('publications', [defineTranslations({
        title: 'Publikationen',
        subtitle: 'Entdecken Sie unsere Forschung und Publikationen im Bereich der datenschutzfreundlichen medizinischen Analytik.',
        readMore: 'Publikation lesen',
        searchPlaceholder: 'Suche nach Titel, Autor oder Venue...',
        results: 'Publikationen',
        noResults: 'Keine Publikationen gefunden.',
        resetSearch: 'Suche zurücksetzen',
    })]),

    defineNamespace('news', [defineTranslations({
        title: 'News',
        subtitle: 'Hier finden Sie eine Übersicht der aktuellen News im Kontext von PrivateAIM.',
        noItems: 'Keine Neuigkeiten für dieses Jahr verfügbar.',
    })]),
]);
