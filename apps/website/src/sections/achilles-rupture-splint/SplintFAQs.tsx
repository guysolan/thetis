import React from "react";
import FAQs from "@/components/ui/faqs";
import type { FAQCategory } from "@/components/ui/faqs";
import SizeCalculator from "../../components/SizeCalculator";
import type { Lang } from "@/config/languages.ts";

const content: Record<Lang, FAQCategory[]> = {
    en: [
        {
            category: "Sizing & Fit",
            questions: [
                {
                    question: "How do I know what size to get?",
                    answer: <SizeCalculator lang="en" />,
                },
                {
                    question: "Is the sizing accurate?",
                    answer:
                        "Yes, the sizing is accurate. Sizing is based on foot size, designed to ensure that the splint does not interfere with the toes.",
                },
                {
                    question: "Can I adjust the angle of the splint?",
                    answer:
                        "No, the splint is purposefully designed not to be adjustable to stay lightweight. It maintains the max angle a hinged-boot or boot with wedges would offer. This provides safe healing for the whole recovery period. As it is used in addition to the boot, the obtuse angle will not lead to any tendon shortening or other adverse effects.",
                },
                {
                    question: "My foot can move sideways, is this a problem?",
                    answer:
                        "Some sideways movement is normal and won't affect healing. The splint's main purpose is to maintain the correct angle of your foot pointing downward (plantar flexion).",
                },
                {
                    question: "How tight should I fasten the straps?",
                    answer:
                        "Straps should be firm but comfortable - tight enough to secure your foot but not restrict circulation. Loosen immediately if you experience tingling, numbness, or color changes in your foot. While your foot shouldn't move upward, some minor side-to-side movement is expected.",
                },
            ],
        },
        {
            category: "Product Usage",
            questions: [
                {
                    question:
                        "Can I wear this instead of a boot during the day?",
                    answer:
                        "No, this splint is for resting and sleeping only. You must use crutches if standing or moving while wearing the splint - it is not designed for walking or weight-bearing.",
                },
                {
                    question: "Can you use the splint for Achilles tendonitis?",
                    answer:
                        "No, the splint is only used after rupture of the Achilles tendon. It is not suitable for broken bones, plantar fasciitis or Achilles tendonitis. The splint holds the foot pointed downwards, in a tip toe position, for tendon healing. For other conditions, like plantar fasciitis and Achilles tendonitis, there are different splints deliberately designed to do the opposite, and hold the foot up.",
                },
                {
                    question: "Can I get the splint wet (shower/swimming)?",
                    answer:
                        "The splint can tolerate occasional exposure to water, but it's not specifically designed for wet environments. Extended water exposure may cause deterioration of the soft parts over time. If showering, we recommend using a chair or stool to sit safely, as wet surfaces increase slip hazards. For swimming, the splint can be worn but should be thoroughly dried afterward. Obviously, don't wear the splint for too long when wet to avoid skin laceration. Remember that your safety is paramount - never attempt standing or walking while wearing the splint, especially on wet surfaces.",
                },
            ],
        },
        {
            category: "Medical Recovery",
            questions: [
                {
                    question:
                        "At what stage of recovery should I start using the splint?",
                    answer:
                        "The splint should be used during weeks 2-12 after injury, which is the primary healing phase of your Achilles tendon recovery.",
                },
                {
                    question:
                        "How does the splint maintain the correct healing position?",
                    answer:
                        "The splint holds your foot at a 30-degree angle, which is the optimal position for Achilles tendon healing. This matches the angle you would achieve with a hinged boot or wedges, ensuring proper recovery throughout the healing period.",
                },
                {
                    question: "Can I use this with a complete Achilles tear?",
                    answer: (
                        <>
                            Yes, it is designed for complete Achilles tears. For
                            more information go to{" "}
                            <a
                                className="text-primary underline underline-offset-2"
                                href="https://thetismedical.com/achilles-ruptures"
                            >
                                here
                            </a>
                            .
                        </>
                    ),
                },
                {
                    question:
                        "How does this compare to wearing a boot at night?",
                    answer:
                        "The splint is designed to complement your boot treatment, not replace it entirely. It offers several advantages for nighttime use: it's significantly lighter, more breathable, and more hygienic since it's specifically designed for indoor use. Think of it as wearing a specialized night brace rather than sleeping in outdoor footwear.",
                },
                {
                    question:
                        "Is some side-to-side movement in the splint normal?",
                    answer:
                        "Yes, a small amount of side-to-side movement is normal and will not harm your recovery or cause rerupture. The splint's main purpose is to maintain the correct angle of your foot (plantar flexion), which is essential for proper Achilles tendon healing. Some lateral movement is expected and safe. Most importantly, the splint prevents your foot from dorsiflexing (bending upward), which would place harmful stress on the healing tendon.",
                },
            ],
        },
        {
            category: "Ordering & Availability",
            questions: [
                {
                    question: "Do you ship internationally?",
                    answer: (
                        <>
                            We ship to the US and UK, for orders in other
                            countries please visit
                            <a
                                className="text-primary underline underline-offset-2"
                                href="https://thetismedical.com/partners"
                            >
                                {" "}
                                our partners page
                            </a>
                            .
                        </>
                    ),
                },
                {
                    question: "When will out-of-stock sizes be available?",
                    answer: (
                        <>
                            Our splint is popular so we are always restocking.
                            Contact{" "}
                            <a
                                className="text-primary underline underline-offset-2"
                                href="mailto:info@thetismedical.com"
                            >
                                info@thetismedical.com
                            </a>{" "}
                            for exact timings.
                        </>
                    ),
                },
            ],
        },
        {
            category: "Technical Specifications",
            questions: [
                {
                    question: "What angle does the splint maintain?",
                    answer:
                        "The splint maintains a fixed 30-degree angle, which matches the maximum angle provided by hinged boots or wedged boots. This specific angle is designed to optimize healing throughout your recovery period while keeping the device lightweight and user-friendly.",
                },
            ],
        },
    ],
    de: [
        {
            category: "Größe & Passform",
            questions: [
                {
                    question: "Woher weiß ich, welche Größe ich nehmen soll?",
                    answer: <SizeCalculator lang="de" />,
                },
                {
                    question: "Ist die Größenangabe korrekt?",
                    answer:
                        "Ja, die Größenangabe ist korrekt. Die Größe basiert auf der Fußgröße und ist so konzipiert, dass die Schiene die Zehen nicht beeinträchtigt.",
                },
                {
                    question: "Kann ich den Winkel der Schiene einstellen?",
                    answer:
                        "Nein, die Schiene ist absichtlich nicht verstellbar, um leicht zu bleiben. Sie behält den maximalen Winkel bei, den ein Gelenkstiefel oder ein Stiefel mit Keilen bieten würde. Dies gewährleistet eine sichere Heilung während der gesamten Genesungszeit. Da sie zusätzlich zum Stiefel verwendet wird, führt der stumpfe Winkel nicht zu einer Sehnenverkürzung oder anderen nachteiligen Effekten.",
                },
                {
                    question:
                        "Mein Fuß kann sich seitwärts bewegen, ist das ein Problem?",
                    answer:
                        "Eine gewisse seitliche Bewegung ist normal und beeinträchtigt die Heilung nicht. Der Hauptzweck der Schiene ist es, den korrekten Winkel Ihres nach unten gerichteten Fußes (Plantarflexion) beizubehalten.",
                },
                {
                    question: "Wie fest sollte ich die Riemen anziehen?",
                    answer:
                        "Die Riemen sollten fest, aber bequem sein - fest genug, um Ihren Fuß zu sichern, aber nicht die Durchblutung einzuschränken. Lockern Sie sie sofort, wenn Sie Kribbeln, Taubheit oder Farbveränderungen in Ihrem Fuß bemerken. Während sich Ihr Fuß nicht nach oben bewegen sollte, ist eine geringe seitliche Bewegung zu erwarten.",
                },
            ],
        },
        {
            category: "Produktverwendung",
            questions: [
                {
                    question:
                        "Kann ich diese anstelle eines Stiefels tagsüber tragen?",
                    answer:
                        "Nein, diese Schiene ist nur zum Ausruhen und Schlafen gedacht. Sie müssen Krücken verwenden, wenn Sie stehen oder sich bewegen, während Sie die Schiene tragen - sie ist nicht zum Gehen oder Tragen von Gewicht ausgelegt.",
                },
                {
                    question:
                        "Kann man die Schiene bei einer Achillessehnenentzündung verwenden?",
                    answer:
                        "Nein, die Schiene wird nur nach einem Riss der Achillessehne verwendet. Sie ist nicht für gebrochene Knochen, Plantarfasziitis oder Achillessehnenentzündung geeignet. Die Schiene hält den Fuß nach unten gerichtet, in einer Zehenspitzenposition, zur Sehnenheilung. Für andere Erkrankungen wie Plantarfasziitis und Achillessehnenentzündung gibt es verschiedene Schienen, die absichtlich das Gegenteil bewirken und den Fuß hochhalten.",
                },
                {
                    question:
                        "Kann ich die Schiene nass machen (Dusche/Schwimmen)?",
                    answer:
                        "Die Schiene verträgt gelegentlichen Kontakt mit Wasser, ist aber nicht speziell für nasse Umgebungen ausgelegt. Längerer Wasserkontakt kann im Laufe der Zeit zu einer Verschlechterung der weichen Teile führen. Beim Duschen empfehlen wir, einen Stuhl oder Hocker zu benutzen, um sicher zu sitzen, da nasse Oberflächen die Rutschgefahr erhöhen. Zum Schwimmen kann die Schiene getragen werden, sollte aber danach gründlich getrocknet werden. Tragen Sie die Schiene offensichtlich nicht zu lange im nassen Zustand, um Hautverletzungen zu vermeiden. Denken Sie daran, dass Ihre Sicherheit an erster Stelle steht - versuchen Sie niemals, mit der Schiene zu stehen oder zu gehen, insbesondere auf nassen Oberflächen.",
                },
            ],
        },
        {
            category: "Medizinische Genesung",
            questions: [
                {
                    question:
                        "In welchem Stadium der Genesung sollte ich mit der Verwendung der Schiene beginnen?",
                    answer:
                        "Die Schiene sollte in den Wochen 2-12 nach der Verletzung verwendet werden, was die primäre Heilungsphase Ihrer Achillessehnengenesung ist.",
                },
                {
                    question:
                        "Wie hält die Schiene die korrekte Heilungsposition aufrecht?",
                    answer:
                        "Die Schiene hält Ihren Fuß in einem 30-Grad-Winkel, was die optimale Position für die Heilung der Achillessehne ist. Dies entspricht dem Winkel, den Sie mit einem Gelenkstiefel oder Keilen erreichen würden, und gewährleistet eine ordnungsgemäße Genesung während der gesamten Heilungsperiode.",
                },
                {
                    question:
                        "Kann ich dies bei einem kompletten Achillessehnenriss verwenden?",
                    answer: (
                        <>
                            Ja, sie ist für komplette Achillessehnenrisse
                            ausgelegt. Für weitere Informationen gehen Sie zu
                            {" "}
                            <a
                                className="text-primary underline underline-offset-2"
                                href="https://thetismedical.com/achilles-ruptures"
                            >
                                hier
                            </a>
                            .
                        </>
                    ),
                },
                {
                    question:
                        "Wie ist das im Vergleich zum Tragen eines Stiefels in der Nacht?",
                    answer:
                        "Die Schiene soll Ihre Stiefelbehandlung ergänzen, nicht vollständig ersetzen. Sie bietet mehrere Vorteile für die nächtliche Anwendung: Sie ist deutlich leichter, atmungsaktiver und hygienischer, da sie speziell für den Innenbereich konzipiert ist. Stellen Sie es sich so vor, als würden Sie eine spezielle Nachtschiene tragen, anstatt in Straßenschuhen zu schlafen.",
                },
                {
                    question:
                        "Ist eine gewisse seitliche Bewegung in der Schiene normal?",
                    answer:
                        "Ja, eine geringe seitliche Bewegung ist normal und schadet Ihrer Genesung nicht oder verursacht einen erneuten Riss. Der Hauptzweck der Schiene ist es, den korrekten Winkel Ihres Fußes (Plantarflexion) beizubehalten, was für eine ordnungsgemäße Heilung der Achillessehne unerlässlich ist. Eine gewisse seitliche Bewegung ist zu erwarten und sicher. Am wichtigsten ist, dass die Schiene verhindert, dass Ihr Fuß sich nach oben beugt (Dorsalflexion), was schädlichen Stress auf die heilende Sehne ausüben würde.",
                },
            ],
        },
        {
            category: "Bestellung & Verfügbarkeit",
            questions: [
                {
                    question: "Versenden Sie international?",
                    answer: (
                        <>
                            Wir versenden in die USA und nach Großbritannien,
                            für Bestellungen in andere Länder besuchen Sie bitte
                            <a
                                className="text-primary underline underline-offset-2"
                                href="https://thetismedical.com/partners"
                            >
                                {" "}
                                unsere Partnerseite
                            </a>
                            .
                        </>
                    ),
                },
                {
                    question:
                        "Wann werden ausverkaufte Größen wieder verfügbar sein?",
                    answer: (
                        <>
                            Unsere Schiene ist beliebt, daher füllen wir unseren
                            Lagerbestand ständig auf. Kontaktieren Sie{" "}
                            <a
                                className="text-primary underline underline-offset-2"
                                href="mailto:info@thetismedical.com"
                            >
                                info@thetismedical.com
                            </a>{" "}
                            für genaue Zeitangaben.
                        </>
                    ),
                },
            ],
        },
        {
            category: "Technische Spezifikationen",
            questions: [
                {
                    question: "Welchen Winkel hält die Schiene aufrecht?",
                    answer:
                        "Die Schiene hält einen festen 30-Grad-Winkel aufrecht, der dem maximalen Winkel von Gelenkstiefeln oder Keilstiefeln entspricht. Dieser spezifische Winkel ist darauf ausgelegt, die Heilung während Ihrer Genesungszeit zu optimieren und das Gerät gleichzeitig leicht und benutzerfreundlich zu halten.",
                },
            ],
        },
    ],
    fr: [
        {
            category: "Taille & Ajustement",
            questions: [
                {
                    question: "Comment savoir quelle taille prendre ?",
                    answer: <SizeCalculator lang="fr" />,
                },
                {
                    question: "La taille est-elle précise ?",
                    answer:
                        "Oui, la taille est précise. La taille est basée sur la taille du pied, conçue pour garantir que l'attelle n'interfère pas avec les orteils.",
                },
                {
                    question: "Puis-je ajuster l'angle de l'attelle ?",
                    answer:
                        "Non, l'attelle est volontairement conçue pour ne pas être réglable afin de rester légère. Elle maintient l'angle maximal qu'une botte articulée ou une botte avec des cales offrirait. Cela garantit une guérison sûre pendant toute la période de récupération. Comme elle est utilisée en plus de la botte, l'angle obtus n'entraînera aucun raccourcissement du tendon ou d'autres effets indésirables.",
                },
                {
                    question:
                        "Mon pied peut bouger sur le côté, est-ce un problème ?",
                    answer:
                        "Un certain mouvement latéral est normal et n'affectera pas la guérison. Le but principal de l'attelle est de maintenir l'angle correct de votre pied pointant vers le bas (flexion plantaire).",
                },
                {
                    question: "À quel point dois-je serrer les sangles ?",
                    answer:
                        "Les sangles doivent être fermes mais confortables - suffisamment serrées pour maintenir votre pied mais pas pour restreindre la circulation. Desserrez immédiatement si vous ressentez des picotements, un engourdissement ou des changements de couleur dans votre pied. Bien que votre pied ne doive pas bouger vers le haut, un léger mouvement de va-et-vient est attendu.",
                },
            ],
        },
        {
            category: "Utilisation du produit",
            questions: [
                {
                    question:
                        "Puis-je porter cela à la place d'une botte pendant la journée ?",
                    answer:
                        "Non, cette attelle est uniquement pour le repos et le sommeil. Vous devez utiliser des béquilles si vous vous tenez debout ou vous déplacez en portant l'attelle - elle n'est pas conçue pour la marche ou la mise en charge.",
                },
                {
                    question:
                        "Peut-on utiliser l'attelle pour une tendinite d'Achille ?",
                    answer:
                        "Non, l'attelle n'est utilisée qu'après une rupture du tendon d'Achille. Elle ne convient pas aux os cassés, à la fasciite plantaire ou à la tendinite d'Achille. L'attelle maintient le pied pointé vers le bas, en position de pointe, pour la guérison du tendon. Pour d'autres conditions, comme la fasciite plantaire et la tendinite d'Achille, il existe différentes attelles délibérément conçues pour faire le contraire et maintenir le pied en l'air.",
                },
                {
                    question: "Puis-je mouiller l'attelle (douche/piscine) ?",
                    answer:
                        "L'attelle peut tolérer une exposition occasionnelle à l'eau, mais elle n'est pas spécifiquement conçue pour les environnements humides. Une exposition prolongée à l'eau peut entraîner une détérioration des parties souples avec le temps. Si vous prenez une douche, nous vous recommandons d'utiliser une chaise ou un tabouret pour vous asseoir en toute sécurité, car les surfaces mouillées augmentent les risques de glissade. Pour la natation, l'attelle peut être portée mais doit être soigneusement séchée par la suite. Évidemment, ne portez pas l'attelle trop longtemps lorsqu'elle est mouillée pour éviter les lacérations cutanées. N'oubliez pas que votre sécurité est primordiale - n'essayez jamais de vous tenir debout ou de marcher en portant l'attelle, en particulier sur des surfaces mouillées.",
                },
            ],
        },
        {
            category: "Récupération médicale",
            questions: [
                {
                    question:
                        "À quel stade de la récupération dois-je commencer à utiliser l'attelle ?",
                    answer:
                        "L'attelle doit être utilisée pendant les semaines 2 à 12 après la blessure, ce qui correspond à la phase de guérison primaire de votre récupération du tendon d'Achille.",
                },
                {
                    question:
                        "Comment l'attelle maintient-elle la position de guérison correcte ?",
                    answer:
                        "L'attelle maintient votre pied à un angle de 30 degrés, ce qui est la position optimale pour la guérison du tendon d'Achille. Cela correspond à l'angle que vous obtiendriez avec une botte articulée ou des cales, garantissant une récupération adéquate tout au long de la période de guérison.",
                },
                {
                    question:
                        "Puis-je l'utiliser avec une déchirure complète du tendon d'Achille ?",
                    answer: (
                        <>
                            Oui, elle est conçue pour les déchirures complètes
                            du tendon d'Achille. Pour plus d'informations, allez
                            {" "}
                            <a
                                className="text-primary underline underline-offset-2"
                                href="https://thetismedical.com/achilles-ruptures"
                            >
                                ici
                            </a>
                            .
                        </>
                    ),
                },
                {
                    question:
                        "Comment cela se compare-t-il au port d'une botte la nuit ?",
                    answer:
                        "L'attelle est conçue pour compléter votre traitement par botte, pas pour le remplacer entièrement. Elle offre plusieurs avantages pour une utilisation nocturne : elle est nettement plus légère, plus respirante et plus hygiénique car elle est spécialement conçue pour une utilisation en intérieur. Considérez-la comme le port d'une attelle de nuit spécialisée plutôt que de dormir avec des chaussures d'extérieur.",
                },
                {
                    question:
                        "Un certain mouvement de va-et-vient dans l'attelle est-il normal ?",
                    answer:
                        "Oui, une petite quantité de mouvement de va-et-vient est normale et ne nuira pas à votre récupération ni ne provoquera de nouvelle rupture. Le but principal de l'attelle est de maintenir l'angle correct de votre pied (flexion plantaire), ce qui est essentiel pour une bonne guérison du tendon d'Achille. Un certain mouvement latéral est attendu et sans danger. Plus important encore, l'attelle empêche votre pied de fléchir vers le haut (dorsiflexion), ce qui exercerait une contrainte néfaste sur le tendon en cours de guérison.",
                },
            ],
        },
        {
            category: "Commande & Disponibilité",
            questions: [
                {
                    question: "Expédiez-vous à l'international ?",
                    answer: (
                        <>
                            Nous expédions aux États-Unis et au Royaume-Uni,
                            pour les commandes dans d'autres pays, veuillez
                            visiter
                            <a
                                className="text-primary underline underline-offset-2"
                                href="https://thetismedical.com/partners"
                            >
                                {" "}
                                notre page partenaires
                            </a>
                            .
                        </>
                    ),
                },
                {
                    question:
                        "Quand les tailles en rupture de stock seront-elles disponibles ?",
                    answer: (
                        <>
                            Notre attelle est populaire, nous la
                            réapprovisionnons donc constamment. Contactez{" "}
                            <a
                                className="text-primary underline underline-offset-2"
                                href="mailto:info@thetismedical.com"
                            >
                                info@thetismedical.com
                            </a>{" "}
                            pour les délais exacts.
                        </>
                    ),
                },
            ],
        },
        {
            category: "Spécifications techniques",
            questions: [
                {
                    question: "Quel angle l'attelle maintient-elle ?",
                    answer:
                        "L'attelle maintient un angle fixe de 30 degrés, ce qui correspond à l'angle maximal fourni par les bottes articulées ou les bottes à cales. Cet angle spécifique est conçu pour optimiser la guérison tout au long de votre période de récupération tout en gardant l'appareil léger et convivial.",
                },
            ],
        },
    ],
    es: [
        {
            category: "Tallas y ajuste",
            questions: [
                {
                    question: "¿Cómo sé qué talla comprar?",
                    answer: <SizeCalculator lang="es" />,
                },
                {
                    question: "¿Es precisa la talla?",
                    answer:
                        "Sí, la talla es precisa. La talla se basa en el tamaño del pie, diseñada para garantizar que la férula no interfiera con los dedos.",
                },
                {
                    question: "¿Puedo ajustar el ángulo de la férula?",
                    answer:
                        "No, la férula está diseñada a propósito para no ser ajustable y así mantenerse ligera. Mantiene el ángulo máximo que ofrecería una bota con bisagras o una bota con cuñas. Esto proporciona una curación segura durante todo el período de recuperación. Como se usa además de la bota, el ángulo obtuso no provocará ningún acortamiento del tendón ni otros efectos adversos.",
                },
                {
                    question:
                        "Mi pie puede moverse hacia los lados, ¿es un problema?",
                    answer:
                        "Un poco de movimiento hacia los lados es normal y no afectará la curación. El propósito principal de la férula es mantener el ángulo correcto de su pie apuntando hacia abajo (flexión plantar).",
                },
                {
                    question: "¿Qué tan apretadas debo abrochar las correas?",
                    answer:
                        "Las correas deben estar firmes pero cómodas, lo suficientemente apretadas para asegurar su pie pero sin restringir la circulación. Aflójelas de inmediato si experimenta hormigueo, entumecimiento o cambios de color en su pie. Si bien su pie no debe moverse hacia arriba, se espera un pequeño movimiento de lado a lado.",
                },
            ],
        },
        {
            category: "Uso del producto",
            questions: [
                {
                    question:
                        "¿Puedo usar esto en lugar de una bota durante el día?",
                    answer:
                        "No, esta férula es solo para descansar y dormir. Debe usar muletas si está de pie o se mueve mientras usa la férula; no está diseñada para caminar o soportar peso.",
                },
                {
                    question:
                        "¿Se puede usar la férula para la tendinitis de Aquiles?",
                    answer:
                        "No, la férula solo se usa después de la ruptura del tendón de Aquiles. No es adecuada para huesos rotos, fascitis plantar o tendinitis de Aquiles. La férula mantiene el pie apuntando hacia abajo, en una posición de puntillas, para la curación del tendón. Para otras afecciones, como la fascitis plantar y la tendinitis de Aquiles, existen diferentes férulas diseñadas deliberadamente para hacer lo contrario y mantener el pie levantado.",
                },
                {
                    question: "¿Puedo mojar la férula (ducha/natación)?",
                    answer:
                        "La férula puede tolerar la exposición ocasional al agua, pero no está diseñada específicamente para ambientes húmedos. La exposición prolongada al agua puede causar el deterioro de las partes blandas con el tiempo. Si se ducha, recomendamos usar una silla o un taburete para sentarse de manera segura, ya que las superficies mojadas aumentan el riesgo de resbalones. Para nadar, se puede usar la férula, pero debe secarse completamente después. Obviamente, no use la férula durante demasiado tiempo cuando esté mojada para evitar laceraciones en la piel. Recuerde que su seguridad es primordial: nunca intente pararse o caminar con la férula, especialmente en superficies mojadas.",
                },
            ],
        },
        {
            category: "Recuperación médica",
            questions: [
                {
                    question:
                        "¿En qué etapa de la recuperación debo comenzar a usar la férula?",
                    answer:
                        "La férula debe usarse durante las semanas 2-12 después de la lesión, que es la fase de curación principal de la recuperación del tendón de Aquiles.",
                },
                {
                    question:
                        "¿Cómo mantiene la férula la posición de curación correcta?",
                    answer:
                        "La férula mantiene el pie en un ángulo de 30 grados, que es la posición óptima para la curación del tendón de Aquiles. Esto coincide con el ángulo que lograría con una bota con bisagras o cuñas, lo que garantiza una recuperación adecuada durante todo el período de curación.",
                },
                {
                    question:
                        "¿Puedo usar esto con un desgarro completo de Aquiles?",
                    answer: (
                        <>
                            Sí, está diseñado para desgarros completos de
                            Aquiles. Para más información, vaya{" "}
                            <a
                                className="text-primary underline underline-offset-2"
                                href="https://thetismedical.com/achilles-ruptures"
                            >
                                aquí
                            </a>
                            .
                        </>
                    ),
                },
                {
                    question:
                        "¿Cómo se compara esto con usar una bota por la noche?",
                    answer:
                        "La férula está diseñada para complementar el tratamiento con su bota, no para reemplazarlo por completo. Ofrece varias ventajas para el uso nocturno: es significativamente más ligera, más transpirable y más higiénica, ya que está diseñada específicamente para uso en interiores. Piense en ello como usar un aparato ortopédico nocturno especializado en lugar de dormir con calzado de exterior.",
                },
                {
                    question:
                        "¿Es normal un poco de movimiento de lado a lado en la férula?",
                    answer:
                        "Sí, una pequeña cantidad de movimiento de lado a lado es normal y no dañará su recuperación ni causará una nueva ruptura. El propósito principal de la férula es mantener el ángulo correcto de su pie (flexión plantar), que es esencial para la curación adecuada del tendón de Aquiles. Se espera y es seguro un poco de movimiento lateral. Lo más importante es que la férula evita que su pie se dorsiflexione (se doble hacia arriba), lo que ejercería una tensión dañina sobre el tendón en curación.",
                },
            ],
        },
        {
            category: "Pedidos y disponibilidad",
            questions: [
                {
                    question: "¿Hacen envíos internacionales?",
                    answer: (
                        <>
                            Enviamos a los EE. UU. y al Reino Unido, para
                            pedidos en otros países, visite
                            <a
                                className="text-primary underline underline-offset-2"
                                href="https://thetismedical.com/partners"
                            >
                                {" "}
                                nuestra página de socios
                            </a>
                            .
                        </>
                    ),
                },
                {
                    question:
                        "¿Cuándo estarán disponibles las tallas agotadas?",
                    answer: (
                        <>
                            Nuestra férula es popular, por lo que siempre
                            estamos reabasteciendo. Póngase en contacto con{" "}
                            <a
                                className="text-primary underline underline-offset-2"
                                href="mailto:info@thetismedical.com"
                            >
                                info@thetismedical.com
                            </a>{" "}
                            para conocer los plazos exactos.
                        </>
                    ),
                },
            ],
        },
        {
            category: "Especificaciones técnicas",
            questions: [
                {
                    question: "¿Qué ángulo mantiene la férula?",
                    answer:
                        "La férula mantiene un ángulo fijo de 30 grados, que coincide con el ángulo máximo que proporcionan las botas con bisagras o las botas con cuña. Este ángulo específico está diseñado para optimizar la curación durante todo el período de recuperación, manteniendo el dispositivo ligero y fácil de usar.",
                },
            ],
        },
    ],
    it: [
        {
            category: "Taglie e adattamento",
            questions: [
                {
                    question: "Come faccio a sapere quale taglia scegliere?",
                    answer: <SizeCalculator lang="it" />,
                },
                {
                    question: "La taglia è precisa?",
                    answer:
                        "Sì, la taglia è precisa. La taglia si basa sulla dimensione del piede, progettata per garantire che il tutore non interferisca con le dita dei piedi.",
                },
                {
                    question: "Posso regolare l'angolo del tutore?",
                    answer:
                        "No, il tutore è progettato per non essere regolabile per rimanere leggero. Mantiene l'angolo massimo che una borsa articolata o una borsa con cunei offrirebbe. Questo garantisce una guarigione sicura durante l'intero periodo di recupero. Poiché viene utilizzato in aggiunta alla borsa, l'angolo ottuso non porterà a un accorciamento del tendine o ad altri effetti indesiderati.",
                },
                {
                    question:
                        "Il mio piede può muoversi lateralmente, è un problema?",
                    answer:
                        "Un certo movimento laterale è normale e non influenzerà la guarigione. Lo scopo principale del tutore è mantenere l'angolo corretto del piede rivolto verso il basso (flessione plantare).",
                },
                {
                    question: "Quanto forte devo allacciare le cinghie?",
                    answer:
                        "Le cinghie devono essere ferme ma comode: abbastanza strette da fissare il piede ma non da limitare la circolazione. Allentare immediatamente se si avverte formicolio, intorpidimento o cambiamenti di colore nel piede. Anche se il piede non dovrebbe muoversi verso l'alto, è previsto un leggero movimento laterale.",
                },
            ],
        },
        {
            category: "Utilizzo del prodotto",
            questions: [
                {
                    question:
                        "Posso indossare questo invece di una borsa durante il giorno?",
                    answer:
                        "No, questo tutore è solo per riposo e sonno. Devi usare le stampelle se stai in piedi o ti muovi mentre indossi il tutore; non è progettato per camminare o sopportare peso.",
                },
                {
                    question:
                        "Posso usare il tutore per la tendinite di Achille?",
                    answer:
                        "No, il tutore viene utilizzato solo dopo la rottura del tendine di Achille. Non è adatto per ossa rotte, fascite plantare o tendinite di Achille. Il tutore mantiene il piede rivolto verso il basso, in una posizione di punta, per la guarigione del tendine. Per altre condizioni, come la fascite plantare e la tendinite di Achille, ci sono diversi tutori progettati deliberatamente per fare il contrario e mantenere il piede sollevato.",
                },
                {
                    question: "Posso bagnare il tutore (doccia/natazione)?",
                    answer:
                        "Il tutore può tollerare un'esposizione occasionale all'acqua, ma non è specificamente progettato per ambienti umidi. L'esposizione prolungata all'acqua può causare deterioramento delle parti morbide nel tempo. Se fai la doccia, ti consigliamo di usare una sedia o uno sgabello per sederti in sicurezza, poiché le superfici bagnate aumentano il rischio di scivolamento. Per nuotare, il tutore può essere indossato, ma deve essere asciugato accuratamente dopo. Ovviamente, non indossare il tutore troppo a lungo quando è bagnato per evitare lacerazioni cutanee. Ricorda che la tua sicurezza è fondamentale: non tentare mai di stare in piedi o camminare mentre indossi il tutore, specialmente su superfici bagnate.",
                },
            ],
        },
        {
            category: "Recupero medico",
            questions: [
                {
                    question:
                        "In quale fase di recupero dovrei iniziare a usare il tutore?",
                    answer:
                        "Il tutore dovrebbe essere utilizzato durante le settimane 2-12 dopo l'infortunio, che è la fase principale di guarigione del recupero del tendine di Achille.",
                },
                {
                    question:
                        "Come mantiene il tutore la corretta posizione di guarigione?",
                    answer:
                        "Il tutore mantiene il piede a un angolo di 30 gradi, che è la posizione ottimale per la guarigione del tendine di Achille. Questo corrisponde all'angolo che otterresti con una borsa articolata o cunei, garantendo una corretta guarigione durante l'intero periodo di guarigione.",
                },
                {
                    question:
                        "Posso usare questo con una rottura completa del tendine di Achille?",
                    answer: (
                        <>
                            Sì, è progettato per rotture complete del tendine di
                            Achille. Per ulteriori informazioni, vai{" "}
                            <a
                                className="text-primary underline underline-offset-2"
                                href="https://thetismedical.com/achilles-ruptures"
                            >
                                qui
                            </a>
                            .
                        </>
                    ),
                },
                {
                    question:
                        "Come si confronta questo con l'uso di una borsa di notte?",
                    answer:
                        "Il tutore è progettato per completare il trattamento con la borsa, non per sostituirlo completamente. Offre diversi vantaggi per l'uso notturno: è significativamente più leggero, più traspirante e più igienico, poiché è specificamente progettato per l'uso interno. Pensalo come indossare un tutore notturno specializzato piuttosto che dormire con calzature da esterno.",
                },
                {
                    question:
                        "È normale un certo movimento laterale nel tutore?",
                    answer:
                        "Sì, una piccola quantità di movimento laterale è normale e non danneggerà il tuo recupero o causerà una nuova rottura. Lo scopo principale del tutore è mantenere l'angolo corretto del tuo piede (flessione plantare), che è essenziale per una corretta guarigione del tendine di Achille. Un certo movimento laterale è previsto e sicuro. La cosa più importante è che il tutore impedisce al tuo piede di dorsiflettersi (piegarsi verso l'alto), il che eserciterebbe uno stress dannoso sul tendine in fase di guarigione.",
                },
            ],
        },
        {
            category: "Ordini e disponibilità",
            questions: [
                {
                    question: "Spedite a livello internazionale?",
                    answer: (
                        <>
                            Spediamo negli Stati Uniti e nel Regno Unito; per
                            ordini in altri paesi, visita{" "}
                            <a
                                className="text-primary underline underline-offset-2"
                                href="https://thetismedical.com/partners"
                            >
                                la nostra pagina partner
                            </a>
                            .
                        </>
                    ),
                },
                {
                    question: "Quando saranno disponibili le taglie esaurite?",
                    answer: (
                        <>
                            Il nostro tutore è popolare, quindi lo stiamo sempre
                            riassortendo. Contatta{" "}
                            <a
                                className="text-primary underline underline-offset-2"
                                href="mailto:info@thetismedical.com"
                            >
                                info@thetismedical.com
                            </a>{" "}
                            per tempistiche esatte.
                        </>
                    ),
                },
            ],
        },
        {
            category: "Specifiche tecniche",
            questions: [
                {
                    question: "Quale angolo mantiene il tutore?",
                    answer:
                        "Il tutore mantiene un angolo fisso di 30 gradi, che corrisponde all'angolo massimo fornito da stivali articolati o stivali a cuneo. Questo angolo specifico è progettato per ottimizzare la guarigione durante il tuo periodo di recupero, mantenendo il dispositivo leggero e facile da usare.",
                },
            ],
        },
    ],
};

const NightSplintFAQs = ({ lang = "en" }: { lang?: Lang }) => {
    const faqs = content[lang];
    return (
        <section class="flex flex-col items-center py-16">
            <FAQs faqs={faqs} className="sm:px-2 w-full max-w-xl" />
        </section>
    );
};

export default NightSplintFAQs;
