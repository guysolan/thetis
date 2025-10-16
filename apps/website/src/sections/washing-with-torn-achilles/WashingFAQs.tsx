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
            question: "Can I shower with an Achilles rupture?",
            answer:
                "Yes, with the Thetis waterproof splint you can safely shower while protecting your healing Achilles tendon. It provides actual Achilles support while letting you wash your foot - unlike waterproof covers which only keep your boot dry while your foot stays trapped and dirty inside.",
        },
        {
            question: "Can I actually clean my foot with the splint?",
            answer:
                "Yes! That's the key difference. The Thetis splint lets your foot get wet so you can actually wash and clean it properly. Waterproof boot covers only protect the boot - your foot stays trapped inside, dirty and smelly.",
        },
        {
            question: "How do I wash with a torn Achilles?",
            answer:
                "Use the Thetis waterproof night splint which allows you to shower or bathe safely. Remove your heavy boot, wear the lightweight waterproof splint, and wash with confidence knowing your Achilles is properly supported while you clean your foot.",
        },
        {
            question: "Is the splint completely waterproof?",
            answer:
                "Yes, the Thetis splint is designed with waterproof materials that allow you to safely shower, bathe, or even swim. It provides both protection and support during water activities.",
        },
        {
            question: "Can I use this in the shower every day?",
            answer:
                "Yes, the splint is designed for regular use and can be worn daily in the shower. It lets you maintain proper hygiene and actually clean your foot - something waterproof boot covers can't do.",
        },
    ],
    de: [
        {
            question: "Kann ich mit einer Achillessehnenruptur duschen?",
            answer:
                "Ja, mit der wasserdichten Thetis-Schiene können Sie sicher duschen und gleichzeitig Ihre heilende Achillessehne schützen. Sie bietet tatsächliche Achillessehnen-Unterstützung, während Sie Ihren Fuß waschen können - im Gegensatz zu wasserdichten Abdeckungen, die nur Ihren Stiefel trocken halten, während Ihr Fuß schmutzig drinnen gefangen bleibt.",
        },
        {
            question:
                "Kann ich meinen Fuß mit der Schiene tatsächlich reinigen?",
            answer:
                "Ja! Das ist der entscheidende Unterschied. Die Thetis-Schiene lässt Ihren Fuß nass werden, damit Sie ihn tatsächlich richtig waschen und reinigen können. Wasserdichte Stiefelabdeckungen schützen nur den Stiefel - Ihr Fuß bleibt schmutzig und riecht drinnen gefangen.",
        },
        {
            question: "Wie wasche ich mich mit einer gerissenen Achillessehne?",
            answer:
                "Verwenden Sie die wasserdichte Thetis-Nachtschiene, mit der Sie sicher duschen oder baden können. Entfernen Sie Ihren schweren Stiefel, tragen Sie die leichte wasserdichte Schiene und waschen Sie sich mit dem Wissen, dass Ihre Achillessehne richtig gestützt wird, während Sie Ihren Fuß reinigen.",
        },
        {
            question: "Ist die Schiene vollständig wasserdicht?",
            answer:
                "Ja, die Thetis-Schiene ist mit wasserdichten Materialien konstruiert, die es Ihnen ermöglichen, sicher zu duschen, zu baden oder sogar zu schwimmen. Sie bietet sowohl Schutz als auch Unterstützung bei Wasseraktivitäten.",
        },
        {
            question: "Kann ich dies jeden Tag unter der Dusche verwenden?",
            answer:
                "Ja, die Schiene ist für den regelmäßigen Gebrauch konzipiert und kann täglich unter der Dusche getragen werden. Sie ermöglicht es Ihnen, die Hygiene aufrechtzuerhalten und Ihren Fuß tatsächlich zu reinigen - etwas, was wasserdichte Stiefelabdeckungen nicht können.",
        },
    ],
    fr: [
        {
            question:
                "Puis-je me doucher avec une rupture du tendon d'Achille?",
            answer:
                "Oui, avec l'attelle imperméable Thetis, vous pouvez vous doucher en toute sécurité tout en protégeant votre tendon d'Achille en guérison. Elle fournit un véritable soutien d'Achille tout en vous permettant de laver votre pied - contrairement aux couvres imperméables qui ne gardent que votre botte au sec tandis que votre pied reste piégé et sale à l'intérieur.",
        },
        {
            question: "Puis-je vraiment nettoyer mon pied avec l'attelle?",
            answer:
                "Oui! C'est la différence clé. L'attelle Thetis laisse votre pied se mouiller pour que vous puissiez le laver et le nettoyer correctement. Les couvres imperméables pour bottes ne protègent que la botte - votre pied reste piégé à l'intérieur, sale et malodorant.",
        },
        {
            question: "Comment me laver avec un tendon d'Achille déchiré?",
            answer:
                "Utilisez l'attelle de nuit imperméable Thetis qui vous permet de vous doucher ou de vous baigner en toute sécurité. Retirez votre botte lourde, portez l'attelle imperméable légère et lavez-vous en toute confiance en sachant que votre Achille est correctement soutenu pendant que vous nettoyez votre pied.",
        },
        {
            question: "L'attelle est-elle complètement imperméable?",
            answer:
                "Oui, l'attelle Thetis est conçue avec des matériaux imperméables qui vous permettent de vous doucher, de vous baigner ou même de nager en toute sécurité. Elle offre à la fois protection et soutien pendant les activités aquatiques.",
        },
        {
            question: "Puis-je utiliser ceci sous la douche tous les jours?",
            answer:
                "Oui, l'attelle est conçue pour une utilisation régulière et peut être portée quotidiennement sous la douche. Elle vous permet de maintenir une bonne hygiène et de nettoyer réellement votre pied - quelque chose que les couvres imperméables pour bottes ne peuvent pas faire.",
        },
    ],
    es: [
        {
            question: "¿Puedo ducharme con una rotura del tendón de Aquiles?",
            answer:
                "Sí, con la férula impermeable Thetis puede ducharse de forma segura mientras protege su tendón de Aquiles en curación. Proporciona soporte real de Aquiles mientras le permite lavar su pie - a diferencia de las cubiertas impermeables que solo mantienen su bota seca mientras su pie permanece atrapado y sucio adentro.",
        },
        {
            question: "¿Puedo realmente limpiar mi pie con la férula?",
            answer:
                "¡Sí! Esa es la diferencia clave. La férula Thetis permite que su pie se moje para que pueda lavarlo y limpiarlo correctamente. Las cubiertas impermeables para botas solo protegen la bota - su pie permanece atrapado adentro, sucio y maloliente.",
        },
        {
            question: "¿Cómo me lavo con un tendón de Aquiles desgarrado?",
            answer:
                "Use la férula nocturna impermeable Thetis que le permite ducharse o bañarse de forma segura. Quítese su bota pesada, use la férula impermeable ligera y lávese con confianza sabiendo que su Aquiles está correctamente apoyado mientras limpia su pie.",
        },
        {
            question: "¿Es la férula completamente impermeable?",
            answer:
                "Sí, la férula Thetis está diseñada con materiales impermeables que le permiten ducharse, bañarse o incluso nadar de forma segura. Proporciona protección y soporte durante las actividades acuáticas.",
        },
        {
            question: "¿Puedo usar esto en la ducha todos los días?",
            answer:
                "Sí, la férula está diseñada para uso regular y puede usarse diariamente en la ducha. Le permite mantener una higiene adecuada y limpiar realmente su pie - algo que las cubiertas impermeables para botas no pueden hacer.",
        },
    ],
    it: [
        {
            question:
                "Posso fare la doccia con una rottura del tendine d'Achille?",
            answer:
                "Sì, con la stecca impermeabile Thetis puoi fare la doccia in sicurezza proteggendo il tuo tendine d'Achille in guarigione. Fornisce un supporto reale dell'Achille permettendoti di lavare il piede - a differenza delle coperture impermeabili che mantengono solo asciutto lo stivale mentre il piede rimane intrappolato e sporco all'interno.",
        },
        {
            question: "Posso davvero pulire il mio piede con la stecca?",
            answer:
                "Sì! Questa è la differenza chiave. La stecca Thetis lascia che il piede si bagni così puoi lavarlo e pulirlo correttamente. Le coperture impermeabili per stivali proteggono solo lo stivale - il piede rimane intrappolato all'interno, sporco e puzzolente.",
        },
        {
            question: "Come mi lavo con un tendine d'Achille lacerato?",
            answer:
                "Usa la stecca notturna impermeabile Thetis che ti permette di fare la doccia o il bagno in sicurezza. Rimuovi il tuo stivale pesante, indossa la stecca impermeabile leggera e lavati con fiducia sapendo che il tuo Achille è correttamente supportato mentre pulisci il piede.",
        },
        {
            question: "La stecca è completamente impermeabile?",
            answer:
                "Sì, la stecca Thetis è progettata con materiali impermeabili che ti permettono di fare la doccia, il bagno o anche nuotare in sicurezza. Fornisce sia protezione che supporto durante le attività acquatiche.",
        },
        {
            question: "Posso usare questo nella doccia ogni giorno?",
            answer:
                "Sì, la stecca è progettata per uso regolare e può essere indossata quotidianamente nella doccia. Ti permette di mantenere una corretta igiene e pulire davvero il piede - qualcosa che le coperture impermeabili per stivali non possono fare.",
        },
    ],
};

const titles: Record<Lang, string> = {
    en: "Frequently Asked Questions About Washing",
    de: "Häufig gestellte Fragen zum Waschen",
    fr: "Questions Fréquemment Posées sur le Lavage",
    es: "Preguntas Frecuentes sobre el Lavado",
    it: "Domande Frequenti sul Lavaggio",
};

export default function WashingFAQs({ lang = "en" }: Props) {
    const questions = faqContent[lang] || faqContent.en;
    const title = titles[lang] || titles.en;

    return <FAQSection lang={lang} title={title} faqs={questions} />;
}
