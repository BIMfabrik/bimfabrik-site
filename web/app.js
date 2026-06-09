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
        en: "BIMfabrik — BIM, Digital Twin & Lifecycle Data",
        de: "BIMfabrik — BIM, Digital Twin & Lifecycle-Daten",
      },
      description: {
        en: "BIMfabrik connects BIM, asset data, project information, handover evidence, operations records, and portfolio reporting into one clear data foundation.",
        de: "BIMfabrik verbindet BIM, Asset-Daten, Projektinformationen und Portfolio-Reporting zu einer klaren Datengrundlage für die gebaute Umwelt.",
      },
      brandTag: {
        en: "BIM, Digital Twin & Lifecycle Data",
        de: "BIM, Digital Twin & Lifecycle-Daten",
      },
      navPlatform: { en: "Platform", de: "Plattform" },
      navLifecycle: { en: "Lifecycle", de: "Lebenszyklus" },
      navLeistungen: { en: "Services", de: "Leistungen" },
      navShowcases: { en: "Showcases", de: "Showcases" },
      navKontakt: { en: "Contact", de: "Kontakt" },
      navImpressum: { en: "Legal Notice", de: "Impressum" },
      ctaRequest: { en: "Get in Touch", de: "Kontakt aufnehmen" },
      heroEyebrow: {
        en: "Built for owners, operators, and project teams",
        de: "Für Bauherren, Betreiber und Projektteams",
      },
      heroTitle: {
        en: "A trusted digital building data layer for the entire lifecycle.",
        de: "Eine verlässliche Datenebene für den gesamten Gebäude-Lebenszyklus.",
      },
      heroText: {
        en: "BIMfabrik connects BIM, asset data, project information, handover evidence, operations records, and portfolio reporting into one clear data foundation — from planning through handover to operations.",
        de: "BIMfabrik verbindet BIM, Asset-Daten, Projektinformationen, Übergabenachweise, Betriebsdaten und Portfolio-Reporting zu einer klaren Datengrundlage. Von der Planung über die Übergabe bis zum Betrieb – aus einer Hand.",
      },
      heroPrimary: { en: "Get in Touch", de: "Kontakt aufnehmen" },
      heroSecondary: { en: "Learn More", de: "Mehr erfahren" },
      dashLabel: { en: "Data pipeline", de: "Daten-Pipeline" },
      dashStatus: { en: "Live data layer", de: "Live-Datenebene" },
      pipeline1: { en: "Acquisition files", de: "Ankaufsunterlagen" },
      pipeline1Text: { en: "Due diligence, lease packs, risk signals", de: "Due Diligence, Mietverträge, Risikosignale" },
      pipeline2: { en: "BIM and CAD", de: "BIM und CAD" },
      pipeline2Text: { en: "Models, plans, specifications", de: "Modelle, Pläne, Spezifikationen" },
      pipeline3: { en: "CMMS / CAFM / IWMS", de: "CMMS / CAFM / IWMS" },
      pipeline3Text: { en: "Operations, maintenance, asset records", de: "Betrieb, Wartung, Asset-Daten" },
      pipeline4: { en: "Compliance evidence", de: "Compliance-Nachweise" },
      pipeline4Text: { en: "Regulatory, handover, audit trail", de: "Regularien, Übergabe, Prüfpfad" },
      chartText: {
        en: "Structured data across the entire lifecycle — verified, traceable, ready for decisions.",
        de: "Strukturierte Daten über den gesamten Lebenszyklus – geprüft, nachvollziehbar, bereit für Entscheidungen.",
      },
      stepAcquireTitle: { en: "Acquire", de: "Ankaufen" },
      stepDeliverTitle: { en: "Handover & Operations", de: "Übergabe & Betrieb" },
      stepOperateTitle: { en: "Operations & Portfolio", de: "Betrieb & Portfolio" },
      stepImproveText: { en: "Metrics, compliance, reporting", de: "Kennzahlen, Compliance, Reporting" },
      show1FocusText: { en: "Inspection logs, evidence, defects", de: "Prüfprotokolle, Nachweise, Mängel" },
      pipeline2: { en: "Models, documents, specifications", de: "Modelle, Dokumente, Spezifikationen" },
      platformLabel: { en: "Platform", de: "Plattform" },
      platformTitle: {
        en: "A control layer for fragmented real estate data.",
        de: "Eine Steuerungsebene für fragmentierte Immobiliendaten.",
      },
      platformText: {
        en: "Built for teams that need clarity: cleaner structure, richer context, less noise between a problem and the solution.",
        de: "Entwickelt für Teams, die Klarheit brauchen: sauberere Struktur, mehr Kontext, weniger Rauschen zwischen Problem und Lösung.",
      },
      feature1Title: { en: "Unified property graph", de: "Vernetzter Immobilien-Graph" },
      feature1Text: {
        en: "Connect sites, spaces, assets, documents, warranties, vendors, projects, budgets, and performance history in one navigable model.",
        de: "Standorte, Flächen, Assets, Dokumente, Garantien, Lieferanten, Projekte, Budgets und Performance-Historie in einem navigierbaren Modell.",
      },
      feature2Title: { en: "Lifecycle dashboards", de: "Lifecycle-Dashboards" },
      feature2Text: {
        en: "Monitor readiness, compliance, spend, backlog, energy, and portfolio risk by asset or region.",
        de: "Bereitschaft, Compliance, Kosten, Backlog, Energie und Portfoliorisiko nach Asset oder Region überwachen.",
      },
      feature3Title: { en: "AI-assisted workflows", de: "KI-gestützte Workflows" },
      feature3Text: {
        en: "Automate reviews, summarize data gaps, and generate follow-up tasks with human approval built in.",
        de: "Prüfungen automatisieren, Datenlücken zusammenfassen und Folgetasks mit integrierter Freigabe erzeugen.",
      },
      feature4Title: { en: "Data quality scoring", de: "Datenqualitäts-Scoring" },
      feature4Text: {
        en: "See where records are incomplete, outdated, duplicated, or unsupported by evidence.",
        de: "Erkennen, wo Datensätze unvollständig, veraltet oder nicht belegt sind – für verlässliche Entscheidungsgrundlagen.",
      },
      leistungenLabel: { en: "Services", de: "Leistungen" },
      leistungenTitle: { en: "Tailored to your needs.", de: "Massgeschneidert für Ihre Anforderungen." },
      leistungenText: { en: "We accompany real estate teams from initial analysis to operational data platform.", de: "Wir begleiten Immobilien-Teams von der ersten Analyse bis zur operativen Datenplattform." },
      leistung1Title: { en: "Data analysis & preparation", de: "Datenanalyse & Aufbereitung" },
      leistung1Text: { en: "Inventory of your real estate data, identification of gaps and inconsistencies, building a structured data foundation.", de: "Bestandsaufnahme Ihrer Immobiliendaten, Identifikation von Lücken und Inkonsistenzen, Aufbau einer strukturierten Datenbasis." },
      leistung2Title: { en: "BIM & Digital Twin", de: "BIM & Digital Twin" },
      leistung2Text: { en: "Integration of BIM models, building digital twins, linking operational data and documents.", de: "Integration von BIM-Modellen, Aufbau digitaler Zwillinge, Verknüpfung mit Betriebsdaten und Dokumenten." },
      leistung3Title: { en: "Integration & Automation", de: "Integration & Automatisierung" },
      leistung3Text: { en: "Connection to existing systems (CMMS, CAFM, IWMS), automated data flows and reporting pipelines.", de: "Anbindung an bestehende Systeme (CMMS, CAFM, IWMS), automatisierte Datenflüsse und Reporting-Pipelines." },
      lifeLabel: { en: "Lifecycle", de: "Lebenszyklus" },
      lifeTitle: {
        en: "Designed around how real estate actually moves.",
        de: "Entwickelt entlang der echten Bewegungen im Immobilienleben.",
      },
      lifeText: {
        en: "From acquisition and due diligence to project delivery and long-term operations, the platform keeps data structured as buildings change hands, systems, and states.",
        de: "Vom Ankauf und der Due Diligence bis zur Projektübergabe und dem langfristigen Betrieb – die Plattform hält Daten strukturiert, während Gebäude Besitz, Systeme und Status wechseln.",
      },
      stepAcquireText: { en: "Collect diligence packs, condition data, lease obligations, and risk signals.", de: "Due-Diligence-Unterlagen, Zustandsdaten, Mietverpflichtungen und Risikosignale sammeln." },
      stepDeliverText: { en: "Track BIM handover, commissioning evidence, defect status, and readiness gates.", de: "BIM-Übergabe, Inbetriebnahme-Nachweise, Mängelstatus und Freigabestufen verfolgen." },
      stepOperateText: { en: "Manage asset records, preventive workflows, compliance calendars, and vendor performance.", de: "Asset-Daten, präventive Workflows, Compliance-Kalender und Lieferantenleistung steuern." },
      stepImproveTitle: { en: "Improve", de: "Verbessern" },
      showLabel: { en: "Showcases", de: "Showcases" },
      showTitle: { en: "Focused product surfaces on the same data foundation.", de: "Fokussierte Produktsurfaces auf derselben Datenbasis." },
      showText: { en: "Three showcase tracks make the platform tangible: a core surface plus two product directions for process twins and building-data QA workflows.", de: "Drei Showcase-Linien machen die Plattform greifbarer: eine Kernoberfläche plus zwei Produktrichtungen für Prozess-Zwillinge und Gebäudedaten-QA." },
      show1Tag: { en: "Core showcase", de: "Kern-Showcase" },
      show1Title: { en: "Building Data Hub", de: "Building Data Hub" },
      show1Text: { en: "A neutral product surface for structured building records, operational context, portfolio overview, and connected lifecycle data.", de: "Eine neutrale Produktoberfläche für strukturierte Gebäudedaten, operativen Kontext, Portfolio-Übersicht und verknüpfte Lifecycle-Daten." },
      show1FocusTitle: { en: "Focus", de: "Fokus" },
      show1StageTitle: { en: "Stage", de: "Status" },
      show1Phase: { en: "Stage one", de: "Stufe eins" },
      show1RoleText: { en: "Anchor product story for the website", de: "Anker für die Produktgeschichte der Website" },
      show1RoleTitle: { en: "Role", de: "Rolle" },
      showOpen: { en: "Open Showcase", de: "Showcase öffnen" },
      show2Tag: { en: "Concept phase", de: "Konzeptphase" },
      show2Title: { en: "FlowTwin", de: "FlowTwin" },
      show2Text: { en: "A future product direction for modeling operating processes as a live twin: workflows, approvals, dependencies, owners, and friction points.", de: "Eine Produktrichtung für Betriebsprozesse als live Twin: Workflows, Freigaben, Abhängigkeiten, Verantwortliche und Reibungspunkte." },
      show2FocusText: { en: "Workflow twins, orchestration, process visibility", de: "Workflow-Zwillinge, Orchestrierung, Prozesssichtbarkeit" },
      show2Phase: { en: "Concept phase", de: "Konzeptphase" },
      show2StageText: { en: "Concept phase", de: "Konzeptphase" },
      show2RoleText: { en: "Show strategic expansion beyond asset records", de: "Strategische Erweiterung über Asset-Daten hinaus" },
      showPlaceholder: { en: "Open Showcase", de: "Showcase öffnen" },
      show3Title: { en: "ProofGrid", de: "ProofGrid" },
      show3Text: { en: "A product direction for QA of building data: handover completeness, rule checks, evidence quality, and operational readiness.", de: "Eine Produktrichtung für QA von Gebäudedaten: Übergabevollständigkeit, Regelprüfungen, Belegqualität und operative Bereitschaft." },
      show3FocusText: { en: "Building-data QA, rule checks, evidence, readiness", de: "QA für Gebäudedaten, Regelprüfungen, Nachweise" },
      show3RoleText: { en: "Show quality-control and governance capability", de: "Qualitätssicherung und Governance-Fähigkeit" },
      waitTag: { en: "Contact", de: "Kontakt" },
      waitTitle: { en: "Talk to us about pilots, partnerships, and first deployments.", de: "Sprechen Sie mit uns über Piloten, Partnerschaften und erste Einsätze." },
      waitText: { en: "We are shaping BIMfabrik with teams that need stronger lifecycle visibility across real estate, facilities, and portfolio management. We respond within two working days.", de: "Wir entwickeln BIMfabrik gemeinsam mit Teams, die mehr Transparenz über Immobilien, Facility Management und Portfolios brauchen. Nehmen Sie Kontakt auf – wir melden uns innerhalb von zwei Werktagen." },
      nameLabel: { en: "Name", de: "Name" },
      namePlaceholder: { en: "Your name", de: "Ihr Name" },
      emailLabel: { en: "Email", de: "E-Mail" },
      emailPlaceholder: { en: "name@company.ch", de: "name@firma.ch" },
      companyLabel: { en: "Company", de: "Unternehmen" },
      companyPlaceholder: { en: "Company or portfolio", de: "Unternehmen oder Portfolio" },
      waitButton: { en: "Get in Touch", de: "Kontakt aufnehmen" },
      privacyText: { en: "Your details are used only to contact you about BIMfabrik. No spam.", de: "Ihre Daten werden nur verwendet, um Sie zu BIMfabrik zu kontaktieren. Kein Spam." },
      footerText: { en: "Real estate lifecycle data management for calm operations and sharper portfolio decisions.", de: "Lebenszyklus-Datenmanagement für Immobilien – für ruhigere Abläufe und schärfere Portfolio-Entscheidungen." },
    },
    buildingDataHub: {
      title: { en: "Building Data Hub — BIMfabrik", de: "Building Data Hub — BIMfabrik" },
    },
    digitalTwinProcesses: {
      title: { en: "FlowTwin — BIMfabrik", de: "FlowTwin — BIMfabrik" },
    },
    proofgrid: {
      title: { en: "ProofGrid — BIMfabrik", de: "ProofGrid — BIMfabrik" },
    },
    bimCopilot: {
      title: { en: "BIM Copilot — BIMfabrik", de: "BIM Copilot — BIMfabrik" },
    },
    famili: {
      title: { en: "Famili — BIMfabrik", de: "Famili — BIMfabrik" },
    },
    genossenschaftsradar: {
      title: { en: "Genossenschaftsradar — BIMfabrik", de: "Genossenschaftsradar — BIMfabrik" },
    },
    xtraktor: {
      title: { en: "Xtraktor — BIMfabrik", de: "Xtraktor — BIMfabrik" },
    },
    thanks: {
      title: { en: "Thanks — BIMfabrik", de: "Danke — BIMfabrik" },
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

  const savedLanguage = localStorage.getItem("language") || "de";
  translatePage(savedLanguage);

  const updateLanguageToggle = (lang) => {
    if (langLabel) {
      langLabel.textContent = lang === "en" ? "EN" : "DE";
    }
  };

  updateLanguageToggle(savedLanguage);

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      const currentLanguage = localStorage.getItem("language") || "de";
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

  // Active section highlighting
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
  const sections = [];
  navLinks.forEach((link) => {
    const id = link.getAttribute("href");
    const section = document.querySelector(id);
    if (section) {
      sections.push({ id, section, link });
    }
  });

  if (sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        let active = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            active = entry.target;
          }
        });
        if (active) {
          sections.forEach((s) => {
            s.link.classList.toggle("active-section", s.section === active);
          });
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s.section));
  }
});
