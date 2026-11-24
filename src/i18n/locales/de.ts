import { defineLocale, defineNamespace, defineTranslations } from 'ilingo';

/**
 * German catalog. Mirrors the namespace/key structure of the English
 * catalog (see `./en.ts`). Interpolation uses ilingo's `{{var}}` syntax.
 */
export default defineLocale('de', [
    defineNamespace('navigation', [defineTranslations({
        home: 'Startseite',
        flame: 'FLAME',
        news: 'Neuigkeiten',
        team: 'Team',
        partners: 'Partner',
        publications: 'Publikationen',
        skipToContent: 'Zum Inhalt springen',
        changeLanguage: 'Sprache wechseln',
    })]),

    defineNamespace('home', [defineTranslations({
        hero: {
            title: 'Datenschutzfreundliche Analytik für die medizinische Forschung',
            subtitle: 'PrivateAIM entwickelt FLAME, eine föderierte Plattform, die die Analyse zu den Daten an deutschen Universitätskliniken bringt.',
            explorePlatform: 'Unsere Plattform entdecken',
            joinNetwork: 'Netzwerk beitreten',
        },
        intro: {
            title: 'Was ist PrivateAIM?',
            definition: 'PrivateAIM (Privacy-Preserving Analytics in Medicine) ist ein Forschungskonsortium aus 15 Partnern der Medizininformatik-Initiative (MII), gefördert vom Bundesministerium für Forschung, Technologie und Raumfahrt (BMFTR) von April 2023 bis zum 31. März 2027. Es entwickelt [FLAME](/flame:internal) (Federated Learning and Analysis in Medicine), eine quelloffene Plattform im produktiven Einsatz, die medizinische Daten über Universitätskliniken hinweg analysiert: Patientendaten bleiben am jeweiligen Standort, nur der Analysecode kommt zu den Daten, und nur aggregierte Ergebnisse werden zurückgegeben.',
            paragraph2: 'Medizinische Forschung und insbesondere KI brauchen Daten aus vielen Kliniken, um belastbare Ergebnisse zu liefern. Gesundheitsdaten sind jedoch sensibel und streng geschützt. Föderierte Analysen lösen diesen Konflikt: Statt Daten zentral zu sammeln, schicken Forschende ihre Analyse zu den Daten.',
        },
        capabilities: {
            title: 'Was Sie mit FLAME machen können',
            statistics: {
                title: 'Statistiken und Kohortenzählungen',
                description: 'Zählen Sie Kohorten und berechnen Sie deskriptive Statistiken über mehrere Standorte, auf FHIR-Daten wie dem MII-Kerndatensatz oder auf Dateien wie CSV oder VCF.',
            },
            learning: {
                title: 'Föderiertes Lernen',
                description: 'Trainieren Sie Machine-Learning-Modelle über mehrere Runden, während die Trainingsdaten die beteiligten Kliniken nie verlassen.',
            },
            privacy: {
                title: 'Datenschutzfördernde Technologien',
                description: 'Ergänzen Sie die Ergebnisse um lokale Differential Privacy, oder nutzen Sie homomorphe Verschlüsselung, sodass nur das Gesamtergebnis aller Standorte sichtbar ist.',
            },
            code: {
                title: 'Eigene Python-Analysen',
                description: 'Schreiben Sie Ihre Analyse in Python mit dem FLAME-SDK, testen Sie sie lokal und wählen Sie ein Master-Image mit den benötigten Abhängigkeiten.',
            },
            examples: 'Beispielanalysen in der [FLAME-Dokumentation](https://docs.privateaim.net/guide/user/analysis-coding:external) (Englisch) behandeln Long COVID (PASC), Überlebenszeitanalysen, logistische Regression, Bildklassifikation und die Qualitätskontrolle genomischer Daten.',
        },
        faq: {
            title: 'Häufige Fragen',
            q1: {
                question: 'Verlassen Patientendaten die Klinik?',
                answer: 'Nein. Jeder teilnehmende Standort betreibt einen FLAME Node direkt bei seinen eigenen Daten. Nur der Analysecode kommt zu den Daten, und nur aggregierte Ergebnisse werden zurückgegeben. Der zentrale FLAME Hub hat nie Zugriff auf Patientendaten.',
            },
            q2: {
                question: 'Sind die Ergebnisse anonym?',
                answer: 'Aggregation allein garantiert keine Anonymität. Deshalb prüft jeder Standort jede Analyse, bevor sie läuft, auch daraufhin, ob ihre Ergebnisse angemessen sind. Lokale Differential Privacy und homomorphe Verschlüsselung können zusätzlich schützen. Die [FLAME-Seite](/flame:internal) beschreibt die Schutzmaßnahmen und ihre Grenzen.',
            },
            q3: {
                question: 'Wer kann FLAME nutzen?',
                answer: 'Forschende reichen Analysen über den FLAME Hub ein. Universitätskliniken und andere Einrichtungen nehmen teil, indem sie einen FLAME Node betreiben, und entscheiden für jedes Projekt selbst, ob sie mitmachen. Die [FLAME-Seite](/flame:internal) bietet Einstiege für Forschende, Standorte, Datenschutzbeauftragte sowie Patientinnen und Patienten.',
            },
            q4: {
                question: 'Ist FLAME Open Source?',
                answer: 'Ja. Der Quellcode von FLAME Hub und Node ist öffentlich auf [GitHub](https://github.com/PrivateAIM:external) verfügbar, und die [Dokumentation](https://docs.privateaim.net/getting-started/:external) erklärt Installation und Nutzung.',
            },
            q5: {
                question: 'Wer steht hinter PrivateAIM?',
                answer: 'PrivateAIM vereint 15 [Partner](/partners:internal) aus allen vier Konsortien der Medizininformatik-Initiative (MII), koordiniert vom Universitätsklinikum Tübingen, dem Berlin Institute of Health in der Charité und der Technischen Universität München. Das Projekt wird bis zum 31. März 2027 vom BMFTR gefördert.',
            },
        },
        mission: {
            title: 'Unsere Mission',
            paragraph1: 'PrivateAIM (Privacy-preserving Analytics in Medicine) widmet sich der Überbrückung der Kluft zwischen Datenschutz und medizinischer Innovation. Nach dem Prinzip "Code to Data" bleiben Patientendaten am jeweiligen teilnehmenden Standort: Nur der Analysecode gelangt zu den Daten, und nur aggregierte Ergebnisse werden zurückgegeben.',
            paragraph2: 'Jeder Standort prüft und genehmigt den Analysecode, bevor er ausgeführt wird. Da Aggregation allein keine Anonymität garantiert, wird dabei auch bewertet, ob die zurückgegebenen Ergebnisse angemessen sind, unterstützt durch Schutzmaßnahmen wie den Ende-zu-Ende-verschlüsselten Austausch zwischen den Standorten und optionale lokale Differential Privacy.',
            paragraph3: 'FLAME (Federated Learning and Analysis in Medicine) steht im Mittelpunkt unserer Initiative. Es ist die von PrivateAIM entwickelte Plattform für die sichere verteilte Analyse medizinischer Daten innerhalb der Medizininformatik-Initiative (MII).',
        },
        howItWorks: {
            title: 'Wie es funktioniert',
            step1: {
                title: 'Daten bleiben lokal',
                description: 'Patientendaten bleiben am jeweiligen teilnehmenden Standort und werden nie an ein zentrales System oder andere Standorte übertragen.',
            },
            step2: {
                title: 'Code-to-Data-Ansatz',
                description: 'Der Analysecode gelangt zu den Daten, und jeder Standort prüft und genehmigt ihn vor der Ausführung.',
            },
            step3: {
                title: 'Föderierte Analyse',
                description: 'Nur aggregierte Ergebnisse werden zurückgegeben: Die Ergebnisse der Standorte werden zusammengeführt, und nur dieses Gesamtergebnis wird den Forschenden bereitgestellt.',
            },
            experienceFlame: 'Erleben Sie FLAME',
            flamePlatform: 'Unsere Plattform für die sichere verteilte Analyse medizinischer Daten',
            explorePlatform: 'Plattform erkunden',
        },
        facts: {
            title: 'Das Projekt im Überblick',
            funding: 'Förderung',
            fundingValue: 'Bundesministerium für Forschung, Technologie und Raumfahrt (BMFTR)',
            network: 'Netzwerk',
            networkValue: '15 Partner aus allen vier Konsortien der Medizininformatik-Initiative (MII)',
            platform: 'Plattform',
            platformValue: 'FLAME, im produktiven Einsatz',
            end: 'Reguläres Projektende',
            endValue: '31. März 2027',
            code: 'Code',
            codeValue: 'Open Source auf GitHub',
        },
        vision: {
            title: 'Unsere Vision',
            paragraph1: 'Wir stellen uns eine Zukunft vor, in der KI-gestützte medizinische Forschung nahtlos mit Datenschutz-by-Design-Prinzipien integriert ist. PrivateAIM setzt neue Maßstäbe für sichere, föderierte medizinische KI, indem es ein Kooperationsnetzwerk aus Krankenhäusern, Forschern und Patienten fördert.',
            paragraph2: 'PrivateAIM bindet Patienten, [Partner](/partners:internal) und die Öffentlichkeit aktiv durch Workshops, Bildungsmaterialien und offenen Dialog ein, um breite Akzeptanz und Transparenz zu gewährleisten. Wir wollen KI und föderiertes Lernen entmystifizieren und ihre Schutzmaßnahmen, Grenzen und Vorteile verständlich machen.',
            paragraph3: 'Mit [FLAME](/flame:internal) stellt PrivateAIM der [MII](https://www.medizininformatik-initiative.de/de/start:external) eine sichere und skalierbare Lösung für die einrichtungsübergreifende Analyse medizinischer Daten bereit, die produktiv im Einsatz ist. Wir gestalten die Zukunft einer vertrauenswürdigen und wirkungsvollen medizinischen Forschung, indem wir KI-gesteuerte Innovationen im Gesundheitswesen ermöglichen und gleichzeitig die Privatsphäre der Patienten schützen.',
            contribute: 'Open-Source-Beiträge',
            explanation: 'Erkunden Sie unsere Code-Repositories und tragen Sie zur Zukunft der datenschutzfreundlichen Forschung medizinischer Daten bei.',
            github: 'GitHub öffnen',
        },
        partners: {
            title: 'Unsere Konsortialpartner',
            viewAll: 'Alle Partner anzeigen',
        },
        news: {
            latestNews: 'Aktuelle Neuigkeiten',
            description: 'Hier finden Sie aktuelle Neuigkeiten und Updates zu PrivateAIM.',
            button: 'Mehr lesen',
        },
    })]),

    defineNamespace('flame', [defineTranslations({
        title: 'FLAME',
        subtitle: 'Federated Learning and Analysis in Medicine: die von PrivateAIM entwickelte Plattform',
        status: 'FLAME ist im produktiven Einsatz.',
        context: 'FLAME (Federated Learning and Analysis in Medicine) wird von PrivateAIM entwickelt, einem vom BMFTR geförderten Konsortium der Medizininformatik-Initiative (MII). Mit anderen Softwareprojekten namens Flame hat es nichts zu tun.',
        lead: 'Mit FLAME können Forschende medizinische Daten mehrerer Einrichtungen analysieren, ohne dass die Daten diese jemals verlassen. Statt Daten zentral zu sammeln, bringt FLAME den Analysecode zu den Daten. Zurückgegeben werden nur aggregierte Ergebnisse.',
        architecture: {
            title: 'So funktioniert FLAME',
            body: 'FLAME besteht aus zwei Teilen: einem zentralen Hub und einem Node an jedem teilnehmenden Standort. Der Hub koordiniert, die Nodes rechnen.',
            step1: 'Jeder teilnehmende Standort betreibt einen Node direkt bei seinen eigenen Daten. Patientendaten werden nie an den Hub oder an andere Standorte übertragen.',
            step2: 'Jeder Standort entscheidet selbst, ob er an einem Projekt teilnimmt, prüft den Analysecode vor der Ausführung und startet die Ausführung selbst.',
            step3: 'Die Analyse läuft an jedem Standort. Ein Aggregator führt die Ergebnisse der Standorte zusammen, und nur dieses Gesamtergebnis wird den Forschenden bereitgestellt.',
            step4: 'Bei iterativen Verfahren wie föderiertem Lernen wiederholt sich das über mehrere Runden.',
        },
        safeguards: {
            title: 'Schutzmaßnahmen',
            review: 'Eine Analyse wird erst gebaut und ausgeführt, wenn alle teilnehmenden Nodes ihren Code genehmigt haben.',
            isolation: 'Jede Analyse läuft in einem eigenen Container ohne Internetzugang.',
            encryption: 'Alle Verbindungen nutzen TLS. Nachrichten und Zwischenergebnisse zwischen den Nodes sind zusätzlich Ende-zu-Ende-verschlüsselt, sodass der Hub sie nicht lesen kann.',
            hub: 'Der Hub hat nie Zugriff auf Patientendaten.',
            privacy: 'Analysen können datenschutzfördernde Verfahren wie lokale Differential Privacy nutzen.',
            access: 'Nutzende, Rollen und Berechtigungen werden je Organisation verwaltet. Das Starten von Analysen und das Einrichten von Datenquellen ist dem Personal des Standorts vorbehalten.',
        },
        limits: {
            title: 'Grenzen',
            body: 'Aggregation allein garantiert keine Anonymität. FLAME erzwingt nicht automatisch Mindestfallzahlen, k-Anonymitäts-Schwellen oder andere Ausgabeprüfungen. Ob die zurückgegebenen Ergebnisse angemessen sind, wird deshalb bei der Prüfung jeder Analyse bewertet.',
        },
        resources: {
            title: 'Mehr erfahren',
            docs: 'Dokumentation für Forschende und Standort-Administration',
            code: 'Quellcode auf GitHub',
            publications: 'Publikationen des PrivateAIM-Konsortiums',
            predecessor: 'Das Vorgängerprojekt: Personal Health Train (PHT)',
            talk: 'Vortrag zur FLAME-Plattform (MIDI-Kolloquium, Video, Englisch)',
            slides: 'FLAME-Architektur und Policy-Framework (GMDS 2025, Folien)',
        },
        audiences: {
            title: 'Für wen ist FLAME?',
            researchers: {
                title: 'Forschende',
                body: 'Schreiben Sie eine Analyse, testen Sie sie lokal mit dem FLAME-SDK und führen Sie sie an mehreren Standorten aus. Sie erhalten ausschließlich aggregierte Ergebnisse.',
                link: 'Erste Analyse ausführen (Englisch)',
            },
            sites: {
                title: 'Datenintegrationszentren und Standorte',
                body: 'Jeder Standort betreibt einen FLAME Node auf einem eigenen Kubernetes-Server. Der Node benötigt nur ausgehendes HTTPS, ohne eingehenden Zugriff aus dem Internet. Analysen können Daten im FHIR-Format abfragen, etwa den MII-Kerndatensatz.',
                link: 'Node installieren (Englisch)',
            },
            dpo: {
                title: 'Datenschutzbeauftragte',
                body: 'Jeder Standort prüft und genehmigt jede Analyse, bevor sie läuft. Analysen laufen in isolierten Containern, Patientendaten bleiben am Standort, und nur aggregierte Ergebnisse werden zurückgegeben. Beachten Sie auch die Grenzen oben.',
                link: 'FAQ zu Sicherheit und Datenschutz (Englisch)',
                flyer: 'Informationen zum Datenschutz (PDF)',
            },
            patients: {
                title: 'Patientinnen, Patienten und Öffentlichkeit',
                body: 'Mit FLAME bleiben Ihre Daten in Ihrer Klinik. Forschende schicken ihre Analyse zu den Daten, statt die Daten zentral zu sammeln.',
                link: 'Informationen für Patientinnen und Patienten (PDF)',
            },
        },
    })]),

    defineNamespace('footer', [defineTranslations({
        documentation: 'Dokumentation',
        flame: 'FLAME Plattform',
        github: 'GitHub',
        references: 'Referenzen',
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
        representation: { title: 'Vertretungsberechtigt' },
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
        description: 'Insgesamt sind 15 Partner aus allen vier Konsortien der Medizininformatik-Initiative (MII) an PrivateAIM beteiligt. Mit dabei sind auch drei MII geförderte Nachwuchsgruppen. Das Projekt wird vom Universitätsklinikum Tübingen, dem Berlin Institute of Health in der Charité sowie der Technischen Universität München koordiniert.\n\nHier finden Sie eine Übersicht an beteiligte Universitäten und Forschungseinrichtungen:',
        subsection1: 'Koordination',
        subsection2: 'Projektpartner',
        subsection3: 'Assoziierte Partner',
        partner: {
            info: 'Mehr Informationen →',
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
        },
    })]),

    defineNamespace('privacy', [defineTranslations({ title: 'Datenschutzerklärung' })]),

    defineNamespace('cookie', [defineTranslations({
        title: 'Cookie-Einstellungen',
        subtitle: 'Diese Website verwendet Cookies, um Ihr Browsing-Erlebnis zu verbessern und Analysen zur Website-Nutzung durchzuführen. Sie können selbst entscheiden, welche Cookies Sie zulassen möchten.\n',
        accept: 'Alle akzeptieren',
        deny: 'Nur notwendige',
        customize: 'Anpassen',
        settings: 'Cookie-Einstellungen öffnen',
        preference: 'Auswahl speichern',
        setting: {
            required: {
                title: 'Notwendige Cookies',
                description: 'Diese Cookies sind für das Funktionieren der Website erforderlich und können nicht deaktiviert werden.',
            },
            analysis: {
                title: 'Analyse-Cookies',
                description: 'Mit diesen optionalen Cookies nutzen wir Google Analytics, um Besuche, Verkehrsquellen und die Nutzung unserer Website zu messen. Details finden Sie in unserer Datenschutzerklärung.',
            },
        },
    })]),

    defineNamespace('team', [defineTranslations({
        title: 'Unser Team',
        subtitle: 'Lernen Sie die engagierten Personen kennen, die an der Weiterentwicklung datenschutzfreundlicher Analytik in der Medizin arbeiten.',
        core: 'Kernteam',
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
        title: 'Neuigkeiten',
        subtitle: 'Hier finden Sie eine Übersicht der aktuellen Neuigkeiten rund um PrivateAIM.',
        noItems: 'Keine Neuigkeiten für dieses Jahr verfügbar.',
    })]),

    defineNamespace('references', [defineTranslations({
        successorHeading: 'Jetzt Teil von FLAME',
        learnMore: 'Mehr über FLAME',
        publications: 'Publikationen',
        readPaper: 'Publikation lesen',
        talks: 'Vorträge',
        slides: 'Folien',
        opensInNewTab: 'öffnet in neuem Tab',
        links: 'Links & Code',
    })]),
]);
