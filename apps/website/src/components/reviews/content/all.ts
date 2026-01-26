import { athletes } from "./athletes";
import { translatedClinicians } from "./professional-opinions";
import { patients } from "./patients";

// This file is now mainly for backward compatibility
// The ReviewsMasonry component handles multilingual content directly

// Convert athletes to match Review type (adding missing fields)
const a = athletes.map((athlete) => ({
    ...athlete,
    type: "athlete",
    link: "",
    clinics: [],
    clinicImages: [],
    date: "2024-01-01", // Default date
}));

// Convert clinicians to match Review type
const c = translatedClinicians.map((clinician) => ({
    ...clinician,
    type: "clinician",
    // Use English content as default for the main review structure
    description: clinician.content.en.description,
    title: clinician.content.en.title,
    short: clinician.content.en.short,
    body: clinician.content.en.body,
}));

// Convert patients to match Review type (adding missing fields)
const p = patients.map((patient) => ({
    ...patient,
    type: "patient",
    link: "",
    clinics: [],
    clinicImages: [],
}));

export const reviews = [...a, ...c, ...p];
