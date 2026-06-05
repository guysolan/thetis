import type { Lang } from "@/config/languages";

const copy = {
  en: {
    meta: {
      index: {
        title: "Splint Customer Offers | Thetis Medical",
        description:
          "Two offers for splint customers: submit a video review for cashback, or get 20% off the Achilles Recovery Course.",
      },
      review: {
        title: "Submit Video Review - Earn Cashback | Thetis Medical",
        description:
          "Upload your video review of our night splint and earn cashback if approved.",
      },
      course: {
        title: "20% Off Achilles Recovery Course | Thetis Medical",
        description:
          "Splint customers get 20% off the Achilles Recovery Course with code SPLINT20.",
      },
      claim: {
        title: "Claim Your Cashback | Thetis Medical",
        description:
          "Claim your cashback for your approved video review. Payment via PayPal or bank transfer.",
      },
      share: {
        title: "Share with Your Clinician | Thetis Medical",
        description:
          "Share our affiliate program with your doctor or physio and earn cashback when they sign up.",
      },
    },
    backLink: "← All splint customer offers",
    index: {
      badge: "Welcome, splint customer",
      title: "Choose your",
      titleHighlight: "offer",
      intro:
        "We have two ways to help you right now. Pick the one that feels best — or do both if you want.",
      claimPrompt: "Already submitted a review and been approved?",
      claimLink: "Claim your cashback →",
      shareLink: "Earn more by sharing with your clinician",
    },
    cards: {
      option1: "Option 1",
      option2: "Option 2",
      reviewTitle: "Submit a video review",
      reviewDescBefore:
        "Share a short video of your splint experience and earn",
      reviewDescAfter: "cashback if approved.",
      reviewCta: "Submit review",
      courseTitle: "Get the recovery course",
      courseDescBefore:
        "20% off the Achilles Rupture Recovery Course with code",
      courseDescAfter: ".",
      courseCta: "Get course discount",
      footer:
        "Pick one or do both — whatever helps your recovery most right now.",
    },
    review: {
      eyebrow: "Option 1 · Video review",
      title: "Earn cashback",
      intro:
        "Upload a short video or photos of your splint. If approved, we pay you back via PayPal or bank transfer.",
      guidelines: [
        "Video at least 30 seconds, or clear photos of you using the splint",
        "Honest feedback about sleep, comfort, and recovery",
        "We review within 3–5 business days, then email you to claim payment",
      ],
      approvedPrompt: "Already approved?",
      approvedLink: "Claim your cashback →",
      orBoth: "Or do both",
    },
    course: {
      eyebrow: "Option 2 · Course discount",
      title: "20% off the Achilles Recovery Course",
      codePrompt: "Use code {code} at checkout.",
      imageAlt: "Achilles Rupture Recovery Course",
      features: [
        "31 structured lessons from injury to return to sport",
        "Week-by-week recovery timeline and exercises",
        "Reviewed by foot & ankle specialists",
      ],
      addToCart: "Add course to cart",
      orBoth: "Or do both",
    },
    claim: {
      badge: "Claim cashback",
      title: "Claim your",
      titleHighlight: "cashback",
      introBefore: "For approved video reviews:",
      introAfter: "Paid via PayPal or bank transfer within 7–10 business days.",
    },
    share: {
      eyebrow: "Bonus offer",
      title: "Share with your clinician",
      introBefore: "Earn",
      introAfter:
        "when your doctor or physio signs up. We give you a ready-to-send email.",
      openEmail: "Open email message",
      copyEmail: "Copy message instead",
      copyDone: "Copied!",
      emailBody: `Hi Dr [Name] / [Physio Name],

I just bought the Thetis Achilles rupture splint to help me sleep and it's made a real difference. The company have a program where you can become an affiliate and give your patients 20% off and you get paid each time a patient buys one too! I would really appreciate it and think your patients would like it — please could you join and let me know once you're done?

You can sign up here: https://thetismedical.com/affiliates

Thanks for all the help with my recovery!`,
    },
    accordion: {
      reviewTitle: "What Happens Next?",
      reviewSteps: [
        "We'll review your submission (usually within 3-5 business days)",
        "If approved, you'll receive an email with a link to claim your cashback",
        "Complete the cashback claim form with your payment details",
        "Cashback is paid via PayPal or bank transfer within 7-10 business days",
        "Your review may be featured on our website (with your permission)",
      ],
      claimFormLink: "cashback claim form",
      shareTitle: "What Happens Next?",
      shareSteps: [
        "Send the email (or paste the copied message) to your doctor, physio or their secretary.",
        "When they sign up as an affiliate, reply to our follow-up email with their name.",
        "We'll confirm and send you a link to claim your reward.",
        "Complete the cashback claim form with your payment details.",
        "Payment is sent via PayPal or bank transfer within 7-10 business days.",
      ],
    },
    form: {
      thankYou: "Thank You!",
      submitted: "Your review has been submitted successfully.",
      submittedDetail:
        "If you included a video, we'll review within 3-5 business days and, once approved, you'll receive an email to claim your {amount} cashback. If you didn't add a video, add one later via the same form to be eligible for cashback.",
      courseCta: "Get 20% off the course →",
      backToOffers: "← Back to all offers",
      name: "Name",
      email: "Email",
      namePlaceholder: "Your name",
      emailPlaceholder: "your@email.com",
      emailHint: "We'll use this to contact you about your cashback",
      starRating: "Star rating",
      starHint: "1 = poor, 5 = excellent",
      reviewOptional: "Your Review (optional)",
      reviewPlaceholder:
        "Share any additional feedback about your experience with the night splint...",
      videoOptional: "Video (optional)",
      videoRequired:
        "Required for cashback — we need a video to approve your review and send {amount}. You can submit your rating now and add a video later.",
      uploadVideo: "Click to upload a video",
      uploadHint: "Max {max}MB per file • MP4, MOV, etc.",
      filesSelected: "{count} file(s) selected",
      total: "Total:",
      submitting: "Submitting...",
      submit: "Submit Review",
      footer:
        "By submitting, you agree that your review may be featured on our website (with your permission). Cashback ({amount}) will be processed within 7-10 business days after approval.",
      errors: {
        videoOnly: "Please upload video files only",
        fileSize: "Each file must be less than {max}MB",
        rating: "Please select a star rating",
        submitFailed: "Failed to submit review. Please try again.",
        generic: "Something went wrong. Please try again.",
      },
    },
  },
  de: {
    meta: {
      index: {
        title: "Schienen-Kunden-Angebote | Thetis Medical",
        description:
          "Zwei Angebote für Schienen-Kunden: Video-Bewertung für Cashback oder 20 % Rabatt auf den Achillessehnen-Genesungskurs.",
      },
      review: {
        title:
          "Video-Bewertung einreichen – Cashback verdienen | Thetis Medical",
        description:
          "Laden Sie Ihre Video-Bewertung unserer Nachtschiene hoch und erhalten Sie bei Genehmigung Cashback.",
      },
      course: {
        title: "20 % Rabatt auf Achilles-Genesungskurs | Thetis Medical",
        description:
          "Schienen-Kunden erhalten 20 % Rabatt auf den Achilles-Genesungskurs mit Code SPLINT20.",
      },
      claim: {
        title: "Cashback anfordern | Thetis Medical",
        description:
          "Fordern Sie Ihr Cashback für Ihre genehmigte Video-Bewertung an. Auszahlung per PayPal oder Banküberweisung.",
      },
      share: {
        title: "Mit Ihrem Behandler teilen | Thetis Medical",
        description:
          "Teilen Sie unser Partnerprogramm mit Arzt oder Physio und erhalten Sie Cashback bei Anmeldung.",
      },
    },
    backLink: "← Alle Schienen-Kunden-Angebote",
    index: {
      badge: "Willkommen, Schienen-Kunde",
      title: "Wählen Sie Ihr",
      titleHighlight: "Angebot",
      intro:
        "Wir haben zwei Möglichkeiten, Ihnen jetzt zu helfen. Wählen Sie eine — oder nutzen Sie beide.",
      claimPrompt: "Bewertung bereits eingereicht und genehmigt?",
      claimLink: "Cashback anfordern →",
      shareLink: "Mehr verdienen, indem Sie es Ihrem Behandler mitteilen",
    },
    cards: {
      option1: "Option 1",
      option2: "Option 2",
      reviewTitle: "Video-Bewertung einreichen",
      reviewDescBefore:
        "Teilen Sie ein kurzes Video Ihrer Schienen-Erfahrung und erhalten Sie",
      reviewDescAfter: "Cashback bei Genehmigung.",
      reviewCta: "Bewertung einreichen",
      courseTitle: "Genesungskurs sichern",
      courseDescBefore: "20 % Rabatt auf den Achilles-Genesungskurs mit Code",
      courseDescAfter: ".",
      courseCta: "Kursrabatt erhalten",
      footer:
        "Wählen Sie eine Option oder beides — was Ihrer Genesung gerade am meisten hilft.",
    },
    review: {
      eyebrow: "Option 1 · Video-Bewertung",
      title: "Cashback verdienen",
      intro:
        "Laden Sie ein kurzes Video oder Fotos Ihrer Schiene hoch. Bei Genehmigung zahlen wir per PayPal oder Banküberweisung zurück.",
      guidelines: [
        "Video mindestens 30 Sekunden oder klare Fotos bei Nutzung der Schiene",
        "Ehrliches Feedback zu Schlaf, Komfort und Genesung",
        "Prüfung innerhalb von 3–5 Werktagen, dann E-Mail zur Auszahlung",
      ],
      approvedPrompt: "Bereits genehmigt?",
      approvedLink: "Cashback anfordern →",
      orBoth: "Oder beides",
    },
    course: {
      eyebrow: "Option 2 · Kursrabatt",
      title: "20 % Rabatt auf den Achilles-Genesungskurs",
      codePrompt: "Code {code} an der Kasse verwenden.",
      imageAlt: "Achilles-Genesungskurs",
      features: [
        "31 strukturierte Lektionen von der Verletzung bis zum Sport",
        "Wöchentlicher Genesungsplan und Übungen",
        "Von Fuß- und Sprunggelenkspezialisten geprüft",
      ],
      addToCart: "Kurs in den Warenkorb",
      orBoth: "Oder beides",
    },
    claim: {
      badge: "Cashback anfordern",
      title: "Fordern Sie Ihr",
      titleHighlight: "Cashback",
      introBefore: "Für genehmigte Video-Bewertungen:",
      introAfter:
        "Auszahlung per PayPal oder Banküberweisung innerhalb von 7–10 Werktagen.",
    },
    share: {
      eyebrow: "Bonus-Angebot",
      title: "Mit Ihrem Behandler teilen",
      introBefore: "Verdienen Sie",
      introAfter:
        "wenn sich Ihr Arzt oder Physio anmeldet. Wir geben Ihnen eine fertige E-Mail.",
      openEmail: "E-Mail öffnen",
      copyEmail: "Nachricht kopieren",
      copyDone: "Kopiert!",
      emailBody: `Hallo Dr [Name] / [Physio-Name],

ich habe gerade die Thetis Achillessehnen-Nachtschiene gekauft, um besser schlafen zu können, und sie hat wirklich geholfen. Das Unternehmen hat ein Programm, bei dem Sie Partner werden können, Ihren Patienten 20 % Rabatt geben und bei jedem Kauf mitverdienen! Ich würde mich sehr freuen, wenn Sie mitmachen — bitte melden Sie sich an und geben Sie mir Bescheid.

Anmeldung hier: https://thetismedical.com/affiliates

Vielen Dank für Ihre Hilfe bei meiner Genesung!`,
    },
    accordion: {
      reviewTitle: "Wie geht es weiter?",
      reviewSteps: [
        "Wir prüfen Ihre Einreichung (in der Regel innerhalb von 3–5 Werktagen)",
        "Bei Genehmigung erhalten Sie eine E-Mail mit Link zum Cashback",
        "Füllen Sie das Cashback-Formular mit Ihren Zahlungsdaten aus",
        "Auszahlung per PayPal oder Banküberweisung innerhalb von 7–10 Werktagen",
        "Ihre Bewertung kann auf unserer Website erscheinen (mit Ihrer Erlaubnis)",
      ],
      claimFormLink: "Cashback-Formular",
      shareTitle: "Wie geht es weiter?",
      shareSteps: [
        "Senden Sie die E-Mail (oder fügen Sie die kopierte Nachricht ein) an Arzt, Physio oder Sekretariat.",
        "Wenn sich Ihr Behandler anmeldet, antworten Sie auf unsere E-Mail mit dem Namen.",
        "Wir bestätigen und senden Ihnen einen Link zum Cashback.",
        "Füllen Sie das Cashback-Formular mit Ihren Zahlungsdaten aus.",
        "Auszahlung per PayPal oder Banküberweisung innerhalb von 7–10 Werktagen.",
      ],
    },
    form: {
      thankYou: "Vielen Dank!",
      submitted: "Ihre Bewertung wurde erfolgreich eingereicht.",
      submittedDetail:
        "Wenn Sie ein Video beigefügt haben, prüfen wir es innerhalb von 3–5 Werktagen und senden Ihnen bei Genehmigung eine E-Mail für {amount} Cashback. Ohne Video können Sie später eines nachreichen.",
      courseCta: "20 % Kursrabatt →",
      backToOffers: "← Zurück zu allen Angeboten",
      name: "Name",
      email: "E-Mail",
      namePlaceholder: "Ihr Name",
      emailPlaceholder: "ihre@email.de",
      emailHint: "Wir kontaktieren Sie hier wegen Ihres Cashbacks",
      starRating: "Sternebewertung",
      starHint: "1 = schlecht, 5 = ausgezeichnet",
      reviewOptional: "Ihre Bewertung (optional)",
      reviewPlaceholder:
        "Teilen Sie weiteres Feedback zu Ihrer Erfahrung mit der Nachtschiene...",
      videoOptional: "Video (optional)",
      videoRequired:
        "Für Cashback erforderlich — wir brauchen ein Video für {amount}. Sie können jetzt bewerten und das Video später hinzufügen.",
      uploadVideo: "Video hochladen",
      uploadHint: "Max. {max}MB pro Datei • MP4, MOV usw.",
      filesSelected: "{count} Datei(en) ausgewählt",
      total: "Gesamt:",
      submitting: "Wird gesendet...",
      submit: "Bewertung absenden",
      footer:
        "Mit dem Absenden stimmen Sie zu, dass Ihre Bewertung auf unserer Website erscheinen kann (mit Ihrer Erlaubnis). Cashback ({amount}) wird nach Genehmigung innerhalb von 7–10 Werktagen bearbeitet.",
      errors: {
        videoOnly: "Bitte nur Videodateien hochladen",
        fileSize: "Jede Datei muss kleiner als {max}MB sein",
        rating: "Bitte wählen Sie eine Sternebewertung",
        submitFailed: "Senden fehlgeschlagen. Bitte erneut versuchen.",
        generic: "Etwas ist schiefgelaufen. Bitte erneut versuchen.",
      },
    },
  },
  fr: {
    meta: {
      index: {
        title: "Offres clients attelle | Thetis Medical",
        description:
          "Deux offres pour les clients attelle : avis vidéo avec cashback ou 20 % de réduction sur le cours de récupération.",
      },
      review: {
        title: "Envoyer un avis vidéo – Cashback | Thetis Medical",
        description:
          "Téléchargez votre avis vidéo sur notre attelle de nuit et recevez un cashback si approuvé.",
      },
      course: {
        title: "20 % de réduction sur le cours | Thetis Medical",
        description:
          "Les clients attelle bénéficient de 20 % de réduction sur le cours avec le code SPLINT20.",
      },
      claim: {
        title: "Réclamer votre cashback | Thetis Medical",
        description:
          "Réclamez votre cashback pour votre avis vidéo approuvé. Paiement via PayPal ou virement.",
      },
      share: {
        title: "Partager avec votre clinicien | Thetis Medical",
        description:
          "Partagez notre programme partenaire avec votre médecin ou kiné et gagnez un cashback.",
      },
    },
    backLink: "← Toutes les offres clients attelle",
    index: {
      badge: "Bienvenue, client attelle",
      title: "Choisissez votre",
      titleHighlight: "offre",
      intro:
        "Deux façons de vous aider dès maintenant. Choisissez l'une — ou les deux.",
      claimPrompt: "Avis déjà envoyé et approuvé ?",
      claimLink: "Réclamer votre cashback →",
      shareLink: "Gagnez plus en partageant avec votre clinicien",
    },
    cards: {
      option1: "Option 1",
      option2: "Option 2",
      reviewTitle: "Envoyer un avis vidéo",
      reviewDescBefore:
        "Partagez une courte vidéo de votre expérience et gagnez",
      reviewDescAfter: "de cashback si approuvé.",
      reviewCta: "Envoyer l'avis",
      courseTitle: "Obtenir le cours de récupération",
      courseDescBefore: "20 % de réduction sur le cours Achille avec le code",
      courseDescAfter: ".",
      courseCta: "Obtenir la réduction",
      footer:
        "Choisissez l'une ou les deux — ce qui aide le plus votre récupération.",
    },
    review: {
      eyebrow: "Option 1 · Avis vidéo",
      title: "Gagner du cashback",
      intro:
        "Téléchargez une courte vidéo ou des photos de votre attelle. Si approuvé, nous vous remboursons via PayPal ou virement.",
      guidelines: [
        "Vidéo d'au moins 30 secondes, ou photos claires avec l'attelle",
        "Retour honnête sur le sommeil, le confort et la récupération",
        "Examen sous 3–5 jours ouvrés, puis e-mail pour réclamer le paiement",
      ],
      approvedPrompt: "Déjà approuvé ?",
      approvedLink: "Réclamer votre cashback →",
      orBoth: "Ou les deux",
    },
    course: {
      eyebrow: "Option 2 · Réduction cours",
      title: "20 % de réduction sur le cours Achille",
      codePrompt: "Utilisez le code {code} au paiement.",
      imageAlt: "Cours de récupération Achille",
      features: [
        "31 leçons structurées de la blessure au retour au sport",
        "Calendrier de récupération semaine par semaine et exercices",
        "Revu par des spécialistes du pied et de la cheville",
      ],
      addToCart: "Ajouter le cours au panier",
      orBoth: "Ou les deux",
    },
    claim: {
      badge: "Réclamer le cashback",
      title: "Réclamez votre",
      titleHighlight: "cashback",
      introBefore: "Pour les avis vidéo approuvés :",
      introAfter: "Paiement via PayPal ou virement sous 7–10 jours ouvrés.",
    },
    share: {
      eyebrow: "Offre bonus",
      title: "Partager avec votre clinicien",
      introBefore: "Gagnez",
      introAfter:
        "lorsque votre médecin ou kiné s'inscrit. Nous vous fournissons un e-mail prêt à envoyer.",
      openEmail: "Ouvrir l'e-mail",
      copyEmail: "Copier le message",
      copyDone: "Copié !",
      emailBody: `Bonjour Dr [Nom] / [Nom du kiné],

Je viens d'acheter l'attelle de nuit Thetis pour mon tendon d'Achille et cela m'a beaucoup aidé à dormir. L'entreprise propose un programme partenaire : vous pouvez offrir 20 % de réduction à vos patients et être rémunéré à chaque achat. Pourriez-vous vous inscrire et me le confirmer ?

Inscription ici : https://thetismedical.com/affiliates

Merci pour votre aide dans ma récupération !`,
    },
    accordion: {
      reviewTitle: "Et ensuite ?",
      reviewSteps: [
        "Nous examinons votre envoi (généralement sous 3–5 jours ouvrés)",
        "Si approuvé, vous recevrez un e-mail avec un lien pour réclamer le cashback",
        "Complétez le formulaire de cashback avec vos coordonnées de paiement",
        "Cashback payé via PayPal ou virement sous 7–10 jours ouvrés",
        "Votre avis peut être publié sur notre site (avec votre accord)",
      ],
      claimFormLink: "formulaire de cashback",
      shareTitle: "Et ensuite ?",
      shareSteps: [
        "Envoyez l'e-mail (ou collez le message copié) à votre médecin, kiné ou secrétariat.",
        "Quand il s'inscrit, répondez à notre e-mail de suivi avec son nom.",
        "Nous confirmons et vous envoyons un lien pour réclamer votre récompense.",
        "Complétez le formulaire de cashback avec vos coordonnées de paiement.",
        "Paiement via PayPal ou virement sous 7–10 jours ouvrés.",
      ],
    },
    form: {
      thankYou: "Merci !",
      submitted: "Votre avis a été envoyé avec succès.",
      submittedDetail:
        "Si vous avez joint une vidéo, nous l'examinerons sous 3–5 jours ouvrés et vous enverrons un e-mail pour réclamer {amount} de cashback. Sans vidéo, vous pourrez en ajouter une plus tard.",
      courseCta: "20 % de réduction sur le cours →",
      backToOffers: "← Retour aux offres",
      name: "Nom",
      email: "E-mail",
      namePlaceholder: "Votre nom",
      emailPlaceholder: "votre@email.com",
      emailHint: "Nous l'utiliserons pour votre cashback",
      starRating: "Note",
      starHint: "1 = mauvais, 5 = excellent",
      reviewOptional: "Votre avis (facultatif)",
      reviewPlaceholder: "Partagez votre expérience avec l'attelle de nuit...",
      videoOptional: "Vidéo (facultatif)",
      videoRequired:
        "Requis pour le cashback — nous avons besoin d'une vidéo pour {amount}. Vous pouvez noter maintenant et ajouter la vidéo plus tard.",
      uploadVideo: "Cliquez pour télécharger une vidéo",
      uploadHint: "Max {max}Mo par fichier • MP4, MOV, etc.",
      filesSelected: "{count} fichier(s) sélectionné(s)",
      total: "Total :",
      submitting: "Envoi en cours...",
      submit: "Envoyer l'avis",
      footer:
        "En envoyant, vous acceptez que votre avis puisse être publié sur notre site (avec votre accord). Cashback ({amount}) traité sous 7–10 jours ouvrés après approbation.",
      errors: {
        videoOnly: "Veuillez télécharger uniquement des vidéos",
        fileSize: "Chaque fichier doit faire moins de {max}Mo",
        rating: "Veuillez sélectionner une note",
        submitFailed: "Échec de l'envoi. Veuillez réessayer.",
        generic: "Une erreur s'est produite. Veuillez réessayer.",
      },
    },
  },
  es: {
    meta: {
      index: {
        title: "Ofertas para clientes de férula | Thetis Medical",
        description:
          "Dos ofertas: reseña en vídeo con cashback o 20 % de descuento en el curso de recuperación.",
      },
      review: {
        title: "Enviar reseña en vídeo – Cashback | Thetis Medical",
        description:
          "Sube tu reseña en vídeo de nuestra férula nocturna y recibe cashback si se aprueba.",
      },
      course: {
        title: "20 % de descuento en el curso | Thetis Medical",
        description:
          "Clientes de férula: 20 % de descuento en el curso con el código SPLINT20.",
      },
      claim: {
        title: "Reclamar cashback | Thetis Medical",
        description:
          "Reclama tu cashback por tu reseña en vídeo aprobada. Pago por PayPal o transferencia.",
      },
      share: {
        title: "Compartir con tu clínico | Thetis Medical",
        description:
          "Comparte nuestro programa de afiliados con tu médico o fisio y gana cashback.",
      },
    },
    backLink: "← Todas las ofertas para clientes",
    index: {
      badge: "Bienvenido, cliente de férula",
      title: "Elige tu",
      titleHighlight: "oferta",
      intro: "Tenemos dos formas de ayudarte ahora. Elige una — o las dos.",
      claimPrompt: "¿Reseña enviada y ya aprobada?",
      claimLink: "Reclamar cashback →",
      shareLink: "Gana más compartiendo con tu clínico",
    },
    cards: {
      option1: "Opción 1",
      option2: "Opción 2",
      reviewTitle: "Enviar reseña en vídeo",
      reviewDescBefore: "Comparte un vídeo corto de tu experiencia y gana",
      reviewDescAfter: "de cashback si se aprueba.",
      reviewCta: "Enviar reseña",
      courseTitle: "Obtener el curso de recuperación",
      courseDescBefore:
        "20 % de descuento en el curso de recuperación con el código",
      courseDescAfter: ".",
      courseCta: "Obtener descuento",
      footer: "Elige una o ambas — lo que más ayude a tu recuperación ahora.",
    },
    review: {
      eyebrow: "Opción 1 · Reseña en vídeo",
      title: "Gana cashback",
      intro:
        "Sube un vídeo corto o fotos de tu férula. Si se aprueba, te pagamos por PayPal o transferencia.",
      guidelines: [
        "Vídeo de al menos 30 segundos, o fotos claras usando la férula",
        "Feedback honesto sobre sueño, comodidad y recuperación",
        "Revisamos en 3–5 días laborables y te enviamos un correo para cobrar",
      ],
      approvedPrompt: "¿Ya aprobada?",
      approvedLink: "Reclamar cashback →",
      orBoth: "O ambas",
    },
    course: {
      eyebrow: "Opción 2 · Descuento en curso",
      title: "20 % de descuento en el curso de recuperación",
      codePrompt: "Usa el código {code} al pagar.",
      imageAlt: "Curso de recuperación de Aquiles",
      features: [
        "31 lecciones estructuradas desde la lesión hasta volver al deporte",
        "Cronograma semanal de recuperación y ejercicios",
        "Revisado por especialistas en pie y tobillo",
      ],
      addToCart: "Añadir curso al carrito",
      orBoth: "O ambas",
    },
    claim: {
      badge: "Reclamar cashback",
      title: "Reclama tu",
      titleHighlight: "cashback",
      introBefore: "Para reseñas en vídeo aprobadas:",
      introAfter: "Pago por PayPal o transferencia en 7–10 días laborables.",
    },
    share: {
      eyebrow: "Oferta extra",
      title: "Compartir con tu clínico",
      introBefore: "Gana",
      introAfter:
        "cuando tu médico o fisio se registre. Te damos un correo listo para enviar.",
      openEmail: "Abrir correo",
      copyEmail: "Copiar mensaje",
      copyDone: "¡Copiado!",
      emailBody: `Hola Dr [Nombre] / [Nombre del fisio],

Acabo de comprar la férula nocturna Thetis para dormir mejor con mi rotura de Aquiles y me ha ayudado mucho. La empresa tiene un programa de afiliados: puede ofrecer un 20 % de descuento a sus pacientes y recibir comisión. ¿Podría registrarse y avisarme?

Registro aquí: https://thetismedical.com/affiliates

¡Gracias por su ayuda en mi recuperación!`,
    },
    accordion: {
      reviewTitle: "¿Qué pasa después?",
      reviewSteps: [
        "Revisamos tu envío (normalmente en 3–5 días laborables)",
        "Si se aprueba, recibirás un correo con enlace para reclamar el cashback",
        "Completa el formulario de cashback con tus datos de pago",
        "Cashback pagado por PayPal o transferencia en 7–10 días laborables",
        "Tu reseña puede aparecer en nuestra web (con tu permiso)",
      ],
      claimFormLink: "formulario de cashback",
      shareTitle: "¿Qué pasa después?",
      shareSteps: [
        "Envía el correo (o pega el mensaje copiado) a tu médico, fisio o secretaría.",
        "Cuando se registre, responde a nuestro correo con su nombre.",
        "Confirmamos y te enviamos un enlace para reclamar tu recompensa.",
        "Completa el formulario de cashback con tus datos de pago.",
        "Pago por PayPal o transferencia en 7–10 días laborables.",
      ],
    },
    form: {
      thankYou: "¡Gracias!",
      submitted: "Tu reseña se ha enviado correctamente.",
      submittedDetail:
        "Si incluiste un vídeo, lo revisaremos en 3–5 días laborables y te enviaremos un correo para reclamar {amount} de cashback. Sin vídeo, puedes añadirlo después.",
      courseCta: "20 % de descuento en el curso →",
      backToOffers: "← Volver a todas las ofertas",
      name: "Nombre",
      email: "Correo",
      namePlaceholder: "Tu nombre",
      emailPlaceholder: "tu@email.com",
      emailHint: "Lo usaremos para contactarte sobre el cashback",
      starRating: "Valoración",
      starHint: "1 = malo, 5 = excelente",
      reviewOptional: "Tu reseña (opcional)",
      reviewPlaceholder:
        "Comparte más feedback sobre tu experiencia con la férula...",
      videoOptional: "Vídeo (opcional)",
      videoRequired:
        "Necesario para cashback — necesitamos un vídeo para {amount}. Puedes valorar ahora y añadir el vídeo después.",
      uploadVideo: "Haz clic para subir un vídeo",
      uploadHint: "Máx. {max}MB por archivo • MP4, MOV, etc.",
      filesSelected: "{count} archivo(s) seleccionado(s)",
      total: "Total:",
      submitting: "Enviando...",
      submit: "Enviar reseña",
      footer:
        "Al enviar, aceptas que tu reseña pueda publicarse en nuestra web (con tu permiso). Cashback ({amount}) en 7–10 días laborables tras aprobación.",
      errors: {
        videoOnly: "Sube solo archivos de vídeo",
        fileSize: "Cada archivo debe ser menor de {max}MB",
        rating: "Selecciona una valoración",
        submitFailed: "Error al enviar. Inténtalo de nuevo.",
        generic: "Algo salió mal. Inténtalo de nuevo.",
      },
    },
  },
  it: {
    meta: {
      index: {
        title: "Offerte clienti tutore | Thetis Medical",
        description:
          "Due offerte: recensione video con cashback o 20% di sconto sul corso di recupero.",
      },
      review: {
        title: "Invia recensione video – Cashback | Thetis Medical",
        description:
          "Carica la tua recensione video del tutore notturno e ricevi cashback se approvata.",
      },
      course: {
        title: "20% di sconto sul corso | Thetis Medical",
        description:
          "Clienti tutore: 20% di sconto sul corso con codice SPLINT20.",
      },
      claim: {
        title: "Richiedi cashback | Thetis Medical",
        description:
          "Richiedi il cashback per la recensione video approvata. Pagamento via PayPal o bonifico.",
      },
      share: {
        title: "Condividi con il tuo clinico | Thetis Medical",
        description:
          "Condividi il programma affiliati con medico o fisio e guadagna cashback.",
      },
    },
    backLink: "← Tutte le offerte clienti tutore",
    index: {
      badge: "Benvenuto, cliente tutore",
      title: "Scegli la tua",
      titleHighlight: "offerta",
      intro: "Due modi per aiutarti ora. Scegline uno — o entrambi.",
      claimPrompt: "Recensione già inviata e approvata?",
      claimLink: "Richiedi cashback →",
      shareLink: "Guadagna di più condividendo con il tuo clinico",
    },
    cards: {
      option1: "Opzione 1",
      option2: "Opzione 2",
      reviewTitle: "Invia recensione video",
      reviewDescBefore:
        "Condividi un breve video della tua esperienza e guadagna",
      reviewDescAfter: "di cashback se approvata.",
      reviewCta: "Invia recensione",
      courseTitle: "Ottieni il corso di recupero",
      courseDescBefore: "20% di sconto sul corso di recupero con codice",
      courseDescAfter: ".",
      courseCta: "Ottieni sconto corso",
      footer:
        "Scegli una o entrambe — ciò che aiuta di più il tuo recupero ora.",
    },
    review: {
      eyebrow: "Opzione 1 · Recensione video",
      title: "Guadagna cashback",
      intro:
        "Carica un breve video o foto del tutore. Se approvata, ti paghiamo via PayPal o bonifico.",
      guidelines: [
        "Video di almeno 30 secondi, o foto chiare con il tutore",
        "Feedback onesto su sonno, comfort e recupero",
        "Revisione entro 3–5 giorni lavorativi, poi email per il pagamento",
      ],
      approvedPrompt: "Già approvata?",
      approvedLink: "Richiedi cashback →",
      orBoth: "O entrambe",
    },
    course: {
      eyebrow: "Opzione 2 · Sconto corso",
      title: "20% di sconto sul corso di recupero",
      codePrompt: "Usa il codice {code} al checkout.",
      imageAlt: "Corso di recupero Achille",
      features: [
        "31 lezioni strutturate dalla lesione al ritorno allo sport",
        "Timeline settimanale di recupero ed esercizi",
        "Revisionato da specialisti di piede e caviglia",
      ],
      addToCart: "Aggiungi corso al carrello",
      orBoth: "O entrambe",
    },
    claim: {
      badge: "Richiedi cashback",
      title: "Richiedi il tuo",
      titleHighlight: "cashback",
      introBefore: "Per recensioni video approvate:",
      introAfter:
        "Pagamento via PayPal o bonifico entro 7–10 giorni lavorativi.",
    },
    share: {
      eyebrow: "Offerta bonus",
      title: "Condividi con il tuo clinico",
      introBefore: "Guadagna",
      introAfter:
        "quando il tuo medico o fisio si iscrive. Ti forniamo un'email pronta da inviare.",
      openEmail: "Apri email",
      copyEmail: "Copia messaggio",
      copyDone: "Copiato!",
      emailBody: `Salve Dr [Nome] / [Nome del fisio],

Ho appena acquistato il tutore notturno Thetis per dormire meglio con la rottura di Achille e mi ha aiutato molto. L'azienda ha un programma affiliati: può offrire il 20% di sconto ai pazienti e guadagnare commissioni. Potrebbe iscriversi e farmi sapere?

Iscrizione qui: https://thetismedical.com/affiliates

Grazie per l'aiuto nel mio recupero!`,
    },
    accordion: {
      reviewTitle: "Cosa succede dopo?",
      reviewSteps: [
        "Esaminiamo il tuo invio (di solito entro 3–5 giorni lavorativi)",
        "Se approvata, riceverai un'email con link per richiedere il cashback",
        "Completa il modulo cashback con i dati di pagamento",
        "Cashback pagato via PayPal o bonifico entro 7–10 giorni lavorativi",
        "La recensione può essere pubblicata sul sito (con il tuo permesso)",
      ],
      claimFormLink: "modulo cashback",
      shareTitle: "Cosa succede dopo?",
      shareSteps: [
        "Invia l'email (o incolla il messaggio copiato) al medico, fisio o segreteria.",
        "Quando si iscrive, rispondi alla nostra email con il nome.",
        "Confermiamo e ti inviamo un link per richiedere la ricompensa.",
        "Completa il modulo cashback con i dati di pagamento.",
        "Pagamento via PayPal o bonifico entro 7–10 giorni lavorativi.",
      ],
    },
    form: {
      thankYou: "Grazie!",
      submitted: "La tua recensione è stata inviata con successo.",
      submittedDetail:
        "Se hai incluso un video, lo esamineremo entro 3–5 giorni lavorativi e ti invieremo un'email per {amount} di cashback. Senza video, puoi aggiungerlo dopo.",
      courseCta: "20% di sconto sul corso →",
      backToOffers: "← Torna a tutte le offerte",
      name: "Nome",
      email: "Email",
      namePlaceholder: "Il tuo nome",
      emailPlaceholder: "tua@email.com",
      emailHint: "La useremo per contattarti sul cashback",
      starRating: "Valutazione",
      starHint: "1 = scarso, 5 = eccellente",
      reviewOptional: "La tua recensione (opzionale)",
      reviewPlaceholder:
        "Condividi altro feedback sulla tua esperienza con il tutore...",
      videoOptional: "Video (opzionale)",
      videoRequired:
        "Necessario per il cashback — serve un video per {amount}. Puoi valutare ora e aggiungere il video dopo.",
      uploadVideo: "Clicca per caricare un video",
      uploadHint: "Max {max}MB per file • MP4, MOV, ecc.",
      filesSelected: "{count} file selezionati",
      total: "Totale:",
      submitting: "Invio in corso...",
      submit: "Invia recensione",
      footer:
        "Inviando, accetti che la recensione possa essere pubblicata sul sito (con permesso). Cashback ({amount}) entro 7–10 giorni lavorativi dopo approvazione.",
      errors: {
        videoOnly: "Carica solo file video",
        fileSize: "Ogni file deve essere inferiore a {max}MB",
        rating: "Seleziona una valutazione",
        submitFailed: "Invio fallito. Riprova.",
        generic: "Qualcosa è andato storto. Riprova.",
      },
    },
  },
} as const;

export type SplintCustomerCopy = (typeof copy)["en"];

export function getSplintCustomerCopy(lang: Lang): SplintCustomerCopy {
  return copy[lang] ?? copy.en;
}

/** Replace `{key}` placeholders in translated strings. */
export function formatCopy(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(
    /\{(\w+)\}/g,
    (_, key: string) => String(values[key] ?? `{${key}}`),
  );
}
