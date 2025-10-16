import FAQSection from "@/components/FAQSection";
import type { Lang } from "@/config/languages";

interface Props {
    lang?: Lang;
}

const faqContent: Record<
    Lang,
    { question: string; answer: string }[]
> = {
    en: [
        {
            question: "Can I sleep without my boot after Achilles rupture?",
            answer:
                "Yes, with the Thetis night splint you can safely remove your heavy boot and sleep comfortably. The splint maintains the necessary plantarflexion position to protect your healing Achilles tendon while being much lighter and more comfortable for sleep.",
        },
        {
            question:
                "How does the night splint keep my Achilles safe while sleeping?",
            answer:
                "The night splint is designed to maintain your foot in the optimal plantarflexion (pointed toe) position throughout the night. This position keeps tension off your healing Achilles tendon, preventing re-rupture while allowing comfortable sleep.",
        },
        {
            question: "Is the night splint better than sleeping in my boot?",
            answer:
                "Yes, the night splint is specifically designed for sleep. It's much lighter, more breathable, and allows better sleep quality compared to heavy walking boots. Over 3,000 patients have used it safely with no complications.",
        },
        {
            question: "Will I wake up if I move my foot the wrong way?",
            answer:
                "The splint is designed to prevent unsafe movements while allowing comfortable sleep. The secure straps keep your foot in the proper position without being restrictive, so you can sleep soundly knowing your Achilles is protected.",
        },
        {
            question: "Can any boot be comfortable for sleeping?",
            answer:
                "No. Walking boots are designed for daytime mobility, not sleep. They're bulky, trap heat, and keep your heel suspended - never touching the sheets. With our splint, your heel is free and can touch the bed naturally. It's a completely different sleeping experience.",
        },
        {
            question: "Can I use this instead of my boot at night?",
            answer:
                "Many patients use both - their walking boot during the day for mobility and the Thetis splint at night for comfortable sleep. Always consult with your healthcare provider about the best approach for your specific recovery.",
        },
    ],
    de: [
        {
            question:
                "Kann ich ohne meinen Stiefel nach einer Achillessehnenruptur schlafen?",
            answer:
                "Ja, mit der Thetis-Nachtschiene können Sie Ihren schweren Stiefel sicher abnehmen und bequem schlafen. Die Schiene behält die notwendige Plantarflexion bei, um Ihre heilende Achillessehne zu schützen, während sie viel leichter und bequemer für den Schlaf ist.",
        },
        {
            question:
                "Wie hält die Nachtschiene meine Achillessehne während des Schlafes sicher?",
            answer:
                "Die Nachtschiene ist so konzipiert, dass sie Ihren Fuß die ganze Nacht über in der optimalen Plantarflexion (Zehenspitzenstellung) hält. Diese Position hält die Spannung von Ihrer heilenden Achillessehne fern und verhindert eine erneute Ruptur, während sie einen bequemen Schlaf ermöglicht.",
        },
        {
            question: "Ist die Nachtschiene besser als im Stiefel zu schlafen?",
            answer:
                "Ja, die Nachtschiene ist speziell für den Schlaf konzipiert. Sie ist viel leichter, atmungsaktiver und ermöglicht eine bessere Schlafqualität im Vergleich zu schweren Stiefeln. Über 3.000 Patienten haben sie sicher ohne Komplikationen verwendet.",
        },
        {
            question: "Werde ich aufwachen, wenn ich meinen Fuß falsch bewege?",
            answer:
                "Die Schiene ist so konzipiert, dass sie unsichere Bewegungen verhindert und gleichzeitig einen bequemen Schlaf ermöglicht. Die sicheren Riemen halten Ihren Fuß in der richtigen Position, ohne einschränkend zu sein, sodass Sie ruhig schlafen können, in dem Wissen, dass Ihre Achillessehne geschützt ist.",
        },
        {
            question: "Kann ein Stiefel zum Schlafen bequem sein?",
            answer:
                "Nein. Gehstiefel sind für die Mobilität am Tag konzipiert, nicht für den Schlaf. Sie sind sperrig, stauen Wärme und halten Ihre Ferse schwebend - sie berührt nie die Laken. Mit unserer Schiene ist Ihre Ferse frei und kann das Bett natürlich berühren. Es ist ein völlig anderes Schlaferlebnis.",
        },
        {
            question:
                "Kann ich dies nachts anstelle meines Stiefels verwenden?",
            answer:
                "Viele Patienten verwenden beides - ihren Gehstiefel tagsüber für die Mobilität und die Thetis-Schiene nachts für bequemen Schlaf. Konsultieren Sie immer Ihren Gesundheitsdienstleister über den besten Ansatz für Ihre spezifische Genesung.",
        },
    ],
    fr: [
        {
            question:
                "Puis-je dormir sans ma botte après une rupture du tendon d'Achille?",
            answer:
                "Oui, avec l'attelle de nuit Thetis, vous pouvez retirer votre botte lourde en toute sécurité et dormir confortablement. L'attelle maintient la position de flexion plantaire nécessaire pour protéger votre tendon d'Achille en guérison tout en étant beaucoup plus légère et confortable pour dormir.",
        },
        {
            question:
                "Comment l'attelle de nuit garde-t-elle mon tendon d'Achille en sécurité pendant le sommeil?",
            answer:
                "L'attelle de nuit est conçue pour maintenir votre pied dans la position optimale de flexion plantaire (pointe du pied) toute la nuit. Cette position maintient la tension hors de votre tendon d'Achille en guérison, prévenant la re-rupture tout en permettant un sommeil confortable.",
        },
        {
            question:
                "L'attelle de nuit est-elle meilleure que dormir dans ma botte?",
            answer:
                "Oui, l'attelle de nuit est spécifiquement conçue pour le sommeil. Elle est beaucoup plus légère, plus respirante et permet une meilleure qualité de sommeil par rapport aux bottes lourdes. Plus de 3 000 patients l'ont utilisée en toute sécurité sans complications.",
        },
        {
            question:
                "Vais-je me réveiller si je bouge mon pied de la mauvaise façon?",
            answer:
                "L'attelle est conçue pour empêcher les mouvements dangereux tout en permettant un sommeil confortable. Les sangles sécurisées maintiennent votre pied dans la bonne position sans être restrictives, vous permettant de dormir paisiblement en sachant que votre Achille est protégé.",
        },
        {
            question: "Une botte peut-elle être confortable pour dormir?",
            answer:
                "Non. Les bottes de marche sont conçues pour la mobilité diurne, pas pour le sommeil. Elles sont encombrantes, emprisonnent la chaleur et maintiennent votre talon suspendu - ne touchant jamais les draps. Avec notre attelle, votre talon est libre et peut toucher le lit naturellement. C'est une expérience de sommeil complètement différente.",
        },
        {
            question: "Puis-je utiliser ceci à la place de ma botte la nuit?",
            answer:
                "De nombreux patients utilisent les deux - leur botte de marche pendant la journée pour la mobilité et l'attelle Thetis la nuit pour un sommeil confortable. Consultez toujours votre professionnel de santé sur la meilleure approche pour votre rétablissement spécifique.",
        },
    ],
    es: [
        {
            question:
                "¿Puedo dormir sin mi bota después de la rotura del tendón de Aquiles?",
            answer:
                "Sí, con la férula nocturna Thetis puede quitarse su bota pesada de forma segura y dormir cómodamente. La férula mantiene la posición de flexión plantar necesaria para proteger su tendón de Aquiles en curación mientras es mucho más ligera y cómoda para dormir.",
        },
        {
            question:
                "¿Cómo mantiene la férula nocturna mi Aquiles seguro mientras duermo?",
            answer:
                "La férula nocturna está diseñada para mantener su pie en la posición óptima de flexión plantar (punta del pie) durante toda la noche. Esta posición mantiene la tensión fuera de su tendón de Aquiles en curación, previniendo la re-rotura mientras permite un sueño cómodo.",
        },
        {
            question: "¿Es la férula nocturna mejor que dormir con mi bota?",
            answer:
                "Sí, la férula nocturna está diseñada específicamente para el sueño. Es mucho más ligera, más transpirable y permite una mejor calidad de sueño en comparación con las botas pesadas. Más de 3,000 pacientes la han usado de forma segura sin complicaciones.",
        },
        {
            question: "¿Me despertaré si muevo mi pie de la manera incorrecta?",
            answer:
                "La férula está diseñada para prevenir movimientos inseguros mientras permite un sueño cómodo. Las correas seguras mantienen su pie en la posición adecuada sin ser restrictivas, por lo que puede dormir tranquilamente sabiendo que su Aquiles está protegido.",
        },
        {
            question: "¿Puede una bota ser cómoda para dormir?",
            answer:
                "No. Las botas de caminar están diseñadas para la movilidad diurna, no para dormir. Son voluminosas, atrapan el calor y mantienen su talón suspendido - nunca tocando las sábanas. Con nuestra férula, su talón está libre y puede tocar la cama naturalmente. Es una experiencia de sueño completamente diferente.",
        },
        {
            question: "¿Puedo usar esto en lugar de mi bota por la noche?",
            answer:
                "Muchos pacientes usan ambos: su bota de caminar durante el día para movilidad y la férula Thetis por la noche para un sueño cómodo. Siempre consulte con su proveedor de atención médica sobre el mejor enfoque para su recuperación específica.",
        },
    ],
    it: [
        {
            question:
                "Posso dormire senza il mio stivale dopo la rottura del tendine d'Achille?",
            answer:
                "Sì, con la stecca notturna Thetis puoi rimuovere in sicurezza il tuo stivale pesante e dormire comodamente. La stecca mantiene la posizione di flessione plantare necessaria per proteggere il tuo tendine d'Achille in guarigione pur essendo molto più leggera e comoda per dormire.",
        },
        {
            question:
                "Come fa la stecca notturna a mantenere il mio Achille al sicuro mentre dormo?",
            answer:
                "La stecca notturna è progettata per mantenere il tuo piede nella posizione ottimale di flessione plantare (punta del piede) per tutta la notte. Questa posizione mantiene la tensione fuori dal tuo tendine d'Achille in guarigione, prevenendo la re-rottura mentre consente un sonno confortevole.",
        },
        {
            question:
                "La stecca notturna è meglio che dormire nel mio stivale?",
            answer:
                "Sì, la stecca notturna è progettata specificamente per il sonno. È molto più leggera, più traspirante e consente una migliore qualità del sonno rispetto agli stivali pesanti. Oltre 3.000 pazienti l'hanno usata in sicurezza senza complicazioni.",
        },
        {
            question: "Mi sveglierò se muovo il piede nel modo sbagliato?",
            answer:
                "La stecca è progettata per prevenire movimenti non sicuri permettendo al contempo un sonno confortevole. Le cinghie sicure mantengono il piede nella posizione corretta senza essere restrittive, così puoi dormire tranquillamente sapendo che il tuo Achille è protetto.",
        },
        {
            question: "Uno stivale può essere comodo per dormire?",
            answer:
                "No. Gli stivali da passeggio sono progettati per la mobilità diurna, non per dormire. Sono ingombranti, intrappolano il calore e mantengono il tallone sospeso - mai a contatto con le lenzuola. Con la nostra stecca, il tallone è libero e può toccare il letto naturalmente. È un'esperienza di sonno completamente diversa.",
        },
        {
            question: "Posso usare questo invece del mio stivale di notte?",
            answer:
                "Molti pazienti usano entrambi - il loro stivale da passeggio durante il giorno per la mobilità e la stecca Thetis di notte per un sonno confortevole. Consulta sempre il tuo operatore sanitario sul miglior approccio per il tuo recupero specifico.",
        },
    ],
};

const titles: Record<Lang, string> = {
    en: "Frequently Asked Questions About Sleeping",
    de: "Häufig gestellte Fragen zum Schlafen",
    fr: "Questions Fréquemment Posées sur le Sommeil",
    es: "Preguntas Frecuentes sobre Dormir",
    it: "Domande Frequenti sul Dormire",
};

export default function SleepingFAQs({ lang = "en" }: Props) {
    const questions = faqContent[lang] || faqContent.en;
    const title = titles[lang] || titles.en;

    return <FAQSection lang={lang} title={title} faqs={questions} />;
}
