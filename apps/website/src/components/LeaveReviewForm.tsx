"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Check, Image, Loader2, Star, Upload, Video } from "lucide-react";

type Lang = "en" | "de" | "fr" | "es" | "it";

// Currency detection
const getCurrency = async () => {
  try {
    const geoResponse = await fetch("https://ipapi.co/json/");
    if (geoResponse.ok) {
      const geoData = await geoResponse.json();
      const country = geoData.country_code || "GB";
      if (country === "US") {
        return { symbol: "$", amount: "15" };
      }
    }
  } catch (error) {
    console.error("Failed to detect location:", error);
  }
  return { symbol: "£", amount: "10" };
};

type ProductType = "splint" | "course";

const translations = {
  en: {
    products: {
      splint: {
        name: "Achilles Night Splint",
        label: "🦶 Night Splint",
        sublabel: "Achilles recovery splint",
      },
      course: {
        name: "Achilles Recovery Course",
        label: "📚 Recovery Course",
        sublabel: "Online recovery guide",
      },
    },
    whatReviewing: "What are you reviewing?",
    required: "*",
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "your@email.com",
    emailHelp: "We'll use this to contact you about your cashback",
    rating: "Rating",
    yourReview: "Your Review",
    reviewPlaceholder: "Share your experience with the",
    photosVideos: "Photos or Videos",
    cashbackLabel: "(cashback for videos with spoken review only)",
    uploadHelp: "You can upload",
    photosOrVideos: "photos or videos",
    cashbackOnlyFor: "Cashback is only available for video reviews with spoken content",
    min10sec: "(minimum 10 seconds of speaking). Photo-only reviews do not qualify for cashback.",
    filesSelected: "file(s) selected",
    videoEligible: "✓ Video may be eligible for cashback (if it includes spoken review)",
    photosNoQualify: "⚠️ Photos do not qualify for cashback",
    clickUpload: "Click to upload photos or videos",
    uploadFormats: "Photos: JPG, PNG • Videos: MP4, MOV (10+ sec for cashback) • Max 100MB each",
    cashbackOnlyVideos: "Cashback only for videos with spoken review",
    submitReview: "Submit Review",
    submitting: "Submitting...",
    thankYou: "Thank You for Your Review!",
    reviewSubmitted: "Your review has been submitted successfully.",
    videoApprovalMsg:
      "We'll review your submission within 3-5 business days. If your video includes a spoken review (10+ seconds), you'll receive an email with instructions to claim your",
    cashback: "cashback",
    onceApproved: "once approved.",
    photoThankYou:
      "Thank you for your photos! Note that cashback is only available for video reviews with spoken content. We'll review your submission within 3-5 business days.",
    noMediaThankYou:
      "Thank you for your feedback! To earn cashback, make sure to include a video with spoken review (10+ seconds) in future submissions.",
    disclaimer:
      "By submitting, you agree that your review may be featured on our website (with your permission). Cashback",
    disclaimerEnd:
      "is only available for approved video reviews with spoken content and will be processed within 7-10 business days.",
    errorReview: "Please write a review",
    errorPhotoVideo: "Please upload only photos or videos",
    errorFileSize: "Each file must be less than 100MB",
    errorGeneric: "Something went wrong. Please try again.",
  },
  de: {
    products: {
      splint: {
        name: "Achilles-Nachtschiene",
        label: "🦶 Nachtschiene",
        sublabel: "Achilles-Genesungsschiene",
      },
      course: {
        name: "Achilles-Genesungskurs",
        label: "📚 Genesungskurs",
        sublabel: "Online-Genesungsführer",
      },
    },
    whatReviewing: "Was bewerten Sie?",
    required: "*",
    name: "Name",
    namePlaceholder: "Ihr Name",
    email: "E-Mail",
    emailPlaceholder: "ihre@email.com",
    emailHelp: "Wir verwenden diese, um Sie bezüglich Ihres Cashbacks zu kontaktieren",
    rating: "Bewertung",
    yourReview: "Ihre Bewertung",
    reviewPlaceholder: "Teilen Sie Ihre Erfahrung mit",
    photosVideos: "Fotos oder Videos",
    cashbackLabel: "(Cashback nur für Videos mit gesprochenem Inhalt)",
    uploadHelp: "Sie können",
    photosOrVideos: "Fotos oder Videos",
    cashbackOnlyFor: "Cashback ist nur für Video-Bewertungen mit gesprochenem Inhalt verfügbar",
    min10sec:
      "(mindestens 10 Sekunden Sprechen). Nur-Foto-Bewertungen qualifizieren nicht für Cashback.",
    filesSelected: "Datei(en) ausgewählt",
    videoEligible:
      "✓ Video kann für Cashback berechtigt sein (wenn es gesprochene Bewertung enthält)",
    photosNoQualify: "⚠️ Fotos qualifizieren nicht für Cashback",
    clickUpload: "Klicken Sie, um Fotos oder Videos hochzuladen",
    uploadFormats:
      "Fotos: JPG, PNG • Videos: MP4, MOV (10+ Sek. für Cashback) • Max 100MB pro Datei",
    cashbackOnlyVideos: "Cashback nur für Videos mit gesprochener Bewertung",
    submitReview: "Bewertung absenden",
    submitting: "Wird gesendet...",
    thankYou: "Vielen Dank für Ihre Bewertung!",
    reviewSubmitted: "Ihre Bewertung wurde erfolgreich eingereicht.",
    videoApprovalMsg:
      "Wir werden Ihre Einreichung innerhalb von 3-5 Werktagen prüfen. Wenn Ihr Video eine gesprochene Bewertung (10+ Sekunden) enthält, erhalten Sie eine E-Mail mit Anweisungen zur Anforderung Ihres",
    cashback: "Cashbacks",
    onceApproved: "nach Genehmigung.",
    photoThankYou:
      "Vielen Dank für Ihre Fotos! Beachten Sie, dass Cashback nur für Video-Bewertungen mit gesprochenem Inhalt verfügbar ist. Wir werden Ihre Einreichung innerhalb von 3-5 Werktagen prüfen.",
    noMediaThankYou:
      "Vielen Dank für Ihr Feedback! Um Cashback zu verdienen, fügen Sie bei zukünftigen Einreichungen ein Video mit gesprochener Bewertung (10+ Sekunden) hinzu.",
    disclaimer:
      "Mit dem Absenden stimmen Sie zu, dass Ihre Bewertung auf unserer Website veröffentlicht werden kann (mit Ihrer Erlaubnis). Cashback",
    disclaimerEnd:
      "ist nur für genehmigte Video-Bewertungen mit gesprochenem Inhalt verfügbar und wird innerhalb von 7-10 Werktagen bearbeitet.",
    errorReview: "Bitte schreiben Sie eine Bewertung",
    errorPhotoVideo: "Bitte laden Sie nur Fotos oder Videos hoch",
    errorFileSize: "Jede Datei muss kleiner als 100MB sein",
    errorGeneric: "Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.",
  },
  fr: {
    products: {
      splint: {
        name: "Attelle de nuit Achille",
        label: "🦶 Attelle de nuit",
        sublabel: "Attelle de récupération Achille",
      },
      course: {
        name: "Cours de récupération Achille",
        label: "📚 Cours de récupération",
        sublabel: "Guide de récupération en ligne",
      },
    },
    whatReviewing: "Que évaluez-vous ?",
    required: "*",
    name: "Nom",
    namePlaceholder: "Votre nom",
    email: "Email",
    emailPlaceholder: "votre@email.com",
    emailHelp: "Nous utiliserons ceci pour vous contacter concernant votre cashback",
    rating: "Note",
    yourReview: "Votre avis",
    reviewPlaceholder: "Partagez votre expérience avec",
    photosVideos: "Photos ou vidéos",
    cashbackLabel: "(cashback uniquement pour les vidéos avec contenu parlé)",
    uploadHelp: "Vous pouvez télécharger des",
    photosOrVideos: "photos ou vidéos",
    cashbackOnlyFor: "Le cashback n'est disponible que pour les avis vidéo avec contenu parlé",
    min10sec:
      "(minimum 10 secondes de parole). Les avis avec photos uniquement ne donnent pas droit au cashback.",
    filesSelected: "fichier(s) sélectionné(s)",
    videoEligible: "✓ La vidéo peut être éligible au cashback (si elle contient un avis parlé)",
    photosNoQualify: "⚠️ Les photos ne donnent pas droit au cashback",
    clickUpload: "Cliquez pour télécharger des photos ou vidéos",
    uploadFormats:
      "Photos : JPG, PNG • Vidéos : MP4, MOV (10+ sec pour cashback) • Max 100Mo chacun",
    cashbackOnlyVideos: "Cashback uniquement pour les vidéos avec avis parlé",
    submitReview: "Soumettre l'avis",
    submitting: "Envoi en cours...",
    thankYou: "Merci pour votre avis !",
    reviewSubmitted: "Votre avis a été soumis avec succès.",
    videoApprovalMsg:
      "Nous examinerons votre soumission dans les 3 à 5 jours ouvrables. Si votre vidéo comprend un avis parlé (10+ secondes), vous recevrez un email avec les instructions pour réclamer votre",
    cashback: "cashback",
    onceApproved: "une fois approuvé.",
    photoThankYou:
      "Merci pour vos photos ! Notez que le cashback n'est disponible que pour les avis vidéo avec contenu parlé. Nous examinerons votre soumission dans les 3 à 5 jours ouvrables.",
    noMediaThankYou:
      "Merci pour vos commentaires ! Pour gagner du cashback, assurez-vous d'inclure une vidéo avec un avis parlé (10+ secondes) dans vos futures soumissions.",
    disclaimer:
      "En soumettant, vous acceptez que votre avis puisse être présenté sur notre site web (avec votre permission). Le cashback",
    disclaimerEnd:
      "n'est disponible que pour les avis vidéo approuvés avec contenu parlé et sera traité dans les 7 à 10 jours ouvrables.",
    errorReview: "Veuillez écrire un avis",
    errorPhotoVideo: "Veuillez télécharger uniquement des photos ou vidéos",
    errorFileSize: "Chaque fichier doit faire moins de 100Mo",
    errorGeneric: "Une erreur s'est produite. Veuillez réessayer.",
  },
  es: {
    products: {
      splint: {
        name: "Férula nocturna de Aquiles",
        label: "🦶 Férula nocturna",
        sublabel: "Férula de recuperación de Aquiles",
      },
      course: {
        name: "Curso de recuperación de Aquiles",
        label: "📚 Curso de recuperación",
        sublabel: "Guía de recuperación en línea",
      },
    },
    whatReviewing: "¿Qué estás evaluando?",
    required: "*",
    name: "Nombre",
    namePlaceholder: "Tu nombre",
    email: "Email",
    emailPlaceholder: "tu@email.com",
    emailHelp: "Usaremos esto para contactarte sobre tu cashback",
    rating: "Calificación",
    yourReview: "Tu reseña",
    reviewPlaceholder: "Comparte tu experiencia con",
    photosVideos: "Fotos o videos",
    cashbackLabel: "(cashback solo para videos con contenido hablado)",
    uploadHelp: "Puedes subir",
    photosOrVideos: "fotos o videos",
    cashbackOnlyFor: "El cashback solo está disponible para reseñas en video con contenido hablado",
    min10sec:
      "(mínimo 10 segundos hablando). Las reseñas solo con fotos no califican para cashback.",
    filesSelected: "archivo(s) seleccionado(s)",
    videoEligible: "✓ El video puede ser elegible para cashback (si incluye reseña hablada)",
    photosNoQualify: "⚠️ Las fotos no califican para cashback",
    clickUpload: "Haz clic para subir fotos o videos",
    uploadFormats:
      "Fotos: JPG, PNG • Videos: MP4, MOV (10+ seg para cashback) • Máx 100MB cada uno",
    cashbackOnlyVideos: "Cashback solo para videos con reseña hablada",
    submitReview: "Enviar reseña",
    submitting: "Enviando...",
    thankYou: "¡Gracias por tu reseña!",
    reviewSubmitted: "Tu reseña ha sido enviada exitosamente.",
    videoApprovalMsg:
      "Revisaremos tu envío dentro de 3-5 días hábiles. Si tu video incluye una reseña hablada (10+ segundos), recibirás un email con instrucciones para reclamar tu",
    cashback: "cashback",
    onceApproved: "una vez aprobado.",
    photoThankYou:
      "¡Gracias por tus fotos! Ten en cuenta que el cashback solo está disponible para reseñas en video con contenido hablado. Revisaremos tu envío dentro de 3-5 días hábiles.",
    noMediaThankYou:
      "¡Gracias por tus comentarios! Para ganar cashback, asegúrate de incluir un video con reseña hablada (10+ segundos) en futuros envíos.",
    disclaimer:
      "Al enviar, aceptas que tu reseña puede aparecer en nuestro sitio web (con tu permiso). El cashback",
    disclaimerEnd:
      "solo está disponible para reseñas en video aprobadas con contenido hablado y se procesará dentro de 7-10 días hábiles.",
    errorReview: "Por favor escribe una reseña",
    errorPhotoVideo: "Por favor sube solo fotos o videos",
    errorFileSize: "Cada archivo debe ser menor de 100MB",
    errorGeneric: "Algo salió mal. Por favor intenta de nuevo.",
  },
  it: {
    products: {
      splint: {
        name: "Tutore notturno Achille",
        label: "🦶 Tutore notturno",
        sublabel: "Tutore di recupero Achille",
      },
      course: {
        name: "Corso di recupero Achille",
        label: "📚 Corso di recupero",
        sublabel: "Guida di recupero online",
      },
    },
    whatReviewing: "Cosa stai recensendo?",
    required: "*",
    name: "Nome",
    namePlaceholder: "Il tuo nome",
    email: "Email",
    emailPlaceholder: "tua@email.com",
    emailHelp: "Useremo questa per contattarti riguardo al tuo cashback",
    rating: "Valutazione",
    yourReview: "La tua recensione",
    reviewPlaceholder: "Condividi la tua esperienza con",
    photosVideos: "Foto o video",
    cashbackLabel: "(cashback solo per video con contenuto parlato)",
    uploadHelp: "Puoi caricare",
    photosOrVideos: "foto o video",
    cashbackOnlyFor: "Il cashback è disponibile solo per le recensioni video con contenuto parlato",
    min10sec:
      "(minimo 10 secondi di parlato). Le recensioni solo con foto non danno diritto al cashback.",
    filesSelected: "file selezionato/i",
    videoEligible:
      "✓ Il video potrebbe essere idoneo per il cashback (se include una recensione parlata)",
    photosNoQualify: "⚠️ Le foto non danno diritto al cashback",
    clickUpload: "Clicca per caricare foto o video",
    uploadFormats: "Foto: JPG, PNG • Video: MP4, MOV (10+ sec per cashback) • Max 100MB ciascuno",
    cashbackOnlyVideos: "Cashback solo per video con recensione parlata",
    submitReview: "Invia recensione",
    submitting: "Invio in corso...",
    thankYou: "Grazie per la tua recensione!",
    reviewSubmitted: "La tua recensione è stata inviata con successo.",
    videoApprovalMsg:
      "Esamineremo il tuo invio entro 3-5 giorni lavorativi. Se il tuo video include una recensione parlata (10+ secondi), riceverai un'email con le istruzioni per richiedere il tuo",
    cashback: "cashback",
    onceApproved: "una volta approvato.",
    photoThankYou:
      "Grazie per le tue foto! Nota che il cashback è disponibile solo per le recensioni video con contenuto parlato. Esamineremo il tuo invio entro 3-5 giorni lavorativi.",
    noMediaThankYou:
      "Grazie per il tuo feedback! Per guadagnare cashback, assicurati di includere un video con recensione parlata (10+ secondi) nei futuri invii.",
    disclaimer:
      "Inviando, accetti che la tua recensione possa essere pubblicata sul nostro sito web (con il tuo permesso). Il cashback",
    disclaimerEnd:
      "è disponibile solo per le recensioni video approvate con contenuto parlato e sarà elaborato entro 7-10 giorni lavorativi.",
    errorReview: "Per favore scrivi una recensione",
    errorPhotoVideo: "Per favore carica solo foto o video",
    errorFileSize: "Ogni file deve essere inferiore a 100MB",
    errorGeneric: "Qualcosa è andato storto. Per favore riprova.",
  },
};

interface LeaveReviewFormProps {
  lang?: Lang;
}

export function LeaveReviewForm({ lang = "en" }: LeaveReviewFormProps) {
  const t = translations[lang] || translations.en;
  const [product, setProduct] = useState<ProductType>("splint");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [currency, setCurrency] = useState({ symbol: "£", amount: "10" });

  // Check URL params for product selection and detect currency
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productParam = params.get("product");
    if (productParam === "course" || productParam === "splint") {
      setProduct(productParam);
    }

    // Detect currency
    getCurrency().then((curr) => {
      setCurrency(curr);
    });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    // Validate files - accept both photos and videos
    for (const file of selectedFiles) {
      const isVideo = file.type.startsWith("video/");
      const isImage = file.type.startsWith("image/");

      if (!isVideo && !isImage) {
        setError(t.errorPhotoVideo);
        return;
      }

      if (file.size > 100 * 1024 * 1024) {
        setError(t.errorFileSize);
        return;
      }
    }

    setFiles(selectedFiles);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!reviewText.trim()) {
      setError(t.errorReview);
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("_subject", `New ${t.products[product].name} Review from ${name}`);
      formData.append("product", t.products[product].name);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("rating", rating.toString());
      formData.append("review", reviewText);

      // Determine media type and cashback eligibility
      const hasVideos = files.some((f) => f.type.startsWith("video/"));
      const hasPhotos = files.some((f) => f.type.startsWith("image/"));
      let mediaStatus = "No media";
      if (hasVideos && hasPhotos) {
        mediaStatus = "Videos and photos - cashback eligible if video has spoken review";
      } else if (hasVideos) {
        mediaStatus = "Videos only - cashback eligible if video has spoken review";
      } else if (hasPhotos) {
        mediaStatus = "Photos only - not eligible for cashback";
      }
      formData.append("has_media", mediaStatus);

      // Attach files to the form
      files.forEach((file, index) => {
        formData.append(`file_${index + 1}`, file);
      });

      const response = await fetch("https://formspree.io/f/mnjpalkk", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errorGeneric);
      console.error("Error submitting review:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-primary/10 dark:bg-primary/20 p-8 border border-primary/20 dark:border-primary/30 rounded-lg text-center">
        <Check className="mx-auto mb-4 w-12 h-12 text-primary" />
        <p className="mb-2 font-semibold text-neutral-900 dark:text-neutral-100 text-lg">
          {t.thankYou}
        </p>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300">{t.reviewSubmitted}</p>
        {files.some((f) => f.type.startsWith("video/")) ? (
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            {t.videoApprovalMsg}{" "}
            <strong>
              {currency.symbol}
              {currency.amount} {t.cashback}
            </strong>{" "}
            {t.onceApproved}
          </p>
        ) : files.length > 0 ? (
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">{t.photoThankYou}</p>
        ) : (
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">{t.noMediaThankYou}</p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Product Selector */}
      <div>
        <label className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100">
          {t.whatReviewing} <span className="text-red-500">{t.required}</span>
        </label>
        <div className="gap-4 grid grid-cols-2">
          <button
            type="button"
            onClick={() => setProduct("splint")}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              product === "splint"
                ? "border-primary bg-primary/5 dark:bg-primary/10"
                : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300"
            }`}
          >
            <div className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
              {t.products.splint.label}
            </div>
            <div className="mt-1 text-neutral-500 dark:text-neutral-400 text-xs">
              {t.products.splint.sublabel}
            </div>
          </button>
          <button
            type="button"
            onClick={() => setProduct("course")}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              product === "course"
                ? "border-primary bg-primary/5 dark:bg-primary/10"
                : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300"
            }`}
          >
            <div className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
              {t.products.course.label}
            </div>
            <div className="mt-1 text-neutral-500 dark:text-neutral-400 text-xs">
              {t.products.course.sublabel}
            </div>
          </button>
        </div>
      </div>

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100"
        >
          {t.name} <span className="text-red-500">{t.required}</span>
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-white dark:bg-neutral-800 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full text-neutral-900 dark:text-neutral-100"
          placeholder={t.namePlaceholder}
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100"
        >
          {t.email} <span className="text-red-500">{t.required}</span>
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="bg-white dark:bg-neutral-800 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full text-neutral-900 dark:text-neutral-100"
          placeholder={t.emailPlaceholder}
        />
        <p className="mt-1 text-neutral-500 dark:text-neutral-400 text-sm">{t.emailHelp}</p>
      </div>

      {/* Rating */}
      <div>
        <label className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100">
          {t.rating} <span className="text-red-500">{t.required}</span>
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="p-1 hover:scale-110 transition-transform"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-neutral-300 dark:text-neutral-600"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Review Text */}
      <div>
        <label
          htmlFor="review"
          className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100"
        >
          {t.yourReview} <span className="text-red-500">{t.required}</span>
        </label>
        <textarea
          id="review"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
          rows={5}
          className="bg-white dark:bg-neutral-800 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full text-neutral-900 dark:text-neutral-100"
          placeholder={`${t.reviewPlaceholder} ${t.products[product].name}...`}
        />
      </div>

      {/* File Upload */}
      <div>
        <label
          htmlFor="files"
          className="block mb-2 font-medium text-neutral-900 dark:text-neutral-100"
        >
          {t.photosVideos} <span className="font-normal text-primary">{t.cashbackLabel}</span>
        </label>
        <p className="mb-2 text-neutral-500 dark:text-neutral-400 text-sm">
          {t.uploadHelp} <strong>{t.photosOrVideos}</strong>. <strong>{t.cashbackOnlyFor}</strong>{" "}
          {t.min10sec}
        </p>
        <div className="relative">
          <input
            id="files"
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            multiple
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          />
          <div className="flex justify-center items-center bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 px-4 py-8 border-2 border-neutral-300 focus-within:border-primary dark:border-neutral-700 border-dashed rounded-lg focus-within:ring-2 focus-within:ring-primary transition-colors">
            {files.length > 0 ? (
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  {files.some((f) => f.type.startsWith("video/")) ? (
                    <Video className="w-6 h-6 text-primary" />
                  ) : (
                    <Image className="w-6 h-6 text-primary" />
                  )}
                </div>
                <p className="font-medium text-neutral-900 dark:text-neutral-100">
                  {files.length} {t.filesSelected}
                </p>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                  {files.map((f) => f.name).join(", ")}
                </p>
                {files.some((f) => f.type.startsWith("video/")) ? (
                  <p className="mt-2 font-medium text-primary text-xs">{t.videoEligible}</p>
                ) : (
                  <p className="mt-2 font-medium text-neutral-500 dark:text-neutral-400 text-xs">
                    {t.photosNoQualify}
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center">
                <div className="flex justify-center gap-3 mb-2">
                  <Image className="w-8 h-8 text-neutral-400" />
                  <Video className="w-8 h-8 text-neutral-400" />
                </div>
                <p className="font-medium text-neutral-900 dark:text-neutral-100">
                  {t.clickUpload}
                </p>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm">{t.uploadFormats}</p>
                <p className="mt-2 font-medium text-primary text-xs">{t.cashbackOnlyVideos}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2 bg-red-50 dark:bg-red-900/20 p-3 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle className="mt-0.5 w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
          <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
        </div>
      )}

      <Button type="submit" size="lg" className="gap-2 w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {t.submitting}
          </>
        ) : (
          <>
            <Star className="w-4 h-4" />
            {t.submitReview}
          </>
        )}
      </Button>

      <p className="text-neutral-500 dark:text-neutral-400 text-xs text-center">
        {t.disclaimer} ({currency.symbol}
        {currency.amount}) {t.disclaimerEnd}
      </p>
    </form>
  );
}
