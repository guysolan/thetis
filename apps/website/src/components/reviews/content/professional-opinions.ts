import JamesDavis from "./images/james-davis.png";
import RobbieRay from "./images/robbie-ray.png";
import IanGill from "./images/ian-gill.png";
import MattWelck from "./images/matt-welck.png";
import SohailYousaf from "./images/sohail-yousaf.png";
import AndyRoche from "./images/andy-roche.jpg";
import type { Lang, TranslatedReview } from "../types";
import HJE from "./images/clinics/hje.png";
import KingsCollege from "./images/clinics/kings.webp";
import RNOH from "./images/clinics/rnoh.webp";
import KingstonRichmond from "./images/clinics/kingston.png";
import NewVictoria from "./images/clinics/new-vic.jpeg";
import EpsomStHelier from "./images/clinics/epsom.png";
import Fortius from "./images/clinics/fortius.jpg";
import ChelseaWestminster from "./images/clinics/chelsea.png";
import type { HighlightedParagraphProps } from "../../HighlightedParagraph";
const professionalOpinionsContent: Record<Lang, {
    title: HighlightedParagraphProps;
    description: string;
    cta: { text: string; link: string };
    review: { seeWebsite: string; readMore: string; readLess: string };
}> = {
    en: {
        title: [
            { highlighted: false, text: "Hear what the " },
            { highlighted: true, text: "Professionals" },
            { highlighted: false, text: " Say" },
        ],
        description:
            "Our innovative solutions have earned the trust of healthcare professionals worldwide, from orthopedic surgeons to physiotherapists",
        cta: { text: "Still not convinced?", link: "Read more Reviews" },
        review: {
            seeWebsite: "See Website",
            readMore: "Read more",
            readLess: "Read less",
        },
    },
    de: {
        title: [
            { highlighted: false, text: "Hören Sie, was die " },
            { highlighted: true, text: "Profis" },
            { highlighted: false, text: " sagen" },
        ],
        description:
            "Unsere innovativen Lösungen haben das Vertrauen von medizinischem Fachpersonal weltweit gewonnen, von orthopädischen Chirurgen bis hin zu Physiotherapeuten",
        cta: {
            text: "Immer noch nicht überzeugt?",
            link: "Lesen Sie weitere Bewertungen",
        },
        review: {
            seeWebsite: "Website ansehen",
            readMore: "Mehr lesen",
            readLess: "Weniger lesen",
        },
    },
    fr: {
        title: [
            { highlighted: false, text: "Écoutez ce que les " },
            { highlighted: true, text: "Professionnels" },
            { highlighted: false, text: " en disent" },
        ],
        description:
            "Nos solutions innovantes ont gagné la confiance des professionnels de la santé du monde entier, des chirurgiens orthopédistes aux physiothérapeutes",
        cta: { text: "Toujours pas convaincu ?", link: "Lire plus d'avis" },
        review: {
            seeWebsite: "Voir le site web",
            readMore: "Lire la suite",
            readLess: "Lire moins",
        },
    },
    es: {
        title: [
            { highlighted: false, text: "Escuche lo que dicen los " },
            { highlighted: true, text: "Profesionales" },
            { highlighted: false, text: "" },
        ],
        description:
            "Nuestras soluciones innovadoras se han ganado la confianza de profesionales de la salud de todo el mundo, desde cirujanos ortopédicos hasta fisioterapeutas",
        cta: { text: "¿Aún no está convencido?", link: "Leer más reseñas" },
        review: {
            seeWebsite: "Ver sitio web",
            readMore: "Leer más",
            readLess: "Leer menos",
        },
    },
    it: {
        title: [
            { highlighted: false, text: "Ascolta cosa dicono i " },
            { highlighted: true, text: "Professionisti" },
            { highlighted: false, text: "" },
        ],
        description:
            "Le nostre soluzioni innovative hanno guadagnato la fiducia dei professionisti della salute in tutto il mondo, dai chirurghi ortopedici ai fisioterapisti",
        cta: { text: "Ancora non convinto?", link: "Leggi più recensioni" },
        review: {
            seeWebsite: "Vedi sito web",
            readMore: "Leggi di più",
            readLess: "Leggi meno",
        },
    },
};
export const translatedClinicians: TranslatedReview[] = [{
    name: "Mr James Davis",
    link: "https://www.londonfootandanklecentre.co.uk/staff/james-davis/",
    image: JamesDavis,
    country: "GB",
    clinics: ["London Foot and Ankle Centre"],
    clinicImages: [HJE.src],
    date: "2024-01-15",
    content: {
        en: {
            description:
                "Past President of the British Orthopaedic Foot and Ankle Society",
            title:
                "A fantastic alternative to uncomfortable hospital boots for night wear",
            short:
                "When I tore my own Achilles tendon, the hardest part was wearing the hospital boot in bed. This splint is certain to improve the recovery experience for patients.",
            body:
                "When I tore my own Achilles tendon, the hardest part of the recovery was having to wear the hospital boot in bed at night for many weeks. My only option was to make myself a splint using plaster-cast materials and make-shift straps. It is fantastic that Thetis Medical have produced this night-splint. It is certain to improve the recovery experience for patients.",
        },
        de: {
            description:
                "Ehemaliger Präsident der British Orthopaedic Foot and Ankle Society",
            title:
                "Eine fantastische Alternative zu unbequemen Krankenhausstiefeln für die Nacht",
            short:
                "Als ich mir meine eigene Achillessehne riss, war das Schwierigste, den Krankenhausstiefel im Bett zu tragen. Diese Schiene wird das Genesungserlebnis für Patienten mit Sicherheit verbessern.",
            body:
                "Als ich mir meine eigene Achillessehne riss, war der schwierigste Teil der Genesung, den Krankenhausstiefel wochenlang nachts im Bett tragen zu müssen. Meine einzige Möglichkeit war, mir selbst eine Schiene aus Gipsmaterialien und provisorischen Gurten zu bauen. Es ist fantastisch, dass Thetis Medical diese Nachtschiene hergestellt hat. Sie wird das Genesungserlebnis für Patienten mit Sicherheit verbessern.",
        },
        fr: {
            description:
                "Ancien président de la British Orthopaedic Foot and Ankle Society",
            title:
                "Une alternative fantastique aux bottes d'hôpital inconfortables pour la nuit",
            short:
                "Quand je me suis déchiré le tendon d'Achille, le plus difficile a été de porter la botte d'hôpital au lit. Cette attelle améliorera certainement l'expérience de récupération pour les patients.",
            body:
                "Quand je me suis déchiré le tendon d'Achille, la partie la plus difficile de la récupération a été de devoir porter la botte d'hôpital au lit la nuit pendant de nombreuses semaines. Ma seule option était de me fabriquer une attelle avec des matériaux de plâtre et des sangles de fortune. C'est fantastique que Thetis Medical ait produit cette attelle de nuit. Elle améliorera certainement l'expérience de récupération pour les patients.",
        },
        es: {
            description:
                "Ex presidente de la Sociedad Británica de Pie y Tobillo Ortopédico",
            title:
                "Una fantástica alternativa a las incómodas botas de hospital para usar de noche",
            short:
                "Cuando me rompí el tendón de Aquiles, la parte más difícil fue usar la bota del hospital en la cama. Esta férula seguramente mejorará la experiencia de recuperación de los pacientes.",
            body:
                "Cuando me rompí el tendón de Aquiles, la parte más difícil de la recuperación fue tener que usar la bota del hospital en la cama por la noche durante muchas semanas. Mi única opción fue hacerme una férula con materiales de yeso y correas improvisadas. Es fantástico que Thetis Medical haya producido esta férula nocturna. Seguramente mejorará la experiencia de recuperación de los pacientes.",
        },
        it: {
            description:
                "Ex Presidente della Società Britannica di Piede e Caviglia Ortopedica",
            title:
                "Una fantastica alternativa alle scomode botte ospedaliere per la notte",
            short:
                "Quando mi sono rotto il tendine di Achille, la parte più difficile era indossare la bota dell'ospedale nel letto. Questa férula certamente migliorerà l'esperienza di recupero dei pazienti.",
            body:
                "Quando mi sono rotto il tendine di Achille, la parte più difficile del recupero era dover indossare la bota dell'ospedale nel letto per la notte per molte settimane. La mia unica opzione era costruirmi una férula con materiali di gesso e cinghie improvvisate. È fantastico che Thetis Medical abbia prodotto questa férula notturna. Certamente migliorerà l'esperienza di recupero dei pazienti.",
        },
    },
}, {
    name: "Dr Robbie Ray",
    link: "https://www.drrobbieray.com/",
    image: RobbieRay,
    country: "GB",
    clinics: ["Kings College Hospital"],
    clinicImages: [KingsCollege.src],
    date: "2024-02-01",
    content: {
        en: {
            description: "Foot and Ankle Surgeon",
            title: "Setting a new standard in Achilles tendon rehabilitation",
            short:
                "A game-changer in my practice. The splint's design prioritizes both comfort and functionality, enabling controlled, progressive recovery.",
            body:
                "As a foot and ankle specialist, I am always on the lookout for innovative tools that can improve patient outcomes. The Thetis Medical Achilles Repair Splint has proven to be a game-changer in my practice. It is truly unique, being the only splint of its kind on the market, and I have used it with great success in the rehabilitation of my patients following Achilles tendon ruptures.\n\nThe splint's design prioritizes both comfort and functionality, enabling controlled, progressive recovery. My patients consistently report reduced discomfort and better sleep as they really appreciate the accelerated removal of immobilisation at night time. The adjustable features allow for a customized fit, which is essential for addressing the specific anatomical shape of each individual patients leg.\n\nI have found the Thetis splint particularly effective in bridging the gap between immobilization and active recovery. It provides the necessary support to allow early removal of immobilisation at night, helping to reduce complications of uncontrolled movement and accelerate healing. Its durability and ease of use also make it a practical choice for both patients and clinicians.\n\nI highly recommend the Thetis Medical Achilles Repair Splint to colleagues and patients alike. It has become an indispensable part of my treatment protocol, and I am confident it will continue to set a new standard in Achilles tendon rehabilitation.",
        },
        de: {
            description: "Fuß- und Sprunggelenkchirurg",
            title:
                "Ein neuer Standard in der Rehabilitation von Achillessehnen",
            short:
                "Ein Wendepunkt in meiner Praxis. Das Design der Schiene priorisiert sowohl Komfort als auch Funktionalität und ermöglicht eine kontrollierte, fortschreitende Genesung.",
            body:
                "Als Spezialist für Fuß- und Sprunggelenke bin ich immer auf der Suche nach innovativen Werkzeugen, die die Patientenergebnisse verbessern können. Die Thetis Medical Achilles Repair Splint hat sich in meiner Praxis als bahnbrechend erwiesen. Sie ist wirklich einzigartig, die einzige Schiene ihrer Art auf dem Markt, und ich habe sie mit großem Erfolg bei der Rehabilitation meiner Patienten nach Achillessehnenrissen eingesetzt.\n\nDas Design der Schiene priorisiert sowohl Komfort als auch Funktionalität und ermöglicht eine kontrollierte, fortschreitende Genesung. Meine Patienten berichten durchweg von weniger Beschwerden und besserem Schlaf, da sie die beschleunigte Entfernung der Immobilisierung in der Nacht sehr zu schätzen wissen. Die verstellbaren Merkmale ermöglichen eine individuelle Passform, die für die Anpassung an die spezifische anatomische Form des Beins jedes einzelnen Patienten unerlässlich ist.\n\nIch habe die Thetis-Schiene als besonders effektiv empfunden, um die Lücke zwischen Immobilisierung und aktiver Genesung zu schließen. Sie bietet die notwendige Unterstützung, um eine frühzeitige Entfernung der Immobilisierung in der Nacht zu ermöglichen, was dazu beiträgt, Komplikationen durch unkontrollierte Bewegungen zu reduzieren und die Heilung zu beschleunigen. Ihre Langlebigkeit und Benutzerfreundlichkeit machen sie auch zu einer praktischen Wahl für Patienten und Ärzte.\n\nIch empfehle die Thetis Medical Achilles Repair Splint Kollegen und Patienten gleichermaßen. Sie ist zu einem unverzichtbaren Bestandteil meines Behandlungsprotokolls geworden, und ich bin zuversichtlich, dass sie weiterhin einen neuen Standard in der Rehabilitation von Achillessehnen setzen wird.",
        },
        fr: {
            description: "Chirurgien du pied et de la cheville",
            title:
                "Établir une nouvelle norme en matière de rééducation du tendon d'Achille",
            short:
                "Un changement de donne dans ma pratique. La conception de l'attelle privilégie à la fois le confort et la fonctionnalité, permettant une récupération contrôlée et progressive.",
            body:
                "En tant que spécialiste du pied et de la cheville, je suis toujours à la recherche d'outils innovants susceptibles d'améliorer les résultats pour les patients. L'attelle de réparation d'Achille de Thetis Medical s'est avérée changer la donne dans ma pratique. Elle est vraiment unique, étant la seule attelle de ce type sur le marché, et je l'ai utilisée avec beaucoup de succès dans la rééducation de mes patients après des ruptures du tendon d'Achille.\n\nLa conception de l'attelle privilégie à la fois le confort et la fonctionnalité, permettant une récupération contrôlée et progressive. Mes patients signalent constamment une réduction de l'inconfort et un meilleur sommeil, car ils apprécient vraiment le retrait accéléré de l'immobilisation la nuit. Les caractéristiques réglables permettent un ajustement personnalisé, ce qui est essentiel pour s'adapter à la forme anatomique spécifique de la jambe de chaque patient.\n\nJ'ai trouvé l'attelle Thetis particulièrement efficace pour combler le fossé entre l'immobilisation et la récupération active. Elle fournit le soutien nécessaire pour permettre un retrait précoce de l'immobilisation la nuit, aidant à réduire les complications des mouvements incontrôlés et à accélérer la guérison. Sa durabilité et sa facilité d'utilisation en font également un choix pratique pour les patients et les cliniciens.\n\nJe recommande vivement l'attelle de réparation d'Achille de Thetis Medical à mes collègues et à mes patients. Elle est devenue un élément indispensable de mon protocole de traitement, et je suis convaincu qu'elle continuera à établir une nouvelle norme en matière de rééducation du tendon d'Achille.",
        },
        es: {
            description: "Cirujano de pie y tobillo",
            title:
                "Estableciendo un nuevo estándar en la rehabilitación del tendón de Aquiles",
            short:
                "Un cambio de juego en mi práctica. El diseño de la férula prioriza tanto la comodidad como la funcionalidad, permitiendo una recuperación controlada y progresiva.",
            body:
                "Como especialista en pie y tobillo, siempre estoy buscando herramientas innovadoras que puedan mejorar los resultados de los pacientes. La férula de reparación de Aquiles de Thetis Medical ha demostrado ser un cambio de juego en mi práctica. Es verdaderamente única, siendo la única férula de su tipo en el mercado, y la he utilizado con gran éxito en la rehabilitación de mis pacientes después de roturas del tendón de Aquiles.\n\nEl diseño de la férula prioriza tanto la comodidad como la funcionalidad, permitiendo una recuperación controlada y progresiva. Mis pacientes informan constantemente de una menor incomodidad y un mejor sueño, ya que aprecian mucho la eliminación acelerada de la inmovilización por la noche. Las características ajustables permiten un ajuste personalizado, que es esencial para abordar la forma anatómica específica de la pierna de cada paciente.\n\nHe encontrado que la férula Thetis es particularmente efectiva para cerrar la brecha entre la inmovilización y la recuperación activa. Proporciona el soporte necesario para permitir la eliminación temprana de la inmovilización por la noche, ayudando a reducir las complicaciones de los movimientos incontrolados y acelerar la curación. Su durabilidad y facilidad de uso también la convierten en una opción práctica tanto para pacientes como para médicos.\n\nRecomiendo encarecidamente la férula de reparación de Aquiles de Thetis Medical a colegas y pacientes por igual. Se ha convertido en una parte indispensable de mi protocolo de tratamiento, y estoy seguro de que seguirá estableciendo un nuevo estándar en la rehabilitación del tendón de Aquiles.",
        },
        it: {
            description: "Chirurgien du pied et de la cheville",
            title:
                "Ottimo strumento per migliorare la riabilitazione e il comfort",
            short:
                "Leggero e efficace, offre alleviamento durante il sonno e protegge il piede fuori dalla botta.",
            body:
                "La férula nocturna Thetis è un ottimo strumento per migliorare la riabilitazione e il comfort del paziente. I miei pazienti hanno avuto un'esperienza molto positiva. Leggero e efficace, offre alleviamento durante il sonno e protegge il piede fuori dalla botta. Molto raccomandato per migliorare la compliance e i risultati della riabilitazione.",
        },
    },
}, {
    name: "Professor Matthew Welck",
    link: "https://matthewwelck.com/",
    image: MattWelck,
    country: "GB",
    clinics: ["Royal National Orthopaedic Hospital"],
    clinicImages: [RNOH.src],
    date: "2024-01-20",
    content: {
        en: {
            description: "Foot and Ankle Surgeon",
            title: "An excellent piece of equipment",
            short:
                "Patients sometimes find sleeping in a boot uncomfortable, and having an alternative, more lightweight option is well received.",
            body:
                "I have been recommending the Achilles rupture splint to my patients for over a year. The feedback has been excellent. Patients sometimes find sleeping in a boot uncomfortable, and having an alternative, more lightweight option is well received. My patients have also used it to protect the foot and enable some time outside of the boot. I think it is an excellent piece of equipment that can make recovery from a difficult condition more user-friendly.",
        },
        de: {
            description: "Fuß- und Sprunggelenkchirurg",
            title: "Ein ausgezeichnetes Gerät",
            short:
                "Patienten finden das Schlafen in einem Stiefel manchmal unbequem, und eine alternative, leichtere Option wird gut angenommen.",
            body:
                "Ich empfehle die Achillessehnenruptur-Schiene meinen Patienten seit über einem Jahr. Das Feedback war ausgezeichnet. Patienten finden das Schlafen in einem Stiefel manchmal unbequem, und eine alternative, leichtere Option wird gut angenommen. Meine Patienten haben sie auch verwendet, um den Fuß zu schützen und etwas Zeit außerhalb des Stiefels zu ermöglichen. Ich denke, es ist ein ausgezeichnetes Gerät, das die Genesung von einer schwierigen Erkrankung benutzerfreundlicher machen kann.",
        },
        fr: {
            description: "Chirurgien du pied et de la cheville",
            title: "Un excellent équipement",
            short:
                "Les patients trouvent parfois inconfortable de dormir dans une botte, et avoir une option alternative plus légère est bien accueilli.",
            body:
                "Je recommande l'attelle pour rupture d'Achille à mes patients depuis plus d'un an. Les retours ont été excellents. Les patients trouvent parfois inconfortable de dormir dans une botte, et avoir une option alternative plus légère est bien accueilli. Mes patients l'ont également utilisée pour protéger le pied et permettre de passer du temps en dehors de la botte. Je pense que c'est un excellent équipement qui peut rendre la récupération d'une condition difficile plus conviviale.",
        },
        es: {
            description: "Cirujano de pie y tobillo",
            title: "Una excelente pieza de equipo",
            short:
                "A los pacientes a veces les resulta incómodo dormir con una bota, y tener una opción alternativa más ligera es bien recibida.",
            body:
                "He estado recomendando la férula para la ruptura de Aquiles a mis pacientes durante más de un año. La retroalimentación ha sido excelente. A los pacientes a veces les resulta incómodo dormir con una bota, y tener una opción alternativa más ligera es bien recibida. Mis pacientes también la han utilizado para proteger el pie y permitir pasar algún tiempo fuera de la bota. Creo que es una excelente pieza de equipo que puede hacer que la recuperación de una condición difícil sea más fácil de usar.",
        },
        it: {
            description: "Chirurgo del piede e della caviglia",
            title: "Un eccellente pezzo di equipaggiamento",
            short:
                "I pazienti a volte trovano scomodo dormire con una bota, e avere un'opzione alternativa più leggera è ben accolta.",
            body:
                "Raccomando la férula per la rottura di Achille ai miei pazienti da oltre un anno. Il feedback è stato eccellente. I pazienti a volte trovano scomodo dormire con una bota, e avere un'opzione alternativa più leggera è ben accolta. I miei pazienti l'hanno anche utilizzata per proteggere il piede e permettere di passare del tempo fuori dalla bota. Penso che sia un eccellente pezzo di equipaggiamento che può rendere la ripresa da una condizione difficile più user-friendly.",
        },
    },
}, {
    name: "Mr Ian Gill",
    link: "https://www.footsurgerykingston.com/",
    image: IanGill,
    country: "GB",
    clinics: ["Kingston and Richmond Hospital", "New Victoria Hospital"],
    clinicImages: [KingstonRichmond.src, NewVictoria.src],
    date: "2024-01-10",
    content: {
        en: {
            description: "Foot and Ankle Surgeon",
            title: "Get a good night's sleep!",
            short:
                "Worth every penny as it stops the misery of trying to get good nights sleep in an uncomfortable boot!",
            body:
                "I've been recommending the Thetis night time splint for all my ruptured Achilles patients for two years now. It is worth every penny as it stops the misery of trying to get good nights sleep in an uncomfortable boot !",
        },
        de: {
            description: "Fuß- und Sprunggelenkchirurg",
            title: "Schlafen Sie gut!",
            short:
                "Jeden Cent wert, da es das Elend beendet, in einem unbequemen Stiefel eine gute Nachtruhe zu finden!",
            body:
                "Ich empfehle die Thetis-Nachtschiene seit zwei Jahren allen meinen Patienten mit Achillessehnenriss. Sie ist jeden Cent wert, da sie das Elend beendet, in einem unbequemen Stiefel eine gute Nachtruhe zu finden!",
        },
        fr: {
            description: "Chirurgien du pied et de la cheville",
            title: "Passez une bonne nuit de sommeil !",
            short:
                "Vaut chaque centime car cela met fin à la misère d'essayer de passer une bonne nuit de sommeil dans une botte inconfortable !",
            body:
                "Je recommande l'attelle de nuit Thetis à tous mes patients ayant une rupture d'Achille depuis deux ans maintenant. Elle vaut chaque centime car elle met fin à la misère d'essayer de passer une bonne nuit de sommeil dans une botte inconfortable !",
        },
        es: {
            description: "Cirujano de pie y tobillo",
            title: "¡Duerma bien por la noche!",
            short:
                "¡Vale cada centavo ya que detiene la miseria de tratar de dormir bien por la noche con una bota incómoda!",
            body:
                "He estado recomendando la férula nocturna Thetis a todos mis pacientes con ruptura de Aquiles desde hace dos años. ¡Vale cada centavo ya que detiene la miseria de tratar de dormir bien por la noche con una bota incómoda!",
        },
        it: {
            description: "Chirurgo del piede e della caviglia",
            title: "Dormi bene la notte!",
            short:
                "Vale ogni centesimo perché ferma la miseria di cercare di dormire bene la notte con una bota scomoda!",
            body:
                "Raccomando la férula notturna Thetis a tutti i miei pazienti con rottura di Achille da due anni ormai. Vale ogni centesimo perché ferma la miseria di cercare di dormire bene la notte con una bota scomoda!",
        },
    },
}, {
    name: "Mr Sohail Yousaf",
    link: "https://www.sohailyousaf.com/",
    image: SohailYousaf,
    country: "GB",
    clinics: ["Epsom and St Helier Hospitals"],
    clinicImages: [EpsomStHelier.src],
    date: "2024-01-25",
    content: {
        en: {
            description: "Foot and Ankle Surgeon",
            title: "Excellent tool for enhancing recovery and comfort",
            short:
                "Lightweight and effective, it provides relief during sleep and protects the foot outside the boot.",
            body:
                "Thetis night-time splint are excellent tools for enhancing recovery and patient comfort. My patients have had a very positive experience. Lightweight and effective, it provide relief during sleep and protect the foot outside the boot. Highly recommended to improve compliance and recovery outcomes.",
        },
        de: {
            description: "Fuß- und Sprunggelenkchirurg",
            title:
                "Ausgezeichnetes Werkzeug zur Verbesserung der Genesung und des Komforts",
            short:
                "Leicht und effektiv, bietet es Linderung im Schlaf und schützt den Fuß außerhalb des Stiefels.",
            body:
                "Die Thetis-Nachtschiene ist ein ausgezeichnetes Werkzeug zur Verbesserung der Genesung und des Patientenkomforts. Meine Patienten haben sehr positive Erfahrungen gemacht. Leicht und effektiv, bietet sie Linderung im Schlaf und schützt den Fuß außerhalb des Stiefels. Sehr zu empfehlen, um die Compliance und die Genesungsergebnisse zu verbessern.",
        },
        fr: {
            description: "Chirurgien du pied et de la cheville",
            title:
                "Excellent outil pour améliorer la récupération et le confort",
            short:
                "Léger et efficace, il soulage pendant le sommeil et protège le pied en dehors de la botte.",
            body:
                "L'attelle de nuit Thetis est un excellent outil pour améliorer la récupération et le confort du patient. Mes patients ont eu une expérience très positive. Léger et efficace, il soulage pendant le sommeil et protège le pied en dehors de la botte. Fortement recommandé pour améliorer l'observance et les résultats de la récupération.",
        },
        es: {
            description: "Cirujano de pie y tobillo",
            title:
                "Excelente herramienta para mejorar la recuperación y la comodidad",
            short:
                "Ligero y eficaz, proporciona alivio durante el sueño y protege el pie fuera de la bota.",
            body:
                "La férula nocturna Thetis es una excelente herramienta para mejorar la recuperación y la comodidad del paciente. Mis pacientes han tenido una experiencia muy positiva. Ligero y eficaz, proporciona alivio durante el sueño y protege el pie fuera de la bota. Muy recomendable para mejorar el cumplimiento y los resultados de la recuperación.",
        },
        it: {
            description: "Chirurgien du pied et de la cheville",
            title:
                "Ottimo strumento per migliorare la riabilitazione e il comfort",
            short:
                "Leggero e efficace, offre alleviamento durante il sonno e protegge il piede fuori dalla botta.",
            body:
                "La férula nocturna Thetis è un ottimo strumento per migliorare la riabilitazione e il comfort del paziente. I miei pazienti hanno avuto un'esperienza molto positiva. Leggero e efficace, offre alleviamento durante il sonno e protegge il piede fuori dalla botta. Molto raccomandato per migliorare la compliance e i risultati della riabilitazione.",
        },
    },
}, {
    name: "Mr Andy Roche",
    link: "https://www.londonorthopaedicsurgery.co.uk/mr-andy-roche/",
    image: AndyRoche,
    country: "GB",
    clinics: ["Fortius Clinic", "Chelsea and Westminster Hospital"],
    clinicImages: [Fortius.src, ChelseaWestminster.src],
    date: "2024-02-05",
    content: {
        en: {
            description: "Foot and Ankle Surgeon",
            title: "Comfort and usability all round.",
            short:
                "Makes complete sense to use something like this and I highly recommend this product. Comfort and usability all round.",
            body:
                "I came across this device, not too long ago and feel it has really helped my patients recover from Achilles tendon ruptures. Makes complete sense to use something like this and I highly recommend this product. Comfort and usability all round.",
        },
        de: {
            description: "Fuß- und Sprunggelenkchirurg",
            title: "Rundum Komfort und Benutzerfreundlichkeit.",
            short:
                "Es macht absolut Sinn, so etwas zu verwenden, und ich kann dieses Produkt nur wärmstens empfehlen. Rundum Komfort und Benutzerfreundlichkeit.",
            body:
                "Ich bin vor nicht allzu langer Zeit auf dieses Gerät gestoßen und habe das Gefühl, dass es meinen Patienten wirklich geholfen hat, sich von Achillessehnenrissen zu erholen. Es macht absolut Sinn, so etwas zu verwenden, und ich kann dieses Produkt nur wärmstens empfehlen. Rundum Komfort und Benutzerfreundlichkeit.",
        },
        fr: {
            description: "Chirurgien du pied et de la cheville",
            title: "Confort et facilité d'utilisation.",
            short:
                "Il est tout à fait logique d'utiliser quelque chose comme ça et je recommande vivement ce produit. Confort et facilité d'utilisation.",
            body:
                "J'ai découvert cet appareil il n'y a pas si longtemps et j'ai l'impression qu'il a vraiment aidé mes patients à se remettre de ruptures du tendon d'Achille. Il est tout à fait logique d'utiliser quelque chose comme ça et je recommande vivement ce produit. Confort et facilité d'utilisation.",
        },
        es: {
            description: "Cirujano de pie y tobillo",
            title: "Comodidad y facilidad de uso en todos los sentidos.",
            short:
                "Tiene mucho sentido usar algo como esto y recomiendo encarecidamente este producto. Comodidad y facilidad de uso en todos los sentidos.",
            body:
                "Me encontré con este dispositivo no hace mucho tiempo y siento que realmente ha ayudado a mis pacientes a recuperarse de las roturas del tendón de Aquiles. Tiene mucho sentido usar algo como esto y recomiendo encarecidamente este producto. Comodidad y facilidad de uso en todos los sentidos.",
        },
        it: {
            description: "Chirurgo del piede e della caviglia",
            title: "Comfort e usabilità a tutto tondo.",
            short:
                "Ha perfettamente senso usare qualcosa del genere e raccomando vivamente questo prodotto. Comfort e usabilità a tutto tondo.",
            body:
                "Mi sono imbattuto in questo dispositivo non molto tempo fa e sento che ha davvero aiutato i miei pazienti a riprendersi dalle rotture del tendine di Achille. Ha perfettamente senso usare qualcosa del genere e raccomando vivamente questo prodotto. Comfort e usabilità a tutto tondo.",
        },
    },
}];
export default professionalOpinionsContent;
