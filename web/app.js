document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const toggle = document.querySelector("[data-theme-toggle]");
  const icon = document.querySelector("[data-theme-icon]");
  const label = document.querySelector("[data-theme-label]");
  const langToggle = document.querySelector("[data-lang-toggle]");
  const langLabel = document.querySelector("[data-lang-label]");
  const pageKey = document.body.dataset.page;

  const translations = {
    home: {
      title: {
        en: "RealEstateSignal - Real Estate Lifecycle Data Management",
        de: "RealEstateSignal - Lebenszyklus-Datenmanagement fuer Immobilien",
      },
      description: {
        en: "A premium operating layer for real estate lifecycle data management across acquisitions, design, delivery, operations, compliance, and portfolio reporting.",
        de: "Eine hochwertige Steuerungsebene fuer das Lebenszyklus-Datenmanagement von Immobilien ueber Ankauf, Planung, Uebergabe, Betrieb, Compliance und Portfolioreporting hinweg.",
      },
      brandTag: {
        en: "Real estate lifecycle intelligence",
        de: "Intelligenz fuer den Immobilienlebenszyklus",
      },
      navPlatform: { en: "Platform", de: "Plattform" },
      navLifecycle: { en: "Lifecycle", de: "Lebenszyklus" },
      navShowcases: { en: "Showcases", de: "Showcases" },
      navWaitlist: { en: "Waitlist", de: "Warteliste" },
      ctaRequest: { en: "Request Access", de: "Zugang anfragen" },
      heroEyebrow: {
        en: "Built for asset owners, operators, and portfolio teams",
        de: "Fuer Eigentuermer, Betreiber und Portfolioteams entwickelt",
      },
      heroTitle: {
        en: "Make every building decision from one living data layer.",
        de: "Treffen Sie jede Gebaeudeentscheidung aus einer lebendigen Datenebene heraus.",
      },
      heroText: {
        en: "RealEstateSignal brings together acquisition files, BIM, asset registers, capex plans, compliance records, maintenance history, and portfolio metrics into one high-clarity operating system for the full real estate lifecycle.",
        de: "RealEstateSignal fuehrt Ankaufunterlagen, BIM, Asset-Register, Capex-Plaene, Compliance-Nachweise, Instandhaltungshistorie und Portfolio-Kennzahlen in einem klaren Betriebssystem fuer den gesamten Immobilienlebenszyklus zusammen.",
      },
      heroPrimary: { en: "Join Early Access", de: "Fruehzugang anfragen" },
      heroSecondary: { en: "Explore Showcases", de: "Showcases ansehen" },
      proof1Title: { en: "Lifecycle coverage", de: "Lebenszyklus-Abdeckung" },
      proof1Text: { en: "Acquisition to operations", de: "Vom Ankauf bis zum Betrieb" },
      proof2Title: { en: "AI-assisted workflows", de: "KI-unterstuetzte Workflows" },
      proof2Text: { en: "Reviews, exceptions, follow-ups", de: "Pruefungen, Ausnahmen, Follow-ups" },
      proof3Title: { en: "Executive-ready dashboards", de: "Management-taugliche Dashboards" },
      proof3Text: { en: "Portfolio, risk, cost, compliance", de: "Portfolio, Risiko, Kosten, Compliance" },
      dashLabel: { en: "Portfolio command", de: "Portfolio-Steuerung" },
      dashTitle: { en: "Lifecycle Performance", de: "Lifecycle Performance" },
      dashStatus: { en: "Live data layer", de: "Live-Datenebene" },
      metric1Label: { en: "Properties mapped", de: "Erfasste Objekte" },
      metric1Meta: { en: "Across office, residential, mixed-use", de: "Ueber Buero, Wohnen und Mixed-Use" },
      metric2Label: { en: "Compliance completeness", de: "Compliance-Vollstaendigkeit" },
      metric2Meta: { en: "+6.8% in the last quarter", de: "+6,8 % im letzten Quartal" },
      metric3Label: { en: "Capex at risk", de: "Gefaehrdetes Capex" },
      metric3Meta: { en: "17 items require review", de: "17 Positionen brauchen Pruefung" },
      chartLabel: { en: "Portfolio health trend", de: "Trend zur Portfolio-Gesundheit" },
      chartTitle: { en: "Risk, cost, readiness", de: "Risiko, Kosten, Bereitschaft" },
      chartText: {
        en: "Track the operational state of each asset through delivery and into steady-state operations.",
        de: "Verfolgen Sie den operativen Status jedes Assets von der Uebergabe bis in den stabilen Betrieb.",
      },
      tableAsset: { en: "Asset", de: "Asset" },
      tableStage: { en: "Stage", de: "Phase" },
      tableConfidence: { en: "Data confidence", de: "Datenqualitaet" },
      stageOperations: { en: "Operations", de: "Betrieb" },
      stageFitout: { en: "Fit-out", de: "Ausbau" },
      stageDueDiligence: { en: "Due diligence", de: "Due Diligence" },
      agentLabel: { en: "Agent workflows", de: "Agenten-Workflows" },
      agentTitle: {
        en: "Auto-review lease packs, O&M documents, and asset records.",
        de: "Automatische Pruefung von Mietunterlagen, O&M-Dokumenten und Asset-Daten.",
      },
      agent1: { en: "Flag missing handover data", de: "Fehlende Uebergabedaten markieren" },
      agent2: { en: "Summarize vendor obligations", de: "Lieferantenpflichten zusammenfassen" },
      agent3: { en: "Create action queues for site teams", de: "Aufgabenlisten fuer Standortteams erzeugen" },
      pipelineLabel: { en: "Data pipeline", de: "Datenpipeline" },
      pipeline1: { en: "Acquisition files", de: "Ankaufsunterlagen" },
      pipeline2: { en: "BIM and CAD", de: "BIM und CAD" },
      pipeline3: { en: "CMMS / CAFM / IWMS", de: "CMMS / CAFM / IWMS" },
      pipeline4: { en: "Compliance evidence", de: "Compliance-Nachweise" },
      platformLabel: { en: "Platform", de: "Plattform" },
      platformTitle: {
        en: "A premium control layer for fragmented real estate data.",
        de: "Eine hochwertige Steuerungsebene fuer fragmentierte Immobiliendaten.",
      },
      platformText: {
        en: "Inspired by modern dashboard products, but tuned for buildings: cleaner structure, richer context, and less noise between a problem and the action needed to solve it.",
        de: "Inspiriert von modernen Dashboard-Produkten, aber auf Gebaeude zugeschnitten: klarere Struktur, mehr Kontext und weniger Rauschen zwischen Problem und noetiger Aktion.",
      },
      feature1Title: { en: "Unified property graph", de: "Vernetzter Immobilien-Graph" },
      feature1Text: {
        en: "Connect sites, spaces, assets, documents, warranties, vendors, projects, budgets, and performance history in one navigable model.",
        de: "Verbinden Sie Standorte, Flaechen, Assets, Dokumente, Garantien, Lieferanten, Projekte, Budgets und Performance-Historie in einem navigierbaren Modell.",
      },
      feature2Title: { en: "Lifecycle dashboards", de: "Lifecycle-Dashboards" },
      feature2Text: {
        en: "Monitor readiness, compliance, spend, backlog, energy, and portfolio risk by asset or region.",
        de: "Ueberwachen Sie Bereitschaft, Compliance, Kosten, Backlog, Energie und Portfoliorisiko nach Asset oder Region.",
      },
      feature3Title: { en: "AI operational copilots", de: "KI-Betriebscopiloten" },
      feature3Text: {
        en: "Automate reviews, summarize data gaps, and generate follow-up tasks with human approval built in.",
        de: "Automatisieren Sie Pruefungen, fassen Sie Datenluecken zusammen und erzeugen Sie Follow-up-Aufgaben mit menschlicher Freigabe.",
      },
      feature4Title: { en: "Data confidence scoring", de: "Scoring fuer Datenvertrauen" },
      feature4Text: {
        en: "See where records are incomplete, outdated, duplicated, or unsupported by evidence.",
        de: "Erkennen Sie, wo Datensaetze unvollstaendig, veraltet, doppelt oder nicht belegt sind.",
      },
      lifeLabel: { en: "Lifecycle", de: "Lebenszyklus" },
      lifeTitle: {
        en: "Designed around how real estate actually moves.",
        de: "Entwickelt entlang der echten Bewegungen im Immobilienlebenszyklus.",
      },
      lifeText: {
        en: "From acquisition and due diligence to project delivery and long-term operations, the platform keeps data structured as buildings change hands, systems, and states.",
        de: "Vom Ankauf und der Due Diligence bis zur Projektuebergabe und dem langfristigen Betrieb haelt die Plattform Daten strukturiert, waehrend Gebaeude Besitz, Systeme und Status wechseln.",
      },
      stepAcquireTitle: { en: "Acquire", de: "Ankaufen" },
      stepAcquireText: { en: "Collect diligence packs, condition data, lease obligations, and risk signals.", de: "Sammeln Sie Due-Diligence-Unterlagen, Zustandsdaten, Mietverpflichtungen und Risikosignale." },
      stepDeliverTitle: { en: "Deliver", de: "Uebergeben" },
      stepDeliverText: { en: "Track BIM handover, commissioning evidence, defect status, and readiness gates.", de: "Verfolgen Sie BIM-Uebergabe, Inbetriebnahme-Nachweise, Maengelstatus und Freigabestufen." },
      stepOperateTitle: { en: "Operate", de: "Betreiben" },
      stepOperateText: { en: "Manage asset records, preventive workflows, compliance calendars, and vendor performance.", de: "Steuern Sie Asset-Daten, praeventive Workflows, Compliance-Kalender und Lieferantenleistung." },
      stepImproveTitle: { en: "Improve", de: "Verbessern" },
      stepImproveText: { en: "Drive capex prioritization, sustainability upgrades, and portfolio reporting from the same base.", de: "Steuern Sie Capex-Priorisierung, Nachhaltigkeits-Upgrades und Portfolioreporting aus derselben Grundlage." },
      opsTag: { en: "For operations", de: "Fuer den Betrieb" },
      opsTitle: { en: "See what is missing before it becomes a site problem.", de: "Erkennen Sie, was fehlt, bevor es zum Standortproblem wird." },
      opsText: { en: "Surface incomplete compliance records, missing O&M documentation, repeated failures, and unresolved vendor actions before they roll into reporting cycles.", de: "Machen Sie unvollstaendige Compliance-Daten, fehlende O&M-Dokumente, wiederkehrende Ausfaelle und offene Lieferantenaufgaben sichtbar, bevor sie ins Reporting laufen." },
      leadTag: { en: "For leadership", de: "Fuer die Leitung" },
      leadTitle: { en: "Move from static reports to live portfolio intelligence.", de: "Wechseln Sie von statischen Reports zu lebendiger Portfolio-Intelligenz." },
      leadText: { en: "Give investment, asset management, and executive teams a sharper view of operating risk, capex exposure, asset readiness, and portfolio-level trends.", de: "Geben Sie Investment-, Asset-Management- und Leitungsteams einen klareren Blick auf Betriebsrisiko, Capex-Exponierung, Asset-Bereitschaft und Portfoliotrends." },
      showLabel: { en: "Showcases", de: "Showcases" },
      showTitle: { en: "Focused product surfaces built on the same real-estate data foundation.", de: "Fokussierte Produktsurfaces auf derselben Datenbasis fuer Immobilien." },
      showText: { en: "Three showcase tracks make the platform story more tangible: a core platform surface, plus two near-term product directions for process twins and building-data QA workflows.", de: "Drei Showcase-Linien machen die Plattform greifbarer: eine Kernoberflaeche plus zwei Produkt-Richtungen fuer Prozess-Zwillinge und QA-Workflows fuer Gebaeudedaten." },
      show1Tag: { en: "Core showcase", de: "Kern-Showcase" },
      show1Title: { en: "Building Data Hub", de: "Building Data Hub" },
      show1Text: { en: "A neutral product surface for structured building records, operational context, portfolio overview, and connected lifecycle data. This gives the site a concrete anchor without locking the naming too early.", de: "Eine neutrale Produktoberflaeche fuer strukturierte Gebaeudedaten, operativen Kontext, Portfolio-Uebersicht und verknuepfte Lifecycle-Daten. So bekommt die Seite einen klaren Anker, ohne den finalen Namen zu frueh festzulegen." },
      show1FocusTitle: { en: "Focus", de: "Fokus" },
      show1FocusText: { en: "Building records, operations, portfolio context", de: "Gebaeudedaten, Betrieb, Portfolio-Kontext" },
      show1StageTitle: { en: "Stage", de: "Status" },
      show1StageText: { en: "Static showcase", de: "Statischer Showcase" },
      show1RoleTitle: { en: "Role", de: "Rolle" },
      show1RoleText: { en: "Anchor product story for the website", de: "Anker fuer die Produktgeschichte der Website" },
      showOpen: { en: "Open Showcase", de: "Showcase oeffnen" },
      show2Tag: { en: "Placeholder", de: "Platzhalter" },
      show2Title: { en: "FlowTwin", de: "FlowTwin" },
      show2Text: { en: "A future product direction for modeling operating processes as a live twin: workflows, approvals, dependencies, owners, and friction points across delivery and operations.", de: "Eine kuenftige Produkt-Richtung, um Betriebsprozesse als lebendigen Zwilling abzubilden: Workflows, Freigaben, Abhaengigkeiten, Verantwortliche und Reibungspunkte ueber Uebergabe und Betrieb hinweg." },
      show2FocusText: { en: "Workflow twins, orchestration, process visibility", de: "Workflow-Zwillinge, Orchestrierung, Prozesssichtbarkeit" },
      show2StageText: { en: "Static placeholder", de: "Statischer Platzhalter" },
      show2RoleText: { en: "Show strategic expansion beyond asset records", de: "Zeigt die strategische Erweiterung ueber Asset-Daten hinaus" },
      showPlaceholder: { en: "Open Placeholder", de: "Platzhalter oeffnen" },
      show3Title: { en: "ProofGrid", de: "ProofGrid" },
      show3Text: { en: "A product direction for QA of building data: handover completeness, rule checks, evidence quality, and operational readiness across assets and spaces.", de: "Eine Produkt-Richtung fuer QA von Gebaeudedaten: Uebergabevollstaendigkeit, Regelpruefungen, Belegqualitaet und operative Bereitschaft ueber Assets und Flaechen hinweg." },
      show3FocusText: { en: "Building-data QA, rule checks, evidence, readiness", de: "QA fuer Gebaeudedaten, Regelpruefungen, Nachweise, Bereitschaft" },
      show3RoleText: { en: "Show quality-control and governance capability", de: "Zeigt Qualitaetssicherung und Governance-Faehigkeit" },
      waitTag: { en: "Early access", de: "Fruehzugang" },
      waitTitle: { en: "Talk to us about pilots, design partnerships, and first deployments.", de: "Sprechen Sie mit uns ueber Piloten, Design-Partnerschaften und erste Einsaetze." },
      waitText: { en: "We are shaping RealEstateSignal with teams that need stronger lifecycle visibility across real estate, facilities, and portfolio management.", de: "Wir entwickeln RealEstateSignal gemeinsam mit Teams, die mehr Lifecycle-Transparenz ueber Immobilien, Facility Management und Portfolios brauchen." },
      nameLabel: { en: "Name", de: "Name" },
      namePlaceholder: { en: "Your name", de: "Ihr Name" },
      emailLabel: { en: "Work email", de: "Geschaeftliche E-Mail" },
      emailPlaceholder: { en: "name@company.com", de: "name@firma.com" },
      companyLabel: { en: "Company", de: "Unternehmen" },
      companyPlaceholder: { en: "Company or portfolio", de: "Unternehmen oder Portfolio" },
      waitButton: { en: "Request Early Access", de: "Fruehzugang anfragen" },
      footerText: { en: "Real estate lifecycle data management for calm operations and sharper portfolio decisions.", de: "Lebenszyklus-Datenmanagement fuer Immobilien fuer ruhigere Ablaeufe und bessere Portfolioentscheidungen." },
    },
    buildingDataHub: {
      title: { en: "Building Data Hub - RealEstateSignal", de: "Building Data Hub - RealEstateSignal" },
      description: { en: "Building Data Hub is a showcase surface for structured building records, operational context, and portfolio-wide lifecycle visibility.", de: "Building Data Hub ist eine Showcase-Oberflaeche fuer strukturierte Gebaeudedaten, operativen Kontext und lifecycle-weite Portfolio-Transparenz." },
      brandTag: { en: "Real estate lifecycle intelligence", de: "Intelligenz fuer den Immobilienlebenszyklus" },
      backHome: { en: "Back to Home", de: "Zur Startseite" },
      eyebrow: { en: "Core showcase", de: "Kern-Showcase" },
      titleH1: { en: "Building Data Hub", de: "Building Data Hub" },
      text: { en: "A showcase product surface for structured building records, asset context, lifecycle visibility, and calm portfolio operations. It anchors the RealEstateSignal story without locking the final product naming too early.", de: "Eine Showcase-Produktoberflaeche fuer strukturierte Gebaeudedaten, Asset-Kontext, Lifecycle-Transparenz und ruhige Portfolio-Operationen. Sie verankert die RealEstateSignal-Story, ohne den finalen Produktnamen zu frueh festzulegen." },
      primary: { en: "Request Access", de: "Zugang anfragen" },
      secondary: { en: "Back to Home", de: "Zur Startseite" },
      proof1Title: { en: "Unified records", de: "Vereinheitlichte Datensaetze" },
      proof1Text: { en: "Bring sites, spaces, assets, documents, and costs into one structured layer.", de: "Fuehren Sie Standorte, Flaechen, Assets, Dokumente und Kosten in einer strukturierten Ebene zusammen." },
      proof2Title: { en: "Operational clarity", de: "Operative Klarheit" },
      proof2Text: { en: "Turn fragmented building data into a cleaner working surface for teams.", de: "Verwandeln Sie fragmentierte Gebaeudedaten in eine klarere Arbeitsoberflaeche fuer Teams." },
      previewLabel: { en: "Core data surface", de: "Kern-Datenoberflaeche" },
      previewTitle: { en: "A calmer operating layer for building portfolios", de: "Eine ruhigere Betriebsebene fuer Gebaeudeportfolios" },
      preview1Title: { en: "Portfolio-wide context", de: "Portfolioweiter Kontext" },
      preview1Text: { en: "See properties, systems, documents, and issues in one navigable surface instead of scattered tools.", de: "Sehen Sie Objekte, Systeme, Dokumente und Themen in einer navigierbaren Oberflaeche statt in verstreuten Tools." },
      preview2Title: { en: "Lifecycle linked", de: "Lifecycle-verknuepft" },
      preview2Text: { en: "Connect delivery data, operational records, and future reporting from the same base.", de: "Verbinden Sie Uebergabedaten, operative Datensaetze und kuenftiges Reporting aus derselben Basis." },
      preview3Title: { en: "Stage one showcase", de: "Showcase Stufe eins" },
      preview3Text: { en: "Static product framing now, ready for richer implementation later.", de: "Heute noch statisch, spaeter bereit fuer eine tiefere Umsetzung." },
      stat1Title: { en: "Property graph", de: "Immobilien-Graph" },
      stat1Text: { en: "Link sites, assets, vendors, systems, and evidence into one coherent structure.", de: "Verknuepfen Sie Standorte, Assets, Lieferanten, Systeme und Nachweise in einer konsistenten Struktur." },
      stat2Title: { en: "Portfolio view", de: "Portfolio-Sicht" },
      stat2Text: { en: "Keep regional, asset-type, and site-level visibility aligned.", de: "Halten Sie regionale, assetbezogene und standortbezogene Transparenz konsistent." },
      stat3Title: { en: "Operational context", de: "Operativer Kontext" },
      stat3Text: { en: "Support maintenance, readiness, compliance, and follow-up decisions.", de: "Unterstuetzen Sie Wartung, Bereitschaft, Compliance und Folgeentscheidungen." },
      stat4Title: { en: "Foundation role", de: "Basisrolle" },
      stat4Text: { en: "Act as the base layer for future process, QA, and automation products.", de: "Dient als Basisebene fuer kuenftige Prozess-, QA- und Automatisierungsprodukte." },
      detail1Title: { en: "Why it exists", de: "Warum es existiert" },
      detail1Text: { en: "Building Data Hub is the cleanest way to show what RealEstateSignal is about: making lifecycle data structured, navigable, and operationally useful without overwhelming users.", de: "Building Data Hub zeigt am klarsten, worum es bei RealEstateSignal geht: Lifecycle-Daten strukturiert, navigierbar und operativ nutzbar zu machen, ohne Nutzer zu ueberfordern." },
      detail2Title: { en: "What comes next", de: "Was als Nächstes kommt" },
      detail2Text: { en: "This showcase can later evolve into a named product or split into deeper modules depending on whether the strongest pull comes from operations, portfolio reporting, or QA.", de: "Dieser Showcase kann spaeter zu einem benannten Produkt werden oder sich in tiefere Module aufteilen, je nachdem ob der staerkste Bedarf aus Betrieb, Portfolioreporting oder QA kommt." },
      t1: { en: "Structure", de: "Strukturieren" },
      t1Title: { en: "Model the built environment", de: "Die gebaute Umwelt modellieren" },
      t1Text: { en: "Keep records consistent across buildings, systems, assets, and operational evidence.", de: "Halten Sie Datensaetze ueber Gebaeude, Systeme, Assets und operative Nachweise konsistent." },
      t2: { en: "Connect", de: "Verbinden" },
      t2Title: { en: "Attach context to every record", de: "Jedem Datensatz Kontext geben" },
      t2Text: { en: "Make documents, ownership, risk, and lifecycle stage visible in the same working layer.", de: "Machen Sie Dokumente, Besitz, Risiken und Lifecycle-Phase in derselben Arbeitsebene sichtbar." },
      t3: { en: "Operate", de: "Betreiben" },
      t3Title: { en: "Use data as a control surface", de: "Daten als Steuerungsoberflaeche nutzen" },
      t3Text: { en: "Support better day-to-day decisions across facilities, delivery teams, and leadership.", de: "Unterstuetzen Sie bessere Alltagsentscheidungen in Betrieb, Uebergabeteams und Leitung." },
      backBottom: { en: "Back to homepage", de: "Zurueck zur Startseite" },
    },
    digitalTwinProcesses: {
      title: { en: "FlowTwin - RealEstateSignal", de: "FlowTwin - RealEstateSignal" },
      description: { en: "FlowTwin is a showcase concept for making real-estate operating processes visible, traceable, and optimizable.", de: "FlowTwin ist ein Showcase-Konzept, um Immobilienprozesse sichtbar, nachvollziehbar und optimierbar zu machen." },
      brandTag: { en: "Real estate lifecycle intelligence", de: "Intelligenz fuer den Immobilienlebenszyklus" },
      backHome: { en: "Back to Home", de: "Zur Startseite" },
      eyebrow: { en: "Placeholder showcase", de: "Platzhalter-Showcase" },
      titleH1: { en: "FlowTwin", de: "FlowTwin" },
      text: { en: "A concept surface for representing operating processes as a live twin: steps, owners, approvals, dependencies, delays, and repeated bottlenecks across building delivery and operations.", de: "Eine Konzeptoberflaeche, um Betriebsprozesse als lebendigen Zwilling darzustellen: Schritte, Verantwortliche, Freigaben, Abhaengigkeiten, Verzoegerungen und wiederkehrende Engpaesse ueber Uebergabe und Betrieb hinweg." },
      primary: { en: "Request Access", de: "Zugang anfragen" },
      secondary: { en: "Back to Home", de: "Zur Startseite" },
      proof1Title: { en: "Process visibility", de: "Prozesssichtbarkeit" },
      proof1Text: { en: "See where workflows slow down, split, or stall across teams and systems.", de: "Sehen Sie, wo Workflows sich verlangsamen, verzweigen oder festlaufen." },
      proof2Title: { en: "Live orchestration", de: "Live-Orchestrierung" },
      proof2Text: { en: "Model work as a traceable sequence instead of disconnected tasks and emails.", de: "Modellieren Sie Arbeit als nachvollziehbare Abfolge statt als isolierte Aufgaben und E-Mails." },
      previewLabel: { en: "Process twin concept", de: "Prozesszwilling-Konzept" },
      previewTitle: { en: "Make hidden operational workflows visible", de: "Versteckte Betriebsworkflows sichtbar machen" },
      preview1Title: { en: "Map the real flow", de: "Den echten Ablauf abbilden" },
      preview1Text: { en: "Capture approvals, handoffs, evidence requests, and recurring exceptions in one operating view.", de: "Erfassen Sie Freigaben, Uebergaben, Nachweisanfragen und wiederkehrende Ausnahmen in einer Betriebssicht." },
      preview2Title: { en: "Find friction", de: "Reibung finden" },
      preview2Text: { en: "Surface where delays, duplication, and unclear ownership are slowing the process.", de: "Machen Sie sichtbar, wo Verzoegerungen, Doppelarbeit und unklare Verantwortung Prozesse bremsen." },
      preview3Title: { en: "Placeholder today", de: "Heute Platzhalter" },
      preview3Text: { en: "Positioned as a stage-one concept with room for deeper workflow tooling later.", de: "Als Konzept der ersten Stufe angelegt, mit Raum fuer tiefere Workflow-Tools spaeter." },
      stat1Title: { en: "Process mapping", de: "Prozess-Mapping" },
      stat1Text: { en: "Model approvals, tasks, dependencies, and exception loops explicitly.", de: "Modellieren Sie Freigaben, Aufgaben, Abhaengigkeiten und Ausnahmeschleifen explizit." },
      stat2Title: { en: "Ownership clarity", de: "Klare Verantwortung" },
      stat2Text: { en: "Show who is responsible at every step and where handoffs break.", de: "Zeigen Sie, wer in jedem Schritt verantwortlich ist und wo Uebergaben brechen." },
      stat3Title: { en: "Bottleneck tracing", de: "Engpass-Tracking" },
      stat3Text: { en: "Spot recurring delays and repeated points of operational friction.", de: "Erkennen Sie wiederkehrende Verzoegerungen und operative Reibungspunkte." },
      stat4Title: { en: "Improvement engine", de: "Verbesserungsmaschine" },
      stat4Text: { en: "Use the twin to redesign processes instead of just documenting them.", de: "Nutzen Sie den Zwilling, um Prozesse neu zu gestalten statt sie nur zu dokumentieren." },
      detail1Title: { en: "Why it matters", de: "Warum es wichtig ist" },
      detail1Text: { en: "Real-estate operations are full of invisible workflows that live in inboxes, spreadsheets, and tacit team knowledge. A process twin turns that hidden structure into something measurable and improvable.", de: "Immobilienbetrieb ist voller unsichtbarer Workflows, die in Postfaechern, Tabellen und stillschweigendem Teamwissen leben. Ein Prozesszwilling macht diese Struktur messbar und verbesserbar." },
      detail2Title: { en: "Strategic role", de: "Strategische Rolle" },
      detail2Text: { en: "This showcase expands the platform beyond building data itself and into the way teams move through delivery, approvals, compliance, and operational change.", de: "Dieser Showcase erweitert die Plattform ueber Gebaeudedaten hinaus in die Art, wie Teams durch Uebergabe, Freigaben, Compliance und operative Veraenderung arbeiten." },
      t1: { en: "Map", de: "Abbilden" },
      t1Title: { en: "Capture the current process", de: "Den aktuellen Prozess erfassen" },
      t1Text: { en: "Model the real sequence of actions, decisions, owners, and evidence dependencies.", de: "Modellieren Sie die reale Abfolge von Aktionen, Entscheidungen, Verantwortlichen und Nachweis-Abhaengigkeiten." },
      t2: { en: "Observe", de: "Beobachten" },
      t2Title: { en: "Watch the process in motion", de: "Den Prozess in Bewegung sehen" },
      t2Text: { en: "See where work slows down, loops back, or gets blocked by unclear inputs.", de: "Sehen Sie, wo Arbeit langsamer wird, zurueckspringt oder durch unklare Eingaben blockiert wird." },
      t3: { en: "Improve", de: "Verbessern" },
      t3Title: { en: "Redesign from evidence", de: "Aus Evidenz neu gestalten" },
      t3Text: { en: "Use visibility and repeat patterns to simplify workflows and raise execution quality.", de: "Nutzen Sie Transparenz und Muster, um Workflows zu vereinfachen und die Ausfuehrungsqualitaet zu steigern." },
      backBottom: { en: "Back to homepage", de: "Zurueck zur Startseite" },
    },
    proofgrid: {
      title: { en: "ProofGrid - RealEstateSignal", de: "ProofGrid - RealEstateSignal" },
      description: { en: "ProofGrid is a showcase concept for QA of building data, evidence quality, readiness checks, and lifecycle validation.", de: "ProofGrid ist ein Showcase-Konzept fuer QA von Gebaeudedaten, Belegqualitaet, Readiness-Checks und Lifecycle-Pruefungen." },
      brandTag: { en: "Real estate lifecycle intelligence", de: "Intelligenz fuer den Immobilienlebenszyklus" },
      backHome: { en: "Back to Home", de: "Zur Startseite" },
      eyebrow: { en: "Placeholder showcase", de: "Platzhalter-Showcase" },
      titleH1: { en: "ProofGrid", de: "ProofGrid" },
      text: { en: "A QA-focused concept surface for building data: rule checks, readiness validation, evidence completeness, and record quality across lifecycle handovers and operations.", de: "Eine QA-orientierte Konzeptoberflaeche fuer Gebaeudedaten: Regelpruefungen, Readiness-Validierung, Belegvollstaendigkeit und Datensatzqualitaet ueber Uebergaben und Betrieb hinweg." },
      primary: { en: "Request Access", de: "Zugang anfragen" },
      secondary: { en: "Back to Home", de: "Zur Startseite" },
      proof1Title: { en: "Data QA", de: "Daten-QA" },
      proof1Text: { en: "Find incomplete, inconsistent, or unsupported building records before they spread downstream.", de: "Finden Sie unvollstaendige, inkonsistente oder unbelegte Gebaeudedaten, bevor sie sich weiterverbreiten." },
      proof2Title: { en: "Readiness confidence", de: "Bereitschaft mit Vertrauen" },
      proof2Text: { en: "Measure whether assets, spaces, and handover packages are truly operationally complete.", de: "Messen Sie, ob Assets, Flaechen und Uebergabepakete wirklich operativ vollstaendig sind." },
      previewLabel: { en: "QA concept", de: "QA-Konzept" },
      previewTitle: { en: "Trust building data before it drives decisions", de: "Gebaeudedaten vertrauen, bevor sie Entscheidungen steuern" },
      preview1Title: { en: "Quality gates for records", de: "Qualitaetsgates fuer Datensaetze" },
      preview1Text: { en: "Check whether documentation, attributes, evidence, and status align with the required lifecycle standard.", de: "Pruefen Sie, ob Dokumentation, Attribute, Nachweise und Status dem geforderten Lifecycle-Standard entsprechen." },
      preview2Title: { en: "Evidence linked", de: "Mit Nachweisen verknuepft" },
      preview2Text: { en: "Connect every validation result to the source material that supports or fails the record.", de: "Verknuepfen Sie jedes Ergebnis mit dem Quellmaterial, das den Datensatz bestaetigt oder widerlegt." },
      preview3Title: { en: "Placeholder today", de: "Heute Platzhalter" },
      preview3Text: { en: "Positioned as a product concept for high-trust building-data QA workflows.", de: "Positioniert als Produktkonzept fuer vertrauensstarke QA-Workflows fuer Gebaeudedaten." },
      stat1Title: { en: "Rule engine", de: "Regel-Engine" },
      stat1Text: { en: "Apply checks to required fields, states, relationships, and handover criteria.", de: "Wenden Sie Pruefungen auf Pflichtfelder, Status, Beziehungen und Uebergabekriterien an." },
      stat2Title: { en: "Evidence quality", de: "Nachweisqualitaet" },
      stat2Text: { en: "See which records are backed by usable source material and which are not.", de: "Erkennen Sie, welche Datensaetze durch nutzbares Quellmaterial belegt sind und welche nicht." },
      stat3Title: { en: "Readiness scoring", de: "Readiness-Scoring" },
      stat3Text: { en: "Measure operational completeness across spaces, assets, and systems.", de: "Messen Sie die operative Vollstaendigkeit ueber Flaechen, Assets und Systeme hinweg." },
      stat4Title: { en: "Governance layer", de: "Governance-Ebene" },
      stat4Text: { en: "Support teams that need confidence before downstream reporting or automation.", de: "Unterstuetzen Sie Teams, die vor Reporting oder Automatisierung Vertrauen brauchen." },
      detail1Title: { en: "Why it matters", de: "Warum es wichtig ist" },
      detail1Text: { en: "Bad building data causes expensive noise later: broken dashboards, weak handovers, and unreliable decisions. ProofGrid focuses on quality before that damage compounds.", de: "Schlechte Gebaeudedaten verursachen spaeter teures Rauschen: kaputte Dashboards, schwache Uebergaben und unzuverlaessige Entscheidungen. ProofGrid fokussiert Qualitaet, bevor sich dieser Schaden verstaerkt." },
      detail2Title: { en: "Strategic role", de: "Strategische Rolle" },
      detail2Text: { en: "This showcase makes the governance side of RealEstateSignal visible: not just storing lifecycle data, but proving whether it is complete, trustworthy, and ready for use.", de: "Dieser Showcase macht die Governance-Seite von RealEstateSignal sichtbar: nicht nur Lifecycle-Daten speichern, sondern beweisen, ob sie vollstaendig, vertrauenswuerdig und einsatzbereit sind." },
      t1: { en: "Check", de: "Pruefen" },
      t1Title: { en: "Run structured QA rules", de: "Strukturierte QA-Regeln ausfuehren" },
      t1Text: { en: "Evaluate data against expected lifecycle standards, relationships, and required evidence.", de: "Bewerten Sie Daten gegen erwartete Lifecycle-Standards, Beziehungen und erforderliche Nachweise." },
      t2: { en: "Explain", de: "Erklaeren" },
      t2Title: { en: "Show why a record failed", de: "Zeigen, warum ein Datensatz scheitert" },
      t2Text: { en: "Link every issue to the missing value, unsupported document, or inconsistent state behind it.", de: "Verknuepfen Sie jedes Problem mit dem fehlenden Wert, dem ungeeigneten Dokument oder dem inkonsistenten Status dahinter." },
      t3: { en: "Approve", de: "Freigeben" },
      t3Title: { en: "Raise confidence before handover", de: "Vertrauen vor der Uebergabe erhoehen" },
      t3Text: { en: "Use readiness and quality scoring to support delivery, operations, and portfolio teams.", de: "Nutzen Sie Readiness- und Qualitaets-Scoring, um Uebergabe-, Betriebs- und Portfolioteams zu unterstuetzen." },
      backBottom: { en: "Back to homepage", de: "Zurueck zur Startseite" },
    },
    thanks: {
      title: { en: "Thanks - RealEstateSignal", de: "Danke - RealEstateSignal" },
      thankTag: { en: "Thank you", de: "Vielen Dank" },
      thankTitle: { en: "Your request is in.", de: "Ihre Anfrage ist eingegangen." },
      thankText: { en: "We received your details and will reach out with early access updates, pilot opportunities, and product progress for RealEstateSignal.", de: "Wir haben Ihre Angaben erhalten und melden uns mit Updates zum Fruehzugang, Pilotmoeglichkeiten und Produktfortschritt von RealEstateSignal." },
      thankButton: { en: "Back to homepage", de: "Zurueck zur Startseite" },
    },
  };

  const translatePage = (lang) => {
    if (!pageKey || !translations[pageKey]) {
      return;
    }

    const pageTranslations = translations[pageKey];

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.dataset.i18n;
      const value = pageTranslations[key]?.[lang];
      if (value) {
        node.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      const key = node.dataset.i18nPlaceholder;
      const value = pageTranslations[key]?.[lang];
      if (value) {
        node.setAttribute("placeholder", value);
      }
    });

    document.querySelectorAll("[data-i18n-content]").forEach((node) => {
      const key = node.dataset.i18nContent;
      const value = pageTranslations[key]?.[lang];
      if (value) {
        node.setAttribute("content", value);
      }
    });

    if (pageTranslations.title?.[lang]) {
      document.title = pageTranslations.title[lang];
    }

    root.setAttribute("lang", lang);
  };

  const systemPrefersLight = () =>
    window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);

    if (icon) {
      icon.textContent = theme === "light" ? "☀" : "◐";
    }

    if (label) {
      label.textContent = theme === "light" ? "Light" : "Dark";
    }
  };

  const savedTheme = localStorage.getItem("theme");
  applyTheme(savedTheme || (systemPrefersLight() ? "light" : "dark"));

  if (toggle) {
    toggle.addEventListener("click", () => {
      const currentTheme = root.getAttribute("data-theme") || "dark";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", nextTheme);
      applyTheme(nextTheme);
    });
  }

  const savedLanguage = localStorage.getItem("language") || "en";
  translatePage(savedLanguage);

  const updateLanguageToggle = (lang) => {
    if (langLabel) {
      langLabel.textContent = lang === "en" ? "EN" : "DE";
    }
  };

  updateLanguageToggle(savedLanguage);

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      const currentLanguage = localStorage.getItem("language") || "en";
      const nextLanguage = currentLanguage === "en" ? "de" : "en";
      localStorage.setItem("language", nextLanguage);
      translatePage(nextLanguage);
      updateLanguageToggle(nextLanguage);
    });
  }

  const anchors = document.querySelectorAll('a[href^="#"]');

  anchors.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});
