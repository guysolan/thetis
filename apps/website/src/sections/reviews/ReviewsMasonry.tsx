import React, { useEffect, useState } from "react";
import { athletes } from "../../components/reviews/content/athletes";
import { translatedClinicians } from "../../components/reviews/content/professional-opinions";
import { patients } from "../../components/reviews/content/patients";
import { ReviewCard } from "../../components/reviews/ReviewCard";
import { Button } from "../../components/ui/button";
import { Shuffle } from "lucide-react";
import type { Lang } from "../../config/languages";

interface Props {
  lang?: Lang;
}

const ReviewsMasonry = ({ lang = "en" }: Props) => {
  const [v_displayCount, setDisplayCount] = useState(9);
  const [v_activeFilter, setActiveFilter] = useState<
    "all" | "athlete" | "clinician" | "patient"
  >(() => {
    const params = new URLSearchParams(window.location.search);
    return (
      (params.get("filter") as "all" | "athlete" | "clinician" | "patient") ||
      "all"
    );
  });

  const content = {
    en: {
      title: "Hear it from the horse's mouth...",
      all: "All",
      athletes: "Athletes",
      clinicians: "Clinicians",
      patients: "Patients",
      shuffle: "Shuffle",
      showMore: "Show More",
    },
    es: {
      title: "Escúchalo de primera mano...",
      all: "Todos",
      athletes: "Atletas",
      clinicians: "Médicos",
      patients: "Pacientes",
      shuffle: "Mezclar",
      showMore: "Mostrar Más",
    },
    fr: {
      title: "Écoutez-le de la bouche du cheval...",
      all: "Tous",
      athletes: "Athlètes",
      clinicians: "Cliniciens",
      patients: "Patients",
      shuffle: "Mélanger",
      showMore: "Afficher Plus",
    },
    de: {
      title: "Hören Sie es aus erster Hand...",
      all: "Alle",
      athletes: "Athleten",
      clinicians: "Kliniker",
      patients: "Patienten",
      shuffle: "Mischen",
      showMore: "Mehr Anzeigen",
    },
    it: {
      title: "Ascoltalo dalla bocca del cavallo...",
      all: "Tutti",
      athletes: "Atleti",
      clinicians: "Medici",
      patients: "Pazienti",
      shuffle: "Mescola",
      showMore: "Mostra di Più",
    },
  };

  const currentContent = content[lang];

  // Create multilingual reviews by combining all sources
  const createMultilingualReviews = () => {
    // Athletes (currently only in English, but we can add translations later)
    const athleteReviews = athletes.map((athlete) => ({
      ...athlete,
      type: "athlete" as const,
      link: "",
      clinics: [],
      clinicImages: [],
      date: "2024-01-01",
      // For now, use English content for all languages
      // TODO: Add translations for athletes
    }));

    // Clinicians (already multilingual)
    const clinicianReviews = translatedClinicians.map((clinician) => ({
      ...clinician,
      type: "clinician" as const,
      // Use the translated content for the current language
      description: clinician.content[lang]?.description ||
        clinician.content.en.description,
      title: clinician.content[lang]?.title || clinician.content.en.title,
      short: clinician.content[lang]?.short || clinician.content.en.short,
      body: clinician.content[lang]?.body || clinician.content.en.body,
    }));

    // Patients (currently only in English, but we can add translations later)
    const patientReviews = patients.map((patient) => ({
      ...patient,
      type: "patient" as const,
      link: "",
      clinics: [],
      clinicImages: [],
      // For now, use English content for all languages
      // TODO: Add translations for patients
    }));

    return [...athleteReviews, ...clinicianReviews, ...patientReviews];
  };

  const [v_shuffledReviews, setShuffledReviews] = useState(
    createMultilingualReviews(),
  );

  // Update reviews when language changes
  useEffect(() => {
    setShuffledReviews(createMultilingualReviews());
  }, [lang]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("filter", v_activeFilter);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`,
    );
  }, [v_activeFilter]);

  const handleShuffle = () => {
    setShuffledReviews((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  const handleShowMore = () => {
    setDisplayCount(v_displayCount + 9);
  };

  const v_filteredReviews = v_shuffledReviews.filter(
    (review) => v_activeFilter === "all" || review.type === v_activeFilter,
  );

  return (
    <section id="more-reviews">
      <div className="left-0 relative flex flex-col justify-center items-center p-4 md:p-8 w-[100vw] overflow-hidden antialiased">
        <h1 className="mb-4 font-semibold text-neutral-900 text-3xl text-center">
          {currentContent.title}
        </h1>

        <div className="flex flex-wrap justify-center items-center gap-2 my-4 px-4">
          <Button
            onClick={() => setActiveFilter("all")}
            variant={v_activeFilter === "all" ? "default" : "outline"}
          >
            {currentContent.all}
          </Button>
          <Button
            onClick={() => setActiveFilter("athlete")}
            variant={v_activeFilter === "athlete" ? "default" : "outline"}
          >
            {currentContent.athletes}
          </Button>
          <Button
            onClick={() => setActiveFilter("clinician")}
            variant={v_activeFilter === "clinician" ? "default" : "outline"}
          >
            {currentContent.clinicians}
          </Button>
          <Button
            onClick={() => setActiveFilter("patient")}
            variant={v_activeFilter === "patient" ? "default" : "outline"}
          >
            {currentContent.patients}
          </Button>
          <Button onClick={handleShuffle} variant="secondary" className="gap-2">
            <span className="sr-only font-semibold">
              {currentContent.shuffle}
            </span>
            <Shuffle size={20} />
          </Button>
        </div>

        <div className="z-10 relative masonry-grid py-8">
          {v_filteredReviews.slice(0, v_displayCount).map((review, index) => (
            <div
              className="masonry-item"
              key={`${review.name}-${review.type}-${index}`}
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
        {v_displayCount < v_filteredReviews.length && (
          <Button type="button" onClick={handleShowMore}>
            {currentContent.showMore}
          </Button>
        )}
      </div>
      <style>
        {`
          .masonry-grid {
            columns: 1;
            column-gap: 1rem;
            width: 100%;
          }

          .masonry-grid > div {
            margin-bottom: 1rem;
            break-inside: avoid;
          }

          @media (min-width: 750px) {
            .masonry-grid {
              columns: 2;
            }
          }

          @media (min-width: 900px) {
            .masonry-grid {
              columns: 3;
            }
          }
        `}
      </style>
    </section>
  );
};

export default ReviewsMasonry;
