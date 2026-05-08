import {
  Activity,
  BookOpen,
  Calendar,
  Heart,
  HelpCircle,
  Hourglass,
  Stethoscope,
} from "lucide-react";
import type { BaseRoute } from "./types";

// Recovery phase routes (timeline-based articles) — Achilles rupture
export const recoveryPhaseRoutes: BaseRoute[] = [
  {
    conditionId: "achilles-rupture",
    slug: "guide/weeks-0-1",
    title: {
      en: "Week 0-1: First Week After Rupture",
      de: "Woche 0-1: Erste Woche nach der Ruptur",
      fr: "Semaine 0-1: Première Semaine Après la Rupture",
      es: "Semana 0-1: Primera Semana Después de la Rotura",
      it: "Settimana 0-1: Prima Settimana Dopo la Rottura",
    },
    description: {
      en:
        "Emergency care, A&E expectations, blood clot prevention, and essential first-week survival tips.",
      de:
        "Notfallversorgung, Erwartungen in der Notaufnahme, Blutgerinnselprävention und wichtige Überlebenstipps für die erste Woche.",
      fr:
        "Soins d'urgence, attentes aux urgences, prévention des caillots sanguins et conseils de survie essentiels pour la première semaine.",
      es:
        "Atención de emergencia, expectativas en urgencias, prevención de coágulos y consejos esenciales para la primera semana.",
      it:
        "Cure d'emergenza, aspettative al pronto soccorso, prevenzione dei coaguli e consigli essenziali per la prima settimana.",
    },
    slugTranslations: {
      en: "guide/weeks-0-1",
      de: "leitfaden/wochen-0-1",
      fr: "guide/semaines-0-1",
      es: "guia/semanas-0-1",
      it: "guida/settimane-0-1",
    },
    icon: <Calendar />,
  },
  {
    conditionId: "achilles-rupture",
    slug: "guide/weeks-1-3",
    title: {
      en: "Weeks 1-3: Treatment Decision",
      de: "Wochen 1-3: Behandlungsentscheidung",
      fr: "Semaines 1-3: Décision de Traitement",
      es: "Semanas 1-3: Decisión de Tratamiento",
      it: "Settimane 1-3: Decisione del Trattamento",
    },
    description: {
      en:
        "Surgery vs conservative treatment, choosing your walking boot, and setting up for recovery.",
      de:
        "Operation vs konservative Behandlung, Auswahl des Gehstiefels und Vorbereitung auf die Genesung.",
      fr:
        "Chirurgie vs traitement conservateur, choix de votre botte de marche et préparation à la récupération.",
      es:
        "Cirugía vs tratamiento conservador, elección de tu bota ortopédica y preparación para la recuperación.",
      it:
        "Chirurgia vs trattamento conservativo, scelta dello stivale da deambulazione e preparazione al recupero.",
    },
    slugTranslations: {
      en: "guide/weeks-1-3",
      de: "leitfaden/wochen-1-3",
      fr: "guide/semaines-1-3",
      es: "guia/semanas-1-3",
      it: "guida/settimane-1-3",
    },
    icon: <Calendar />,
  },
  {
    conditionId: "achilles-rupture",
    slug: "guide/weeks-4-6",
    title: {
      en: "Weeks 4-6: Progressive Recovery",
      de: "Wochen 4-6: Progressive Genesung",
      fr: "Semaines 4-6: Récupération Progressive",
      es: "Semanas 4-6: Recuperación Progresiva",
      it: "Settimane 4-6: Recupero Progressivo",
    },
    description: {
      en:
        "Weight bearing progression, early exercises, and managing daily life during recovery.",
      de:
        "Belastungsprogression, frühe Übungen und Bewältigung des Alltags während der Genesung.",
      fr:
        "Progression de la mise en charge, exercices précoces et gestion de la vie quotidienne pendant la récupération.",
      es:
        "Progresión del apoyo, ejercicios tempranos y gestión de la vida diaria durante la recuperación.",
      it:
        "Progressione del carico, esercizi precoci e gestione della vita quotidiana durante il recupero.",
    },
    slugTranslations: {
      en: "guide/weeks-4-6",
      de: "leitfaden/wochen-4-6",
      fr: "guide/semaines-4-6",
      es: "guia/semanas-4-6",
      it: "guida/settimane-4-6",
    },
    icon: <Calendar />,
  },
  {
    conditionId: "achilles-rupture",
    slug: "guide/weeks-7-9",
    title: {
      en: "Weeks 7-9: Final Boot Phase",
      de: "Wochen 7-9: Letzte Stiefelphase",
      fr: "Semaines 7-9: Phase Finale de la Botte",
      es: "Semanas 7-9: Fase Final de la Bota",
      it: "Settimane 7-9: Fase Finale dello Stivale",
    },
    description: {
      en:
        "Preparing to transition out of your boot, increasing activity, and building confidence.",
      de:
        "Vorbereitung auf den Übergang aus dem Stiefel, Steigerung der Aktivität und Aufbau von Vertrauen.",
      fr:
        "Préparation à la transition hors de la botte, augmentation de l'activité et renforcement de la confiance.",
      es:
        "Preparación para la transición fuera de la bota, aumento de la actividad y construcción de confianza.",
      it:
        "Preparazione alla transizione fuori dallo stivale, aumento dell'attività e costruzione della fiducia.",
    },
    slugTranslations: {
      en: "guide/weeks-7-9",
      de: "leitfaden/wochen-7-9",
      fr: "guide/semaines-7-9",
      es: "guia/semanas-7-9",
      it: "guida/settimane-7-9",
    },
    icon: <Calendar />,
  },
  {
    conditionId: "achilles-rupture",
    slug: "guide/weeks-10-12",
    title: {
      en: "Weeks 10-12: Boot Transition",
      de: "Wochen 10-12: Stiefelübergang",
      fr: "Semaines 10-12: Transition de la Botte",
      es: "Semanas 10-12: Transición de la Bota",
      it: "Settimane 10-12: Transizione dello Stivale",
    },
    description: {
      en:
        "Moving from boot to shoes, building strength, and returning to normal walking.",
      de:
        "Übergang vom Stiefel zu Schuhen, Kraftaufbau und Rückkehr zum normalen Gehen.",
      fr:
        "Passage de la botte aux chaussures, renforcement musculaire et retour à la marche normale.",
      es:
        "Transición de la bota a zapatos, construcción de fuerza y vuelta a caminar normal.",
      it:
        "Passaggio dallo stivale alle scarpe, costruzione della forza e ritorno alla camminata normale.",
    },
    slugTranslations: {
      en: "guide/weeks-10-12",
      de: "leitfaden/wochen-10-12",
      fr: "guide/semaines-10-12",
      es: "guia/semanas-10-12",
      it: "guida/settimane-10-12",
    },
    icon: <Calendar />,
  },
  {
    conditionId: "achilles-rupture",
    slug: "guide/weeks-13-25",
    title: {
      en: "Weeks 13-25: Progressive Strengthening",
      de: "Wochen 13-25: Progressive Kräftigung",
      fr: "Semaines 13-25: Renforcement Progressif",
      es: "Semanas 13-25: Fortalecimiento Progresivo",
      it: "Settimane 13-25: Rafforzamento Progressivo",
    },
    description: {
      en:
        "Building strength and endurance, returning to activities, and preventing re-injury.",
      de:
        "Aufbau von Kraft und Ausdauer, Rückkehr zu Aktivitäten und Vermeidung von Wiederverletzungen.",
      fr:
        "Développement de la force et de l'endurance, retour aux activités et prévention des rechutes.",
      es:
        "Construcción de fuerza y resistencia, vuelta a las actividades y prevención de nuevas lesiones.",
      it:
        "Costruzione di forza e resistenza, ritorno alle attività e prevenzione di nuove lesioni.",
    },
    slugTranslations: {
      en: "guide/weeks-13-25",
      de: "leitfaden/wochen-13-25",
      fr: "guide/semaines-13-25",
      es: "guia/semanas-13-25",
      it: "guida/settimane-13-25",
    },
    icon: <Calendar />,
  },
  {
    conditionId: "achilles-rupture",
    slug: "guide/week-26-plus",
    title: {
      en: "Week 26+: Return to Sport",
      de: "Woche 26+: Rückkehr zum Sport",
      fr: "Semaine 26+: Retour au Sport",
      es: "Semana 26+: Vuelta al Deporte",
      it: "Settimana 26+: Ritorno allo Sport",
    },
    description: {
      en:
        "Full recovery assessment, return to running and sport, and long-term outlook.",
      de:
        "Vollständige Genesungsbewertung, Rückkehr zum Laufen und Sport und langfristige Aussichten.",
      fr:
        "Évaluation de récupération complète, retour à la course et au sport, et perspectives à long terme.",
      es:
        "Evaluación de recuperación completa, vuelta a correr y al deporte, y perspectivas a largo plazo.",
      it:
        "Valutazione del recupero completo, ritorno alla corsa e allo sport, e prospettive a lungo termine.",
    },
    slugTranslations: {
      en: "guide/week-26-plus",
      de: "leitfaden/woche-26-plus",
      fr: "guide/semaine-26-plus",
      es: "guia/semana-26-plus",
      it: "guida/settimana-26-plus",
    },
    icon: <Calendar />,
  },
];

// Article routes (FAQ style) — Achilles rupture
export const achillesRuptureArticleRoutes: BaseRoute[] = [
  {
    conditionId: "achilles-rupture",
    slug: "FAQs/achilles-rupture-timeline",
    title: {
      en: "Achilles Rupture Timeline",
      de: "Achillessehnenriss-Zeitplan",
      fr: "Chronologie de la Rupture d'Achille",
      es: "Cronología de la Ruptura de Aquiles",
      it: "Cronologia della Rottura di Achille",
    },
    description: {
      en:
        "Explore a detailed timeline outlining the treatment and recovery journey of an Achilles Tendon Rupture, from the moment of injury to regaining unrestricted activity. Discover the crucial phases and milestones along the way.",
      de:
        "Erkunden Sie eine detaillierte Zeitleiste, die die Behandlungs- und Genesungsreise eines Achillessehnenrisses umreißt, vom Moment der Verletzung bis zur Wiedererlangung uneingeschränkter Aktivität. Entdecken Sie die entscheidenden Phasen und Meilensteine auf dem Weg.",
      fr:
        "Explorez une chronologie détaillée décrivant le parcours de traitement et de récupération d'une rupture du tendon d'Achille, du moment de la blessure à la reprise d'activité sans restriction. Découvrez les phases cruciales et les jalons en cours de route.",
      es:
        "Explore una cronología detallada que describe el viaje de tratamiento y recuperación de una ruptura del tendón de Aquiles, desde el momento de la lesión hasta recuperar la actividad sin restricciones. Descubra las fases cruciales y los hitos en el camino.",
      it:
        "Esplora una cronologia dettagliata che delinea il percorso di trattamento e recupero di una rottura del tendine di Achille, dal momento della lesione al ritorno all'attività senza restrizioni. Scopri le fasi cruciali e le tappe lungo il percorso.",
    },
    slugTranslations: {
      en: "FAQs/achilles-rupture-timeline",
      de: "FAQs/achillessehnenriss-heilungsverlauf",
      fr: "FAQs/chronologie-rupture-achille",
      es: "FAQs/cronologia-ruptura-aquiles",
      it: "FAQs/cronologia-rottura-achille",
    },
    tags: [
      { words: "Treatment", color: "bg-orange-200" },
      { words: "Recovery", color: "bg-purple-200" },
    ],
    icon: <Calendar />,
  },
  {
    conditionId: "achilles-rupture",
    slug: "FAQs/achilles-tear-treatment",
    title: {
      en: "Torn Achilles Treatment Pathway",
      de: "Behandlungsweg für gerissene Achillessehne",
      fr: "Voie de Traitement d'Achille Déchiré",
      es: "Vía de Tratamiento de Aquiles Desgarrado",
      it: "Percorso di Trattamento per Achille Strappato",
    },
    description: {
      en:
        "Navigate through a comprehensive guide dedicated to understanding the treatment options for a ruptured Achilles tendon. Delve into aspects like surgical considerations, post-surgery pain management, and the path to recovery.",
      de:
        "Navigieren Sie durch einen umfassenden Leitfaden zur Verstehen der Behandlungsoptionen für eine gerissene Achillessehne. Vertiefen Sie sich in Aspekte wie chirurgische Überlegungen, postoperative Schmerzbehandlung und den Weg zur Genesung.",
      fr:
        "Naviguez à travers un guide complet dédié à la compréhension des options de traitement pour un tendon d'Achille rompu. Plongez dans des aspects comme les considérations chirurgicales, la gestion de la douleur post-chirurgicale et le chemin vers la récupération.",
      es:
        "Navegue a través de una guía completa dedicada a entender las opciones de tratamiento para un tendón de Aquiles roto. Profundice en aspectos como consideraciones quirúrgicas, manejo del dolor post-cirugía y el camino hacia la recuperación.",
      it:
        "Naviga attraverso una guida completa dedicata alla comprensione delle opzioni di trattamento per un tendine di Achille rotto. Approfondisci aspetti come considerazioni chirurgiche, gestione del dolore post-operatorio e il percorso verso la guarigione.",
    },
    subQuestions: {
      en: {
        q1: "How to treat a torn Achilles tendon / Op vs Non-Op?",
        q2: "How long can you wait for Achilles tendon surgery?",
        q3: "How long does Achilles tendon surgery take?",
        q4: "Recovery from Achilles Rupture Surgery",
        q5: "Pain after Achilles tendon rupture / surgery",
      },
      de: {
        q1: "Wie behandelt man eine gerissene Achillessehne / OP vs Nicht-OP?",
        q2: "Wie lange kann man mit einer Achillessehnen-OP warten?",
        q3: "Wie lange dauert eine Achillessehnen-Operation?",
        q4: "Genesung nach Achillessehnen-Operation",
        q5: "Schmerzen nach Achillessehnenriss / Operation",
      },
      fr: {
        q1:
          "Comment traiter un tendon d'Achille déchiré / Opération vs Non-Op?",
        q2:
          "Combien de temps peut-on attendre pour une chirurgie du tendon d'Achille?",
        q3: "Combien de temps dure une chirurgie du tendon d'Achille?",
        q4: "Récupération après chirurgie de rupture d'Achille",
        q5: "Douleur après rupture / chirurgie du tendon d'Achille",
      },
      es: {
        q1: "¿Cómo tratar un tendón de Aquiles roto / Cirugía vs No Cirugía?",
        q2:
          "¿Cuánto tiempo se puede esperar para la cirugía del tendón de Aquiles?",
        q3: "¿Cuánto dura la cirugía del tendón de Aquiles?",
        q4: "Recuperación después de la cirugía de ruptura de Aquiles",
        q5: "Dolor después de ruptura / cirugía del tendón de Aquiles",
      },
      it: {
        q1: "Come trattare un tendine di Achille rotto / Operazione vs Non-Op?",
        q2:
          "Quanto tempo si può aspettare per la chirurgia del tendine di Achille?",
        q3: "Quanto dura l'operazione del tendine di Achille?",
        q4: "Recupero dopo chirurgia della rottura di Achille",
        q5: "Dolore dopo rottura / chirurgia del tendine di Achille",
      },
    },
    slugTranslations: {
      en: "FAQs/achilles-tear-treatment",
      de: "FAQs/achillessehnenriss-behandlung",
      fr: "FAQs/traitement-rupture-achille",
      es: "FAQs/tratamiento-ruptura-aquiles",
      it: "FAQs/trattamento-rottura-achille",
    },
    tags: [{ words: "Treatment", color: "bg-orange-200" }],
    icon: <Activity />,
  },
  {
    conditionId: "achilles-rupture",
    slug: "FAQs/is-my-achilles-ruptured",
    title: {
      en: "Is My Achilles Ruptured?",
      de: "Ist meine Achillessehne gerissen?",
      fr: "Mon Achille est-il Rompu?",
      es: "¿Está Roto mi Aquiles?",
      it: "Il Mio Achille è Rotto?",
    },
    description: {
      en:
        "Uncover all you need to determine if you have experienced a ruptured Achilles tendon. Learn about the causes, symptoms, and the severity of the injury.",
      de:
        "Entdecken Sie alles, was Sie brauchen, um festzustellen, ob Sie eine gerissene Achillessehne erlebt haben. Lernen Sie über die Ursachen, Symptome und die Schwere der Verletzung.",
      fr:
        "Découvrez tout ce dont vous avez besoin pour déterminer si vous avez subi une rupture du tendon d'Achille. Apprenez les causes, les symptômes et la gravité de la blessure.",
      es:
        "Descubra todo lo que necesita para determinar si ha experimentado una ruptura del tendón de Aquiles. Aprenda sobre las causas, síntomas y la gravedad de la lesión.",
      it:
        "Scopri tutto quello che devi sapere per determinare se hai subito una rottura del tendine di Achille. Impara le cause, i sintomi e la gravità della lesione.",
    },
    subQuestions: {
      en: {
        q1: "Is my Achilles Ruptured?",
        q2: "What happens when you tear your Achilles?",
      },
      de: {
        q1: "Ist meine Achillessehne gerissen?",
        q2: "Was passiert, wenn Sie Ihre Achillessehne reißen?",
      },
      fr: {
        q1: "Mon tendon d'Achille est-il rompu?",
        q2: "Que se passe-t-il quand vous déchirez votre tendon d'Achille?",
      },
      es: {
        q1: "¿Está roto mi tendón de Aquiles?",
        q2: "¿Qué sucede cuando te rompes el tendón de Aquiles?",
      },
      it: {
        q1: "Il mio tendine di Achille è rotto?",
        q2: "Cosa succede quando ti rompi il tendine di Achille?",
      },
    },
    slugTranslations: {
      en: "FAQs/is-my-achilles-ruptured",
      de: "FAQs/achillessehnenriss-erkennen",
      fr: "FAQs/mon-achille-est-il-rompu",
      es: "FAQs/esta-roto-mi-aquiles",
      it: "FAQs/il-mio-achille-e-rotto",
    },
    legacySlugs: ["FAQs/es-mi-tendon-de-aquiles-roto"],
    tags: [{ words: "Diagnosis", color: "bg-rose-100" }],
    icon: <Stethoscope />,
  },
  {
    conditionId: "achilles-rupture",
    slug: "FAQs/torn-achilles-recovery",
    title: {
      en: "Torn Achilles Recovery",
      de: "Genesung von gerissener Achillessehne",
      fr: "Récupération d'Achille Déchiré",
      es: "Recuperación de Aquiles Desgarrado",
      it: "Recupero di Achille Strappato",
    },
    description: {
      en:
        "Find a comprehensive resource on torn Achilles recovery, covering aspects such as recovery duration with or without surgery, casts versus boots, and sleep considerations during recovery.",
      de:
        "Finden Sie eine umfassende Ressource zur Genesung von gerissener Achillessehne, die Aspekte wie Genesungsdauer mit oder ohne Operation, Gips versus Stiefel und Schlafüberlegungen während der Genesung abdeckt.",
      fr:
        "Trouvez une ressource complète sur la récupération d'Achille déchiré, couvrant des aspects tels que la durée de récupération avec ou sans chirurgie, plâtres versus bottes, et considérations de sommeil pendant la récupération.",
      es:
        "Encuentre un recurso completo sobre la recuperación de Aquiles desgarrado, cubriendo aspectos como duración de recuperación con o sin cirugía, yesos versus botas, y consideraciones de sueño durante la recuperación.",
      it:
        "Trova una risorsa completa sul recupero di Achille strappato, che copre aspetti come la durata del recupero con o senza chirurgia, gessi versus stivali, e considerazioni sul sonno durante il recupero.",
    },
    subQuestions: {
      en: {
        q1: "Walking casts vs boots",
        q2: "Which Achilles tendon rupture boot is best?",
        q3: "How to sleep with torn Achilles tendon?",
        q4: "How long for an Achilles tendon rupture to heal?",
      },
      de: {
        q1: "Gehgips vs. Stiefel",
        q2: "Welcher Stiefel ist am besten für einen Achillessehnenriss?",
        q3: "Wie schläft man mit gerissener Achillessehne?",
        q4: "Wie lange dauert die Heilung eines Achillessehnenrisses?",
      },
      fr: {
        q1: "Plâtres de marche vs bottes",
        q2:
          "Quelle botte est la meilleure pour une rupture du tendon d'Achille?",
        q3: "Comment dormir avec un tendon d'Achille déchiré?",
        q4:
          "Combien de temps faut-il pour guérir une rupture du tendon d'Achille?",
      },
      es: {
        q1: "Yesos vs botas para caminar",
        q2: "¿Qué bota es mejor para una ruptura del tendón de Aquiles?",
        q3: "¿Cómo dormir con un tendón de Aquiles roto?",
        q4: "¿Cuánto tarda en sanar una ruptura del tendón de Aquiles?",
      },
      it: {
        q1: "Gessi vs stivali per camminare",
        q2: "Quale stivale è migliore per una rottura del tendine di Achille?",
        q3: "Come dormire con un tendine di Achille rotto?",
        q4:
          "Quanto tempo ci vuole per guarire una rottura del tendine di Achille?",
      },
    },
    slugTranslations: {
      en: "FAQs/torn-achilles-recovery",
      de: "FAQs/achillessehnenriss-genesung",
      fr: "FAQs/recuperation-achille-dechire",
      es: "FAQs/recuperacion-aquiles-desgarrado",
      it: "FAQs/recupero-achille-strappato",
    },
    legacySlugs: ["FAQs/recuperacion-rotura-tendon-aquiles"],
    tags: [{ words: "Recovery", color: "bg-purple-200" }],
    icon: <Hourglass />,
  },
  {
    conditionId: "achilles-rupture",
    slug: "FAQs/what-happens-if-my-achilles-is-ruptured",
    title: {
      en: "What Happens If My Achilles Is Ruptured?",
      de: "Was passiert, wenn meine Achillessehne gerissen ist?",
      fr: "Que se Passe-t-il si Mon Achille est Rompu?",
      es: "¿Qué Sucede si mi Aquiles está Roto?",
      it: "Cosa Succede se il Mio Achille è Rotto?",
    },
    description: {
      en:
        "Gain insights about what to expect if you have a ruptured Achilles tendon, including initial treatment in A&E, physiotherapy recommendations, and the number of required check-ups.",
      de:
        "Gewinnen Sie Einblicke darüber, was zu erwarten ist, wenn Sie eine gerissene Achillessehne haben, einschließlich Erstbehandlung in der Notaufnahme, Physiotherapie-Empfehlungen und die Anzahl der erforderlichen Nachuntersuchungen.",
      fr:
        "Obtenez des aperçus sur ce à quoi s'attendre si vous avez un tendon d'Achille rompu, y compris le traitement initial aux urgences, les recommandations de physiothérapie et le nombre de contrôles requis.",
      es:
        "Obtenga información sobre qué esperar si tiene un tendón de Aquiles roto, incluyendo tratamiento inicial en urgencias, recomendaciones de fisioterapia y el número de chequeos requeridos.",
      it:
        "Ottieni informazioni su cosa aspettarti se hai un tendine di Achille rotto, inclusi il trattamento iniziale al pronto soccorso, le raccomandazioni di fisioterapia e il numero di controlli richiesti.",
    },
    subQuestions: {
      en: {
        q1: "What will happen in A&E?",
        q2: "What will the specialist do?",
        q3: "How many check-ups?",
        q4: "When should I see a physio?",
        q5: "Should I take blood-thinners?",
      },
      de: {
        q1: "Was passiert in der Notaufnahme?",
        q2: "Was wird der Spezialist tun?",
        q3: "Wie viele Kontrolluntersuchungen?",
        q4: "Wann sollte ich zur Physiotherapie gehen?",
        q5: "Sollte ich Blutverdünner nehmen?",
      },
      fr: {
        q1: "Que se passera-t-il aux urgences?",
        q2: "Que fera le spécialiste?",
        q3: "Combien de contrôles?",
        q4: "Quand dois-je voir un kinésithérapeute?",
        q5: "Dois-je prendre des anticoagulants?",
      },
      es: {
        q1: "¿Qué sucederá en urgencias?",
        q2: "¿Qué hará el especialista?",
        q3: "¿Cuántos chequeos?",
        q4: "¿Cuándo debo ver un fisioterapeuta?",
        q5: "¿Debo tomar anticoagulantes?",
      },
      it: {
        q1: "Cosa succederà al pronto soccorso?",
        q2: "Cosa farà lo specialista?",
        q3: "Quanti controlli?",
        q4: "Quando devo vedere un fisioterapista?",
        q5: "Devo prendere anticoagulanti?",
      },
    },
    slugTranslations: {
      en: "FAQs/what-happens-if-my-achilles-is-ruptured",
      de: "FAQs/achillessehnenriss-folgen",
      fr: "FAQs/que-se-passe-t-il-si-mon-achille-est-rompu",
      es: "FAQs/que-sucede-si-mi-aquiles-esta-roto",
      it: "FAQs/cosa-succede-se-il-mio-achille-e-rotto",
    },
    tags: [{ words: "Treatment", color: "bg-orange-200" }],
    icon: <HelpCircle />,
  },
  {
    conditionId: "achilles-rupture",
    slug: "FAQs/life-after-achilles-rupture",
    title: {
      en: "Life After Achilles Rupture",
      de: "Leben nach Achillessehnenriss",
      fr: "Vie Après la Rupture d'Achille",
      es: "Vida Después de la Ruptura de Aquiles",
      it: "Vita Dopo la Rottura di Achille",
    },
    description: {
      en:
        "Discover insights on life after an Achilles rupture, including when you can resume walking, working, and engaging in sports.",
      de:
        "Entdecken Sie Einblicke in das Leben nach einem Achillessehnenriss, einschließlich wann Sie wieder gehen, arbeiten und Sport treiben können.",
      fr:
        "Découvrez des aperçus sur la vie après une rupture d'Achille, y compris quand vous pouvez reprendre la marche, le travail et la pratique du sport.",
      es:
        "Descubra información sobre la vida después de una ruptura de Aquiles, incluyendo cuándo puede reanudar caminar, trabajar y participar en deportes.",
      it:
        "Scopri informazioni sulla vita dopo una rottura di Achille, inclusi quando puoi riprendere a camminare, lavorare e praticare sport.",
    },
    subQuestions: {
      en: {
        q1: "Life after Achilles tendon rupture",
        q2: "When can I play sport again?",
        q3: "When can I go back to physical work?",
        q4: "When can I walk after Achilles rupture?",
      },
      de: {
        q1: "Leben nach Achillessehnenriss",
        q2: "Wann kann ich wieder Sport treiben?",
        q3: "Wann kann ich wieder körperlich arbeiten?",
        q4: "Wann kann ich nach einem Achillessehnenriss wieder gehen?",
      },
      fr: {
        q1: "La vie après une rupture du tendon d'Achille",
        q2: "Quand puis-je reprendre le sport?",
        q3: "Quand puis-je reprendre le travail physique?",
        q4: "Quand puis-je marcher après une rupture d'Achille?",
      },
      es: {
        q1: "La vida después de una ruptura del tendón de Aquiles",
        q2: "¿Cuándo puedo volver a hacer deporte?",
        q3: "¿Cuándo puedo volver al trabajo físico?",
        q4: "¿Cuándo puedo caminar después de una ruptura de Aquiles?",
      },
      it: {
        q1: "La vita dopo una rottura del tendine di Achille",
        q2: "Quando posso riprendere lo sport?",
        q3: "Quando posso tornare al lavoro fisico?",
        q4: "Quando posso camminare dopo una rottura di Achille?",
      },
    },
    slugTranslations: {
      en: "FAQs/life-after-achilles-rupture",
      de: "FAQs/leben-nach-achillessehnenriss",
      fr: "FAQs/vie-apres-rupture-achille",
      es: "FAQs/vida-despues-ruptura-aquiles",
      it: "FAQs/vita-dopo-rottura-achille",
    },
    tags: [{ words: "Recovery", color: "bg-purple-200" }],
    icon: <Heart />,
  },
];

/** Main condition learn hub (/learn/achilles-rupture) — nav, footer, language switching */
export const achillesRuptureGuideHubNavRoute: BaseRoute = {
  conditionId: "achilles-rupture",
  slug: "learn/achilles-rupture",
  title: {
    en: "Achilles rupture — learn",
    de: "Achillessehnenruptur — Lernen",
    fr: "Rupture d'Achille — apprendre",
    es: "Rotura de Aquiles — aprender",
    it: "Rottura di Achille — approfondisci",
  },
  description: {
    en: "Course, FAQs, week-by-week guides, and links to shop for Achilles rupture.",
    de: "Kurs, FAQs, wöchentliche Leitfäden und Shop-Links zur Achillessehnenruptur.",
    fr: "Cours, FAQ, guides semaine par semaine et liens boutique pour la rupture d'Achille.",
    es: "Curso, preguntas frecuentes, guías semana a semana y enlaces a la tienda.",
    it: "Corso, FAQ, guide settimana per settimana e link allo shop.",
  },
  slugTranslations: {
    en: "learn/achilles-rupture",
    de: "learn/achilles-rupture",
    fr: "learn/achilles-rupture",
    es: "learn/achilles-rupture",
    it: "learn/achilles-rupture",
  },
  legacySlugs: ["guide", "leitfaden"],
  icon: <BookOpen />,
};
