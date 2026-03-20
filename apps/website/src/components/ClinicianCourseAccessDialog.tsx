"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@thetis/ui/dialog";
import { Button } from "@/components/ui/button";

const FORMSPREE_FORM_ID = "mzdawror";

interface ClinicianCourseAccessDialogProps {
  triggerLabel: string;
  title: string;
  description: string;
  nameLabel: string;
  emailLabel: string;
  submitLabel: string;
  redirectUrl?: string;
}

const inputStyle =
  "rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base focus:border-primary focus:ring-1 focus:ring-primary w-full";

export default function ClinicianCourseAccessDialog({
  triggerLabel,
  title,
  description,
  nameLabel,
  emailLabel,
  submitLabel,
  redirectUrl,
}: ClinicianCourseAccessDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="font-medium">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-neutral-900 max-w-md">
        <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
        <DialogDescription className="text-neutral-600 dark:text-neutral-400 text-sm">
          {description}
        </DialogDescription>
        <form
          action={`https://formspree.io/f/${FORMSPREE_FORM_ID}`}
          method="POST"
          className="mt-4 space-y-4"
        >
          {redirectUrl ? <input type="hidden" name="_next" value={redirectUrl} /> : null}
          <input type="hidden" name="_subject" value="Clinician course access request" />
          <div>
            <label
              htmlFor="clinician-name"
              className="block font-semibold text-sm text-neutral-700 dark:text-neutral-300 mb-1"
            >
              {nameLabel}
            </label>
            <input
              id="clinician-name"
              type="text"
              name="name"
              className={inputStyle}
              autoComplete="name"
            />
          </div>
          <div>
            <label
              htmlFor="clinician-email"
              className="block font-semibold text-sm text-neutral-700 dark:text-neutral-300 mb-1"
            >
              {emailLabel}
            </label>
            <input
              id="clinician-email"
              type="email"
              name="email"
              required
              className={inputStyle}
              autoComplete="email"
            />
          </div>
          <Button type="submit" className="w-full">
            {submitLabel}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
