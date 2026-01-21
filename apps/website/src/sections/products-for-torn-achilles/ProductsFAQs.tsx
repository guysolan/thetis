import FAQSection from "@/components/FAQSection";
import type { Lang } from "@/config/languages";

interface Props {
    lang?: Lang;
}

const faqContent: Record<Lang, { question: string; answer: string }[]> = {
    en: [
        {
            question: "What products do I need for Achilles rupture recovery?",
            answer:
                "The essential product is the Thetis night splint for safe overnight protection. Additionally, you may benefit from a walking boot for daytime (often provided by your healthcare team), elevation wedges, and hygiene products.",
        },
        {
            question: "How does the Thetis night splint compare to a walking boot?",
            answer:
                "The Thetis night splint is designed for overnight use and sleep comfort. A walking boot is for daytime mobility. Many patients use both - a walking boot during the day and a night splint at night. They serve different purposes. Always follow your clinician’s protocol.",
        },
        {
            question: "What makes Thetis Medical products different?",
            answer:
                "Thetis Medical products are designed specifically for Achilles rupture recovery. Our night splint uses a patented design and is intended to help maintain a safe plantarflexed position overnight, in line with your clinician’s protocol.",
        },
        {
            question: "Do I need anything else besides the splint?",
            answer:
                "The night splint is the core product for safe overnight recovery. Other helpful items can include a shoe leveler to help balance leg length while wearing a boot, elevation wedges for reducing swelling, and waterproof covers for showering.",
        },
        {
            question: "Can I use this instead of my walking boot?",
            answer:
                "The Thetis splint is designed specifically for nighttime use and sleeping. You should continue using your walking boot during the day for mobility as prescribed by your healthcare provider. The splint allows you to sleep comfortably without the heavy boot.",
        },
    ],
    de: [
        {
            question:
                "Welche Produkte brauche ich für die Achillessehnenruptur-Erholung?",
            answer:
                "Das wesentliche Produkt ist die Thetis-Nachtschiene für sicheren nächtlichen Schutz. Zusätzlich können Sie von einem Gehstiefel für tagsüber (oft von Ihrem Gesundheitsteam bereitgestellt), Erhöhungskeilen und Hygieneprodukten profitieren.",
        },
        {
            question:
                "Wie unterscheidet sich die Thetis-Nachtschiene von einem Gehstiefel?",
            answer:
                "Die Thetis-Nachtschiene ist speziell für nächtlichen Komfort und Schlaf konzipiert, was sie ideal für die Nachtzeit macht. Ein Gehstiefel ist für die Mobilität tagsüber. Viele Patienten verwenden beides - einen Gehstiefel tagsüber und die Thetis-Schiene für bequemen Schlaf nachts.",
        },
        {
            question: "Was macht Thetis Medical-Produkte anders?",
            answer:
                "Thetis Medical-Produkte sind speziell für die Achillessehnenruptur-Erholung entwickelt. Unsere Nachtschiene nutzt ein patentiertes Design und soll den Fuß nachts in einer sicheren Plantarflexion halten – entsprechend Ihrem Behandlungsplan.",
        },
        {
            question: "Brauche ich außer der Schiene noch etwas anderes?",
            answer:
                "Die Nachtschiene ist das Kernprodukt für sichere nächtliche Erholung. Weitere hilfreiche Artikel können ein Schuhausgleich zur Beinlängenanpassung im Gehstiefel, Erhöhungskeile zur Reduzierung von Schwellungen und wasserdichte Abdeckungen zum Duschen sein.",
        },
        {
            question: "Kann ich dies anstelle meines Gehstiefels verwenden?",
            answer:
                "Die Thetis-Schiene ist speziell für die Nachtzeit und zum Schlafen konzipiert. Sie sollten Ihren Gehstiefel tagsüber für die Mobilität weiterhin wie von Ihrem Arzt verschrieben verwenden. Die Schiene ermöglicht es Ihnen, bequem ohne den schweren Stiefel zu schlafen.",
        },
    ],
    fr: [
        {
            question:
                "De quels produits ai-je besoin pour la récupération de la rupture d'Achille?",
            answer:
                "Le produit essentiel est l'attelle de nuit Thetis pour une protection nocturne sûre. De plus, vous pouvez bénéficier d'une botte de marche pour la journée (souvent fournie par votre équipe soignante), de coussins d'élévation et de produits d'hygiène.",
        },
        {
            question:
                "En quoi l'attelle de nuit Thetis est-elle différente d'une botte de marche ?",
            answer:
                "L'attelle de nuit Thetis est conçue pour la nuit et le sommeil. Une botte de marche est pour la journée. De nombreux patients utilisent les deux - une botte de marche pendant la journée et une attelle de nuit la nuit. Elles ont des usages différents.",
        },
        {
            question:
                "Qu'est-ce qui rend les produits Thetis Medical différents?",
            answer:
                "Les produits Thetis Medical sont conçus spécifiquement pour la récupération de la rupture d'Achille. Notre attelle de nuit utilise un design breveté et vise à maintenir une flexion plantaire sûre la nuit, selon le protocole de votre clinicien.",
        },
        {
            question: "Ai-je besoin d'autre chose que l'attelle?",
            answer:
                "L'attelle de nuit est le produit principal pour une récupération nocturne sûre. D'autres articles utiles peuvent inclure un rehausseur de chaussure pour équilibrer la longueur des jambes avec une botte, des coussins d'élévation pour réduire l'enflure et des couvertures imperméables pour la douche.",
        },
        {
            question: "Puis-je utiliser ceci à la place de ma botte de marche?",
            answer:
                "L'attelle Thetis est conçue spécifiquement pour une utilisation nocturne et pour dormir. Vous devriez continuer à utiliser votre botte de marche pendant la journée pour la mobilité comme prescrit par votre professionnel de santé. L'attelle vous permet de dormir confortablement sans la botte lourde.",
        },
    ],
    es: [
        {
            question:
                "¿Qué productos necesito para la recuperación de la rotura de Aquiles?",
            answer:
                "El producto esencial es la férula nocturna Thetis para protección nocturna segura. Además, puede beneficiarse de una bota de caminar para el día (a menudo proporcionada por su equipo de atención médica), cuñas de elevación y productos de higiene.",
        },
        {
            question:
                "¿En qué se diferencia la férula nocturna Thetis de una bota de caminar?",
            answer:
                "La férula nocturna Thetis está diseñada para la noche y el sueño. Una bota de caminar es para el día. Muchos pacientes usan ambos - una bota de caminar durante el día y una férula nocturna por la noche. Cumplen funciones diferentes.",
        },
        {
            question: "¿Qué hace diferentes a los productos de Thetis Medical?",
            answer:
                "Los productos de Thetis Medical están diseñados específicamente para la recuperación de la rotura de Aquiles. Nuestra férula nocturna utiliza un diseño patentado y está pensada para ayudar a mantener una flexión plantar segura por la noche, según el protocolo de su equipo médico.",
        },
        {
            question: "¿Necesito algo más además de la férula?",
            answer:
                "La férula nocturna es el producto principal para una recuperación nocturna segura. Otros artículos útiles pueden incluir un elevador/nivelador de calzado para equilibrar la longitud de las piernas con una bota, cuñas de elevación para reducir la hinchazón y cubiertas impermeables para ducharse.",
        },
        {
            question: "¿Puedo usar esto en lugar de mi bota de caminar?",
            answer:
                "La férula Thetis está diseñada específicamente para uso nocturno y para dormir. Debe continuar usando su bota de caminar durante el día para la movilidad según lo prescrito por su proveedor de atención médica. La férula le permite dormir cómodamente sin la bota pesada.",
        },
    ],
    it: [
        {
            question:
                "Di quali prodotti ho bisogno per il recupero dalla rottura dell'Achille?",
            answer:
                "Il prodotto essenziale è la stecca notturna Thetis per una protezione notturna sicura. Inoltre, puoi beneficiare di uno stivale da passeggio per il giorno (spesso fornito dal tuo team sanitario), cunei di elevazione e prodotti per l'igiene.",
        },
        {
            question:
                "In cosa è diversa la stecca notturna Thetis da uno stivale da passeggio?",
            answer:
                "La stecca notturna Thetis è progettata per la notte e il sonno. Uno stivale da passeggio è per il giorno. Molti pazienti usano entrambi - uno stivale da passeggio durante il giorno e una stecca notturna di notte. Hanno scopi diversi.",
        },
        {
            question: "Cosa rende diversi i prodotti Thetis Medical?",
            answer:
                "I prodotti Thetis Medical sono progettati specificamente per il recupero dalla rottura dell'Achille. La nostra stecca notturna utilizza un design brevettato ed è pensata per aiutare a mantenere una flessione plantare sicura durante la notte, secondo il protocollo del tuo clinico.",
        },
        {
            question: "Ho bisogno di qualcos'altro oltre alla stecca?",
            answer:
                "La stecca notturna è il prodotto principale per un recupero notturno sicuro. Altri articoli utili possono includere un rialzo/livellatore per le scarpe per bilanciare la lunghezza delle gambe con lo stivale, cunei di elevazione per ridurre il gonfiore e coperture impermeabili per la doccia.",
        },
        {
            question: "Posso usare questo invece del mio stivale da passeggio?",
            answer:
                "La stecca Thetis è progettata specificamente per l'uso notturno e per dormire. Dovresti continuare a usare il tuo stivale da passeggio durante il giorno per la mobilità come prescritto dal tuo operatore sanitario. La stecca ti permette di dormire comodamente senza lo stivale pesante.",
        },
    ],
};

const titles: Record<Lang, string> = {
    en: "Frequently Asked Questions",
    de: "Häufig gestellte Fragen",
    fr: "Questions Fréquemment Posées",
    es: "Preguntas Frecuentes",
    it: "Domande Frequenti",
};

export default function ProductsFAQs({ lang = "en" }: Props) {
    const questions = faqContent[lang] || faqContent.en;
    const title = titles[lang] || titles.en;

    return <FAQSection lang={lang} title={title} faqs={questions} />;
}
