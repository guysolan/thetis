import FAQSection from "@/components/FAQSection";
import type { Lang } from "@/config/languages";

interface Props {
    lang?: Lang;
}

const faqContent: Record<Lang, { question: string; answer: string }[]> = {
    en: [
        {
            question: "Can I swim with a torn Achilles?",
            answer:
                "Yes, you can swim safely during Achilles rupture recovery with the Thetis waterproof splint. It maintains proper foot position in the pool while allowing you to benefit from low-impact aquatic exercise. Always consult your healthcare provider first.",
        },
        {
            question: "Is swimming good for Achilles rupture recovery?",
            answer:
                "Swimming and water-based exercises can be excellent for Achilles rupture recovery as they provide low-impact movement and help maintain overall fitness. The buoyancy of water reduces stress on your healing tendon while allowing gentle exercise.",
        },
        {
            question: "When can I start swimming after Achilles rupture?",
            answer:
                "The timing depends on your individual recovery and your doctor's advice. The Thetis waterproof splint allows you to safely enter the water when your healthcare team approves aquatic activities. Always follow your physician's specific guidance.",
        },
        {
            question: "Will the splint protect my Achilles in the pool?",
            answer:
                "Yes, the Thetis splint maintains your foot in the protective plantarflexion position even in water. It's fully waterproof and designed to keep your healing Achilles safe during aquatic activities and water therapy.",
        },
        {
            question: "Can I do water therapy with this splint?",
            answer:
                "Yes, the waterproof design makes it ideal for aquatic therapy sessions. Many physical therapists recommend water-based exercises for Achilles recovery, and our splint provides the support you need in the pool.",
        },
    ],
    de: [
        {
            question: "Kann ich mit einer gerissenen Achillessehne schwimmen?",
            answer:
                "Ja, Sie können während der Achillessehnenruptur-Erholung sicher schwimmen mit der wasserdichten Thetis-Schiene. Sie hält die richtige Fußposition im Pool bei und ermöglicht gleichzeitig schonende Wasserübungen. Konsultieren Sie immer zuerst Ihren Arzt.",
        },
        {
            question:
                "Ist Schwimmen gut für die Achillessehnenruptur-Erholung?",
            answer:
                "Schwimmen und wasserbasierte Übungen können ausgezeichnet für die Achillessehnenruptur-Erholung sein, da sie schonende Bewegung bieten und helfen, die allgemeine Fitness zu erhalten. Der Auftrieb des Wassers reduziert den Stress auf Ihre heilende Sehne.",
        },
        {
            question:
                "Wann kann ich nach einer Achillessehnenruptur mit dem Schwimmen beginnen?",
            answer:
                "Der Zeitpunkt hängt von Ihrer individuellen Genesung und dem Rat Ihres Arztes ab. Die wasserdichte Thetis-Schiene ermöglicht es Ihnen, sicher ins Wasser zu gehen, wenn Ihr Gesundheitsteam Wasseraktivitäten genehmigt.",
        },
        {
            question: "Wird die Schiene meine Achillessehne im Pool schützen?",
            answer:
                "Ja, die Thetis-Schiene hält Ihren Fuß auch im Wasser in der schützenden Plantarflexion. Sie ist vollständig wasserdicht und so konzipiert, dass sie Ihre heilende Achillessehne während Wasseraktivitäten schützt.",
        },
        {
            question: "Kann ich mit dieser Schiene Wassertherapie machen?",
            answer:
                "Ja, das wasserdichte Design macht sie ideal für Wassertherapie-Sitzungen. Viele Physiotherapeuten empfehlen wasserbasierte Übungen für die Achillessehnen-Erholung, und unsere Schiene bietet die Unterstützung, die Sie im Pool benötigen.",
        },
    ],
    fr: [
        {
            question: "Puis-je nager avec un tendon d'Achille déchiré?",
            answer:
                "Oui, vous pouvez nager en toute sécurité pendant la récupération de la rupture d'Achille avec l'attelle imperméable Thetis. Elle maintient la bonne position du pied dans la piscine tout en vous permettant de bénéficier d'exercices aquatiques à faible impact. Consultez toujours votre médecin d'abord.",
        },
        {
            question:
                "La natation est-elle bonne pour la récupération de la rupture d'Achille?",
            answer:
                "La natation et les exercices aquatiques peuvent être excellents pour la récupération de la rupture d'Achille car ils offrent un mouvement à faible impact et aident à maintenir la condition physique générale. La flottabilité de l'eau réduit le stress sur votre tendon en guérison.",
        },
        {
            question:
                "Quand puis-je commencer à nager après une rupture d'Achille?",
            answer:
                "Le moment dépend de votre récupération individuelle et des conseils de votre médecin. L'attelle imperméable Thetis vous permet d'entrer dans l'eau en toute sécurité lorsque votre équipe soignante approuve les activités aquatiques.",
        },
        {
            question: "L'attelle protégera-t-elle mon Achille dans la piscine?",
            answer:
                "Oui, l'attelle Thetis maintient votre pied dans la position protectrice de flexion plantaire même dans l'eau. Elle est entièrement imperméable et conçue pour garder votre Achille en guérison en sécurité pendant les activités aquatiques.",
        },
        {
            question:
                "Puis-je faire de la thérapie aquatique avec cette attelle?",
            answer:
                "Oui, la conception imperméable la rend idéale pour les séances de thérapie aquatique. De nombreux physiothérapeutes recommandent les exercices aquatiques pour la récupération d'Achille, et notre attelle fournit le soutien dont vous avez besoin dans la piscine.",
        },
    ],
    es: [
        {
            question: "¿Puedo nadar con un tendón de Aquiles desgarrado?",
            answer:
                "Sí, puede nadar de forma segura durante la recuperación de la rotura de Aquiles con la férula impermeable Thetis. Mantiene la posición adecuada del pie en la piscina mientras le permite beneficiarse de ejercicio acuático de bajo impacto. Siempre consulte primero con su médico.",
        },
        {
            question:
                "¿Es buena la natación para la recuperación de la rotura de Aquiles?",
            answer:
                "La natación y los ejercicios acuáticos pueden ser excelentes para la recuperación de la rotura de Aquiles ya que proporcionan movimiento de bajo impacto y ayudan a mantener la condición física general. La flotabilidad del agua reduce el estrés en su tendón en curación.",
        },
        {
            question:
                "¿Cuándo puedo empezar a nadar después de una rotura de Aquiles?",
            answer:
                "El momento depende de su recuperación individual y el consejo de su médico. La férula impermeable Thetis le permite entrar al agua de forma segura cuando su equipo médico apruebe las actividades acuáticas.",
        },
        {
            question: "¿La férula protegerá mi Aquiles en la piscina?",
            answer:
                "Sí, la férula Thetis mantiene su pie en la posición protectora de flexión plantar incluso en el agua. Es completamente impermeable y diseñada para mantener su Aquiles en curación seguro durante las actividades acuáticas.",
        },
        {
            question: "¿Puedo hacer terapia acuática con esta férula?",
            answer:
                "Sí, el diseño impermeable la hace ideal para sesiones de terapia acuática. Muchos fisioterapeutas recomiendan ejercicios acuáticos para la recuperación de Aquiles, y nuestra férula proporciona el soporte que necesita en la piscina.",
        },
    ],
    it: [
        {
            question: "Posso nuotare con un tendine d'Achille lacerato?",
            answer:
                "Sì, puoi nuotare in sicurezza durante il recupero dalla rottura dell'Achille con la stecca impermeabile Thetis. Mantiene la posizione corretta del piede in piscina permettendoti di beneficiare di esercizi acquatici a basso impatto. Consulta sempre prima il tuo medico.",
        },
        {
            question:
                "Il nuoto è buono per il recupero dalla rottura dell'Achille?",
            answer:
                "Il nuoto e gli esercizi acquatici possono essere eccellenti per il recupero dalla rottura dell'Achille poiché forniscono movimento a basso impatto e aiutano a mantenere la forma fisica generale. La galleggiabilità dell'acqua riduce lo stress sul tendine in guarigione.",
        },
        {
            question:
                "Quando posso iniziare a nuotare dopo una rottura dell'Achille?",
            answer:
                "Il momento dipende dal tuo recupero individuale e dal consiglio del tuo medico. La stecca impermeabile Thetis ti permette di entrare in acqua in sicurezza quando il tuo team sanitario approva le attività acquatiche.",
        },
        {
            question: "La stecca proteggerà il mio Achille in piscina?",
            answer:
                "Sì, la stecca Thetis mantiene il piede nella posizione protettiva di flessione plantare anche in acqua. È completamente impermeabile e progettata per mantenere il tuo Achille in guarigione al sicuro durante le attività acquatiche.",
        },
        {
            question: "Posso fare terapia acquatica con questa stecca?",
            answer:
                "Sì, il design impermeabile la rende ideale per le sessioni di terapia acquatica. Molti fisioterapisti raccomandano esercizi acquatici per il recupero dell'Achille, e la nostra stecca fornisce il supporto di cui hai bisogno in piscina.",
        },
    ],
};

const titles: Record<Lang, string> = {
    en: "Frequently Asked Questions About Swimming",
    de: "Häufig gestellte Fragen zum Schwimmen",
    fr: "Questions Fréquemment Posées sur la Natation",
    es: "Preguntas Frecuentes sobre Natación",
    it: "Domande Frequenti sul Nuoto",
};

export default function SwimmingFAQs({ lang = "en" }: Props) {
    const questions = faqContent[lang] || faqContent.en;
    const title = titles[lang] || titles.en;

    return <FAQSection lang={lang} title={title} faqs={questions} />;
}
