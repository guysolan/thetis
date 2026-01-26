import * as React from "react";
import { PlainTextEmail } from "../../../components/plain-text-email";

export const MyEmail = ({ firstName = "", clinic = "" }) => {
  return (
    <PlainTextEmail
      subject="Quick question about Achilles recovery at {clinic}"
      body={`
Hi ${firstName},

I noticed you were interested in our Achilles night splint. Many surgeons tell me their patients struggle to sleep in walking boots - one surgeon called it "like trying to sleep wearing rain boots" 😅

Would you be open to trying a specialized night splint designed specifically for Achilles rupture patients? I can send you a sample to evaluate with your next patient.

Just reply "yes" if you'd like to try it out.

Best,
[Your name]

P.S. It's already helping patients sleep better at Mayo Clinic, HSS, and other leading institutions.
      `}
    />
  );
};

export default MyEmail;
