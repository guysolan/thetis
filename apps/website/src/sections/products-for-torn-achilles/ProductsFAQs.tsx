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
                "The essential product is the Thetis night splint for safe overnight protection. Additionally, you may benefit from a walking boot for daytime (often provided by your healthcare team), elevation wedges, and hygiene products. The Thetis splint is superior to generic alternatives for nighttime use.",
        },
        {
            question: "Is the Thetis splint better than VACOped?",
            answer:
                "The Thetis night splint is specifically designed for overnight comfort and sleep, making it ideal for nighttime use. VACOped is a walking boot for daytime. Many patients use both - VACOped during the day and Thetis splint for comfortable sleep at night. They serve different purposes.",
        },
        {
            question: "What makes Thetis Medical products different?",
            answer:
                "Thetis Medical products are designed specifically for Achilles rupture recovery, not generic foot injuries. Our night splint is the only one patented for this purpose, with surgeon endorsements and over 3,000 patients treated safely with zero complications.",
        },
        {
            question: "Do I need anything else besides the splint?",
            answer:
                "The night splint is the core product for safe overnight recovery. Other helpful items include an EVENup shoe leveler to prevent back pain, elevation wedges for reducing swelling, and waterproof covers for hygiene. We recommend starting with the splint as your priority.",
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
            question: "Ist die Thetis-Schiene besser als VACOped?",
            answer:
                "Die Thetis-Nachtschiene ist speziell für nächtlichen Komfort und Schlaf konzipiert, was sie ideal für die Nachtzeit macht. VACOped ist ein Gehstiefel für tagsüber. Viele Patienten verwenden beides - VACOped tagsüber und die Thetis-Schiene für bequemen Schlaf nachts.",
        },
        {
            question: "Was macht Thetis Medical-Produkte anders?",
            answer:
                "Thetis Medical-Produkte sind speziell für die Achillessehnenruptur-Erholung entwickelt, nicht für generische Fußverletzungen. Unsere Nachtschiene ist die einzige, die für diesen Zweck patentiert ist, mit Chirurgen-Empfehlungen und über 3.000 sicher behandelten Patienten.",
        },
        {
            question: "Brauche ich außer der Schiene noch etwas anderes?",
            answer:
                "Die Nachtschiene ist das Kernprodukt für sichere nächtliche Erholung. Weitere hilfreiche Artikel sind ein EVENup-Schuhhöhenausgleich zur Vermeidung von Rückenschmerzen, Erhöhungskeile zur Reduzierung von Schwellungen und wasserdichte Abdeckungen für die Hygiene.",
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
            question: "L'attelle Thetis est-elle meilleure que VACOped?",
            answer:
                "L'attelle de nuit Thetis est spécifiquement conçue pour le confort nocturne et le sommeil, ce qui la rend idéale pour une utilisation nocturne. VACOped est une botte de marche pour la journée. De nombreux patients utilisent les deux - VACOped pendant la journée et l'attelle Thetis pour un sommeil confortable la nuit.",
        },
        {
            question:
                "Qu'est-ce qui rend les produits Thetis Medical différents?",
            answer:
                "Les produits Thetis Medical sont conçus spécifiquement pour la récupération de la rupture d'Achille, pas pour les blessures génériques du pied. Notre attelle de nuit est la seule brevetée à cette fin, avec des recommandations de chirurgiens et plus de 3 000 patients traités en toute sécurité.",
        },
        {
            question: "Ai-je besoin d'autre chose que l'attelle?",
            answer:
                "L'attelle de nuit est le produit principal pour une récupération nocturne sûre. D'autres articles utiles incluent un niveleur de chaussure EVENup pour prévenir les maux de dos, des coussins d'élévation pour réduire l'enflure et des couvertures imperméables pour l'hygiène.",
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
            question: "¿Es la férula Thetis mejor que VACOped?",
            answer:
                "La férula nocturna Thetis está diseñada específicamente para el confort nocturno y el sueño, lo que la hace ideal para uso nocturno. VACOped es una bota de caminar para el día. Muchos pacientes usan ambos - VACOped durante el día y la férula Thetis para un sueño cómodo por la noche.",
        },
        {
            question: "¿Qué hace diferentes a los productos de Thetis Medical?",
            answer:
                "Los productos de Thetis Medical están diseñados específicamente para la recuperación de la rotura de Aquiles, no para lesiones genéricas del pie. Nuestra férula nocturna es la única patentada para este propósito, con endosos de cirujanos y más de 3,000 pacientes tratados de forma segura.",
        },
        {
            question: "¿Necesito algo más además de la férula?",
            answer:
                "La férula nocturna es el producto principal para una recuperación nocturna segura. Otros artículos útiles incluyen un nivelador de zapatos EVENup para prevenir el dolor de espalda, cuñas de elevación para reducir la hinchazón y cubiertas impermeables para la higiene.",
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
            question: "La stecca Thetis è meglio di VACOped?",
            answer:
                "La stecca notturna Thetis è progettata specificamente per il comfort notturno e il sonno, rendendola ideale per l'uso notturno. VACOped è uno stivale da passeggio per il giorno. Molti pazienti usano entrambi - VACOped durante il giorno e la stecca Thetis per un sonno confortevole di notte.",
        },
        {
            question: "Cosa rende diversi i prodotti Thetis Medical?",
            answer:
                "I prodotti Thetis Medical sono progettati specificamente per il recupero dalla rottura dell'Achille, non per lesioni generiche del piede. La nostra stecca notturna è l'unica brevettata per questo scopo, con raccomandazioni di chirurghi e oltre 3.000 pazienti trattati in sicurezza.",
        },
        {
            question: "Ho bisogno di qualcos'altro oltre alla stecca?",
            answer:
                "La stecca notturna è il prodotto principale per un recupero notturno sicuro. Altri articoli utili includono un livellatore di scarpe EVENup per prevenire il mal di schiena, cunei di elevazione per ridurre il gonfiore e coperture impermeabili per l'igiene.",
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
