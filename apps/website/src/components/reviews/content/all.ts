import { athletes } from "./athletes";
import { clinicians } from "./clinicians";
import { patients } from "./patients";

const a = athletes.map((athlete) => ({ ...athlete, type: "athlete" }));
const c = clinicians.map((clinician) => ({ ...clinician, type: "clinician" }));
const p = patients.map((patient) => ({ ...patient, type: "patient" }));

export const reviews = [...a, ...c, ...p];
