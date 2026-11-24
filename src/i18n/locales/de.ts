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
            badgeFunding: 'Gefördert vom BMFTR',
            badgeMii: 'Teil der Medizininformatik-Initiative',
            badgeOpenSource: 'Open Source',
        },
        intro: {
            title: 'Was ist PrivateAIM?',
            definition: 'PrivateAIM (Privacy-Preserving Analytics in Medicine) ist ein Forschungskonsortium aus 15 Partnern der Medizininformatik-Initiative (MII), gefördert vom Bundesministerium für Forschung, Technologie und Raumfahrt (BMFTR) von April 2023 bis zum 31. März 2027. Es entwickelt [FLAME](/flame:internal) (Federated Learning and Analysis in Medicine), eine quelloffene Plattform im produktiven Einsatz, die medizinische Daten über Universitätskliniken hinweg analysiert: Patientendaten bleiben am jeweiligen Standort, nur der Analysecode kommt zu den Daten, und nur aggregierte Ergebnisse werden zurückgegeben.',
            paragraph2: 'Medizinische Forschung und insbesondere KI brauchen Daten aus vielen Kliniken, um belastbare Ergebnisse zu liefern. Gesundheitsdaten sind jedoch sensibel und streng geschützt. [Föderierte Analysen](/federated-analysis:internal) lösen diesen Konflikt: Statt Daten zentral zu sammeln, schicken Forschende ihre Analyse zu den Daten.',
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
                description: 'Ergänzen Sie ein numerisches Ergebnis um lokale Differential Privacy, oder nutzen Sie homomorphe Verschlüsselung, sodass nur das Gesamtergebnis aller Standorte sichtbar ist.',
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
                answer: 'Forschende reichen Analysen über den FLAME Hub ein. Universitätskliniken und andere Einrichtungen nehmen teil, indem sie einen FLAME Node betreiben, und entscheiden für jedes Projekt selbst, ob sie mitmachen. Die [FLAME-Seite](/flame#audiences:internal) bietet Einstiege für Forschende, Standorte, Datenschutzbeauftragte sowie Patientinnen und Patienten.',
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
            networkValue: 'aus allen vier Konsortien der Medizininformatik-Initiative (MII)',
            platform: 'Plattform',
            platformValue: 'im produktiven Einsatz',
            end: 'Reguläres Projektende',
            endValue: '31. März 2027',
            code: 'Code',
            codeValue: 'auf GitHub',
            fundingHeadline: 'BMFTR',
            networkHeadline: '15 Partner',
            platformHeadline: 'FLAME',
            endHeadline: '2027',
            codeHeadline: 'Open Source',
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
            allNews: 'Alle Neuigkeiten',
        },
    })]),

    defineNamespace('explainer', [defineTranslations({
        lastUpdated: 'Zuletzt aktualisiert: {{date}}',
        title: 'Was ist föderierte Analyse?',
        subtitle: 'Eine kurze Einführung in die Analyse medizinischer Daten ohne zentrale Datensammlung',
        intro: 'Föderierte Analyse bedeutet, Daten auszuwerten, die auf mehrere Einrichtungen verteilt sind, ohne sie an einem Ort zusammenzuführen. Statt Patientendaten in eine zentrale Datenbank zu kopieren, wird die Analyse an jede Einrichtung geschickt, läuft dort bei den lokalen Daten, und nur die Ergebnisse kommen zurück. Zusammengeführt beantworten diese Ergebnisse dieselbe Forschungsfrage wie eine zentrale Analyse, mit gleichen oder sehr ähnlichen Ergebnissen.',
        problem: {
            title: 'Warum nicht einfach zentral sammeln?',
            body: 'Viele Forschungsfragen, von seltenen Erkrankungen bis zum Training verlässlicher KI-Modelle, brauchen Daten von mehr Patientinnen und Patienten, als eine einzelne Klinik hat. Eine zentrale Sammlung dieser Daten stößt auf rechtliche, organisatorische und sicherheitstechnische Hürden: Gesundheitsdaten sind besonders geschützt, jede Übermittlung muss begründet sein, und eine zentrale Datenbank ist ein attraktives Angriffsziel. Föderierte Analysen verringern diese Hürden, weil die Daten die Klinik nie verlassen müssen.',
        },
        idea: {
            title: 'Die Idee: Die Analyse kommt zu den Daten',
            body: 'Forschende schreiben die Analyse einmal. Jede teilnehmende Klinik prüft sie, führt sie auf ihren eigenen Daten aus und gibt nur ein Zwischenergebnis zurück, zum Beispiel eine Anzahl oder ein Modell-Update. Ein Aggregator führt diese Zwischenergebnisse zum Endergebnis für die Forschenden zusammen.',
            researcher: 'Forschende',
            code: 'Analysecode',
            hospital: 'Klinik',
            data: 'Daten bleiben hier',
            result: 'Gesamtergebnis',
        },
        kinds: {
            title: 'Föderierte Analyse und föderiertes Lernen',
            analysis: 'Föderierte Analyse',
            analysisBody: 'Statistiken wie Anzahlen, Mittelwerte oder Regressionsmodelle werden an jedem Standort berechnet und einmal zusammengeführt. Beispiel: Wie viele Patientinnen und Patienten haben über alle Standorte hinweg eine bestimmte Diagnose?',
            learning: 'Föderiertes Lernen',
            learningBody: 'Ein Machine-Learning-Modell wird über mehrere Runden trainiert. In jeder Runde trainieren die Standorte auf ihren lokalen Daten und teilen nur die aktualisierten Modellparameter, die zu einem besseren gemeinsamen Modell zusammengeführt werden.',
        },
        shared: {
            title: 'Was geteilt wird und was nicht',
            sharedTitle: 'Wandert zwischen den Standorten',
            shared1: 'Der Analysecode, nachdem er geprüft wurde',
            shared2: 'Zwischen- und Gesamtergebnisse, etwa Anzahlen oder Modellparameter',
            notSharedTitle: 'Bleibt an jedem Standort',
            notShared1: 'Patientenbezogene Einzeldaten',
            notShared2: 'Der direkte Zugriff auf die lokalen Datenbanken',
        },
        protection: {
            title: 'Föderiert heißt nicht automatisch anonym',
            body: 'Auch aggregierte Ergebnisse können Rückschlüsse auf einzelne Personen erlauben, etwa wenn eine Gruppe sehr klein ist. Föderierte Analysen werden deshalb mit weiteren Schutzmaßnahmen kombiniert: Jeder Standort prüft den Code und die zu erwartenden Ergebnisse, bevor er läuft, Differential Privacy versieht Ergebnisse mit kalibriertem Rauschen, und homomorphe Verschlüsselung erlaubt es, Werte zusammenzuführen, ohne die Beiträge der anderen Standorte zu sehen.',
        },
        practice: {
            title: 'Föderierte Analyse in der Praxis: FLAME',
            body: 'FLAME (Federated Learning and Analysis in Medicine) ist die von PrivateAIM entwickelte Plattform für föderierte Analysen und föderiertes Lernen an deutschen Universitätskliniken innerhalb der Medizininformatik-Initiative (MII). Sie ist quelloffen und im produktiven Einsatz.',
            flame: 'So funktioniert FLAME',
            docs: 'Zur FLAME-Dokumentation (Englisch)',
        },
    })]),

    defineNamespace('flame', [defineTranslations({
        lastUpdated: 'Zuletzt aktualisiert: {{date}}',
        title: 'FLAME',
        subtitle: 'Federated Learning and Analysis in Medicine: die von PrivateAIM entwickelte Plattform',
        status: 'FLAME ist im produktiven Einsatz.',
        explainer: {
            title: 'Neu bei föderierter Analyse?',
            text: 'Eine kurze Einführung: wie Analysen ohne zentrale Datensammlung funktionieren und wo ihre Grenzen liegen.',
        },
        context: 'FLAME (Federated Learning and Analysis in Medicine) wird von PrivateAIM entwickelt, einem vom BMFTR geförderten Konsortium der Medizininformatik-Initiative (MII). Mit anderen Softwareprojekten namens Flame hat es nichts zu tun.',
        lead: 'Mit FLAME können Forschende medizinische Daten mehrerer Einrichtungen analysieren, ohne dass die Daten diese jemals verlassen. Statt Daten zentral zu sammeln, bringt FLAME den Analysecode zu den Daten. Zurückgegeben werden nur aggregierte Ergebnisse.',
        architecture: {
            title: 'So funktioniert FLAME',
            body: 'FLAME besteht aus zwei Teilen: einem zentralen Hub und einem Node an jedem teilnehmenden Standort. Der Hub koordiniert, die Nodes rechnen.',
            step1: 'Jeder teilnehmende Standort betreibt einen Node direkt bei seinen eigenen Daten. Patientendaten werden nie an den Hub oder an andere Standorte übertragen.',
            step2: 'Jeder Standort entscheidet selbst, ob er an einem Projekt teilnimmt, prüft den Analysecode vor der Ausführung und startet die Ausführung selbst.',
            step3: 'Die Analyse läuft an jedem Standort. Ein Aggregator führt die Ergebnisse der Standorte zusammen, und nur dieses Gesamtergebnis wird den Forschenden bereitgestellt.',
            step4: 'Bei iterativen Verfahren wie föderiertem Lernen wiederholt sich das über mehrere Runden.',
            figureAlt: 'FLAME-Architektur: Die Hub-Dienste bauen das Analyse-Image und speichern Ergebnisse, ein Node in jeder Klinik lädt das Image und führt es bei den lokalen Daten aus',
            figureCaption: 'Ablauf einer Analyse in FLAME (Quelle: FLAME-Dokumentation)',
        },
        safeguards: {
            title: 'Schutzmaßnahmen',
            review: 'Eine Analyse wird erst gebaut und ausgeführt, wenn alle teilnehmenden Nodes ihren Code genehmigt haben.',
            isolation: 'Jede Analyse läuft in einem eigenen Container ohne Internetzugang.',
            encryption: 'Alle Verbindungen nutzen TLS. Nachrichten und Zwischenergebnisse zwischen den Nodes sind zusätzlich Ende-zu-Ende-verschlüsselt, sodass der Hub sie nicht lesen kann.',
            hub: 'Der Hub hat nie Zugriff auf Patientendaten.',
            privacy: 'Analysen können datenschutzfördernde Verfahren wie lokale Differential Privacy nutzen (derzeit für ein einzelnes numerisches Ergebnis).',
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
                body: 'Jeder Standort betreibt einen FLAME Node in einem eigenen Kubernetes-Cluster. Der Node benötigt nur ausgehendes HTTPS, ohne eingehenden Zugriff aus dem Internet. Analysen können Daten im FHIR-Format abfragen, etwa den MII-Kerndatensatz.',
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

    defineNamespace('notFound', [defineTranslations({
        title: 'Seite nicht gefunden',
        text: 'Die gesuchte Seite gibt es nicht oder sie ist umgezogen. Diese Seiten helfen vielleicht weiter:',
        linksLabel: 'Vorgeschlagene Seiten',
        links: {
            home: { title: 'Startseite', text: 'PrivateAIM im Überblick' },
            flame: { title: 'FLAME', text: 'Die föderierte Analyseplattform' },
            explainer: { title: 'Was ist föderierte Analyse?', text: 'Eine kurze Einführung' },
            news: { title: 'Neuigkeiten', text: 'Veranstaltungen und Meilensteine' },
        },
    })]),

    defineNamespace('footer', [defineTranslations({
        documentation: 'Dokumentation',
        flame: 'FLAME-Dokumentation',
        project: 'Projekt',
        tagline: 'Datenschutzfreundliche Analytik in der Medizin: föderierte Analyse medizinischer Daten an deutschen Universitätskliniken.',
        partOf: 'Teil der',
        mii: 'Medizininformatik-Initiative (MII)',
        explainer: 'Was ist föderierte Analyse?',
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
        description: 'Insgesamt sind 15 Partner aus allen vier Konsortien der Medizininformatik-Initiative (MII) an PrivateAIM beteiligt. Mit dabei sind auch drei MII-geförderte Nachwuchsgruppen. Das Projekt wird vom Universitätsklinikum Tübingen, dem Berlin Institute of Health in der Charité sowie der Technischen Universität München koordiniert.\n\nHier finden Sie eine Übersicht der beteiligten Universitäten und Forschungseinrichtungen:',
        subtitle: '15 Partner aus allen vier Konsortien der Medizininformatik-Initiative',
        map: { label: 'Deutschlandkarte mit den Standorten der PrivateAIM-Partner' },
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
            button: 'Mit FLAME starten',
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
        categories: {
            conference: 'Konferenz & Vortrag',
            retreat: 'Retreat',
            workshop: 'Workshop',
            milestone: 'Meilenstein',
        },
        gallery: {
            open: 'Foto {{index}} von {{count}} öffnen',
            photo: 'Foto {{index}} von {{count}}',
            close: 'Schließen',
            previous: 'Vorheriges Foto',
            next: 'Nächstes Foto',
        },
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
