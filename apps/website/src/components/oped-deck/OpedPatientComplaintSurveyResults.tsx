import { Badge } from "@thetis/ui/badge";
import { Droplets, Flame, Moon, Weight } from "lucide-react";
import {
  opedPitchPatientComplaint,
} from "@/features/oped-deck/opedDeckPitchContent";

const themeIcons = {
  hot: Flame,
  heavy: Weight,
  uncomfortable: Moon,
  unhygienic: Droplets,
} as const;

export default function OpedPatientComplaintSurveyResults() {
  const { surveyLead, complaintThemes } = opedPitchPatientComplaint;

  return (
    <div className="space-y-3 mx-auto mb-10 md:mb-12 max-w-3xl text-center">
      <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg leading-snug">
        {surveyLead}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {complaintThemes.map((theme) => {
          const Icon = themeIcons[theme.id];
          return (
            <Badge
              key={theme.id}
              variant="secondary"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm normal-case tracking-normal"
            >
              <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden />
              {theme.label}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
