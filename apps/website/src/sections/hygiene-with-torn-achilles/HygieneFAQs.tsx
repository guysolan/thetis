import FAQSection from "@/components/FAQSection";
import type { Lang } from "@/config/languages";

interface Props {
    lang?: Lang;
}

const faqContent: Record<Lang, { question: string; answer: string }[]> = {
    en: [
        {
            question: "How do I keep my bed clean with Achilles rupture?",
            answer:
                "The Thetis night splint solves this problem by replacing your dirty walking boot at night. The splint has a removable, washable liner that keeps your bed clean and hygienic during recovery. No more dirt from your boot getting into your sheets.",
        },
        {
            question: "Can I wash the Achilles rupture splint?",
            answer:
                "Yes, the Thetis splint features a removable liner that can be washed regularly. This maintains hygiene and prevents the dirt and sweat from your boot getting into your bed sheets. The main structure can be wiped clean easily.",
        },
        {
            question: "Why is my bed getting dirty from my boot?",
            answer:
                "Walking boots accumulate dirt, debris, and bacteria from daily use. When you sleep in your boot, this transfers to your bed. The Thetis night splint provides a clean, washable alternative for overnight protection that won't dirty your sheets.",
        },
        {
            question: "Is the splint more hygienic than sleeping in my boot?",
            answer:
                "Yes, significantly more hygienic. Unlike your boot which goes everywhere outdoors, the night splint is used only for sleep. The removable, washable liner can be cleaned regularly, keeping your sleeping environment fresh and clean.",
        },
        {
            question: "How often should I wash the splint liner?",
            answer:
                "We recommend washing the removable liner weekly, or more frequently if needed. It's easy to remove and machine washable, making it simple to maintain good hygiene throughout your recovery.",
        },
    ],
    de: [
        {
            question:
                "Wie halte ich mein Bett mit Achillessehnenruptur sauber?",
            answer:
                "Die Thetis-Nachtschiene löst dieses Problem, indem sie nachts Ihren schmutzigen Gehstiefel ersetzt. Die Schiene hat eine herausnehmbare, waschbare Innenschicht, die Ihr Bett während der Genesung sauber und hygienisch hält.",
        },
        {
            question: "Kann ich die Achillessehnenruptur-Schiene waschen?",
            answer:
                "Ja, die Thetis-Schiene verfügt über eine herausnehmbare Innenschicht, die regelmäßig gewaschen werden kann. Dies erhält die Hygiene und verhindert, dass Schmutz und Schweiß von Ihrem Stiefel in Ihre Bettwäsche gelangen.",
        },
        {
            question: "Warum wird mein Bett durch meinen Stiefel schmutzig?",
            answer:
                "Gehstiefel sammeln Schmutz, Ablagerungen und Bakterien durch den täglichen Gebrauch. Wenn Sie in Ihrem Stiefel schlafen, überträgt sich dies auf Ihr Bett. Die Thetis-Nachtschiene bietet eine saubere, waschbare Alternative für den nächtlichen Schutz.",
        },
        {
            question:
                "Ist die Schiene hygienischer als im Stiefel zu schlafen?",
            answer:
                "Ja, deutlich hygienischer. Im Gegensatz zu Ihrem Stiefel, der überall draußen hingeht, wird die Nachtschiene nur zum Schlafen verwendet. Die herausnehmbare, waschbare Innenschicht kann regelmäßig gereinigt werden.",
        },
        {
            question: "Wie oft sollte ich die Schienen-Innenschicht waschen?",
            answer:
                "Wir empfehlen, die herausnehmbare Innenschicht wöchentlich zu waschen, oder häufiger bei Bedarf. Sie ist leicht zu entfernen und maschinenwaschbar, was es einfach macht, während Ihrer Genesung eine gute Hygiene aufrechtzuerhalten.",
        },
    ],
    fr: [
        {
            question:
                "Comment garder mon lit propre avec une rupture d'Achille?",
            answer:
                "L'attelle de nuit Thetis résout ce problème en remplaçant votre botte de marche sale la nuit. L'attelle a une doublure amovible et lavable qui garde votre lit propre et hygiénique pendant la récupération.",
        },
        {
            question: "Puis-je laver l'attelle de rupture d'Achille?",
            answer:
                "Oui, l'attelle Thetis dispose d'une doublure amovible qui peut être lavée régulièrement. Cela maintient l'hygiène et empêche la saleté et la sueur de votre botte d'entrer dans vos draps.",
        },
        {
            question: "Pourquoi mon lit devient-il sale à cause de ma botte?",
            answer:
                "Les bottes de marche accumulent la saleté, les débris et les bactéries lors de l'usage quotidien. Quand vous dormez dans votre botte, cela se transfère à votre lit. L'attelle de nuit Thetis offre une alternative propre et lavable.",
        },
        {
            question:
                "L'attelle est-elle plus hygiénique que dormir dans ma botte?",
            answer:
                "Oui, beaucoup plus hygiénique. Contrairement à votre botte qui va partout à l'extérieur, l'attelle de nuit est utilisée uniquement pour dormir. La doublure amovible et lavable peut être nettoyée régulièrement.",
        },
        {
            question:
                "À quelle fréquence dois-je laver la doublure de l'attelle?",
            answer:
                "Nous recommandons de laver la doublure amovible chaque semaine, ou plus fréquemment si nécessaire. Elle est facile à retirer et lavable en machine, ce qui facilite le maintien d'une bonne hygiène.",
        },
    ],
    es: [
        {
            question: "¿Cómo mantengo mi cama limpia con rotura de Aquiles?",
            answer:
                "La férula nocturna Thetis resuelve este problema reemplazando su bota de caminar sucia por la noche. La férula tiene un forro extraíble y lavable que mantiene su cama limpia e higiénica durante la recuperación.",
        },
        {
            question: "¿Puedo lavar la férula de rotura de Aquiles?",
            answer:
                "Sí, la férula Thetis cuenta con un forro extraíble que puede lavarse regularmente. Esto mantiene la higiene y evita que la suciedad y el sudor de su bota lleguen a sus sábanas.",
        },
        {
            question: "¿Por qué mi cama se ensucia por mi bota?",
            answer:
                "Las botas de caminar acumulan suciedad, escombros y bacterias del uso diario. Cuando duerme con su bota, esto se transfiere a su cama. La férula nocturna Thetis proporciona una alternativa limpia y lavable.",
        },
        {
            question: "¿Es la férula más higiénica que dormir con mi bota?",
            answer:
                "Sí, significativamente más higiénica. A diferencia de su bota que va a todos lados al aire libre, la férula nocturna se usa solo para dormir. El forro extraíble y lavable puede limpiarse regularmente.",
        },
        {
            question: "¿Con qué frecuencia debo lavar el forro de la férula?",
            answer:
                "Recomendamos lavar el forro extraíble semanalmente, o con más frecuencia si es necesario. Es fácil de quitar y lavable a máquina, lo que facilita mantener una buena higiene.",
        },
    ],
    it: [
        {
            question:
                "Come mantengo il mio letto pulito con la rottura dell'Achille?",
            answer:
                "La stecca notturna Thetis risolve questo problema sostituendo il tuo stivale da passeggio sporco di notte. La stecca ha un rivestimento rimovibile e lavabile che mantiene il tuo letto pulito e igienico durante il recupero.",
        },
        {
            question: "Posso lavare la stecca per la rottura dell'Achille?",
            answer:
                "Sì, la stecca Thetis dispone di un rivestimento rimovibile che può essere lavato regolarmente. Questo mantiene l'igiene e impedisce che lo sporco e il sudore del tuo stivale entrino nelle tue lenzuola.",
        },
        {
            question: "Perché il mio letto si sporca dal mio stivale?",
            answer:
                "Gli stivali da passeggio accumulano sporco, detriti e batteri dall'uso quotidiano. Quando dormi nel tuo stivale, questo si trasferisce al tuo letto. La stecca notturna Thetis fornisce un'alternativa pulita e lavabile.",
        },
        {
            question: "La stecca è più igienica che dormire nel mio stivale?",
            answer:
                "Sì, significativamente più igienica. A differenza del tuo stivale che va ovunque all'aperto, la stecca notturna viene usata solo per dormire. Il rivestimento rimovibile e lavabile può essere pulito regolarmente.",
        },
        {
            question:
                "Quanto spesso dovrei lavare il rivestimento della stecca?",
            answer:
                "Raccomandiamo di lavare il rivestimento rimovibile settimanalmente, o più frequentemente se necessario. È facile da rimuovere e lavabile in lavatrice, rendendo semplice mantenere una buona igiene.",
        },
    ],
};

const titles: Record<Lang, string> = {
    en: "Frequently Asked Questions About Hygiene",
    de: "Häufig gestellte Fragen zur Hygiene",
    fr: "Questions Fréquemment Posées sur l'Hygiène",
    es: "Preguntas Frecuentes sobre Higiene",
    it: "Domande Frequenti sull'Igiene",
};

export default function HygieneFAQs({ lang = "en" }: Props) {
    const questions = faqContent[lang] || faqContent.en;
    const title = titles[lang] || titles.en;

    return <FAQSection lang={lang} title={title} faqs={questions} />;
}
