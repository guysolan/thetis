import type { SectionContent } from "@/components/course/types";

export const metadata = {
    slug: "appendix-1-faqs",
    title: "Appendix 1: Course FAQs",
    description:
        "All frequently asked questions from the course, organized by lesson",
    status: "drafting" as const,
};

export const content: SectionContent = {
    intro:
        "This appendix collects key FAQs from each lesson in one place. Use it as a quick reference — or visit the relevant lesson for full context. Questions are organized by the lesson they appear in. More FAQs are available in each lesson.",
    blocks: [
        {
            type: "heading",
            level: 2,
            text: "Practical & Throughout Recovery",
        },
        {
            type: "heading",
            level: 3,
            text: "From: First Week Checklist",
        },
        {
            type: "faq",
            items: [
                {
                    question: "Is it normal that the pain reduced quickly?",
                    answer:
                        "Yes. The rupture itself can be extremely painful, but pain often settles quickly. That doesn't mean it's minor — the tendon is still ruptured and needs protection.",
                },
                {
                    question: "What if I accidentally put weight on my foot?",
                    answer:
                        "A brief accidental touch-down is common. Don't panic. Re-focus on your instructions. If you had a significant fall or you felt a new pop with sudden worsening pain/function, contact your team urgently.",
                },
                {
                    question: "When can I drive / go back to work?",
                    answer:
                        "Driving: not yet — we cover this in a later section. Work: depends on your job. Desk jobs can sometimes resume early (with adjustments); physical roles take longer. Ask your clinician for a timeline.",
                },
            ],
        },
        {
            type: "heading",
            level: 3,
            text: "From: Driving Guidelines",
        },
        {
            type: "faq",
            items: [
                {
                    question: "When can I drive after Achilles rupture?",
                    answer:
                        "It depends on which leg is injured. Right leg injured: Week 10-12 earliest (after boot removal, automatic car). Left leg injured: Potentially weeks 4-6 with automatic car, if cleared by your clinician. Always check with your insurance company and get medical clearance first.",
                },
                {
                    question: "Can I drive while wearing my boot?",
                    answer:
                        "If your right leg is injured, no — you cannot drive while wearing the boot. If your left leg is injured and you have an automatic car, it may be possible, but you must be cleared by your clinician and insurance company.",
                },
            ],
        },
        {
            type: "heading",
            level: 3,
            text: "From: Returning to Normal Life",
        },
        {
            type: "faq",
            items: [
                {
                    question: "When can I return to work?",
                    answer:
                        "Desk jobs: usually **Week 2-6** with care team approval — many return as early as Week 2 if they can sit comfortably. Physical or active jobs: usually **Week 6+** with modified duties initially. Always follow your care team's advice.",
                },
                {
                    question: "When can I travel for work?",
                    answer:
                        "Desk-based travel (flights, meetings) may be possible Week 2-6 with care team approval — elevate your foot when possible, take breaks. Active travel (site visits, lots of walking) usually needs Week 6+. See [Driving Guidelines](/standard/driving-guidelines) for when you can drive.",
                },
            ],
        },
        {
            type: "heading",
            level: 2,
            text: "Emergency & Early Treatment",
        },
        {
            type: "heading",
            level: 3,
            text: "From: Blood Clot Prevention",
        },
        {
            type: "faq",
            items: [
                {
                    question: "Is swelling normal, or is it a clot?",
                    answer:
                        "Swelling is common after rupture and immobilisation. What's more concerning is **new** calf pain/tenderness, **one-leg** swelling that's noticeably worsening, or calf redness/warmth — especially if it feels different from your usual ankle swelling. When in doubt, get checked.",
                },
            ],
        },
        {
            type: "heading",
            level: 3,
            text: "From: Treatment Decision",
        },
        {
            type: "faq",
            items: [
                {
                    question: "Will I recover faster with surgery?",
                    answer:
                        "The UKSTAR trial showed very similar recovery timelines. Some studies suggest surgery patients may return to work slightly earlier, but overall recovery time (6–12 months) is similar.",
                },
            ],
        },
        {
            type: "heading",
            level: 2,
            text: "Boot Phase",
        },
        {
            type: "heading",
            level: 3,
            text: "From: Boot Progression Protocol",
        },
        {
            type: "faq",
            items: [
                {
                    question: "Can I progress faster than my protocol says?",
                    answer:
                        "No. Even if you feel fine, the tendon needs time to heal at each stage. Rushing ahead is one of the most common causes of re-rupture or tendon elongation. Follow your protocol exactly.",
                },
            ],
        },
        {
            type: "heading",
            level: 3,
            text: "From: Sleeping with Your Boot",
        },
        {
            type: "faq",
            items: [
                {
                    question: "Can I take the boot off to sleep if I use a night splint?",
                    answer:
                        "Usually yes, but check with your clinician first. Most protocols allow a night splint once you're past the very early stage (usually after week 2–3). The splint must maintain the correct angle.",
                },
            ],
        },
        {
            type: "heading",
            level: 2,
            text: "Physiotherapy & Recovery",
        },
        {
            type: "heading",
            level: 3,
            text: "From: Starting Physiotherapy",
        },
        {
            type: "faq",
            items: [
                {
                    question: "How often should I go to physio?",
                    answer:
                        "Frequency varies by protocol and needs. Some go once a week, others twice a week initially. Most important is doing your home exercises consistently — that's where most of your progress happens.",
                },
                {
                    question: "How long will Stage 2 take?",
                    answer:
                        "Stage 2 typically takes 2-4 weeks (weeks 10-12). But progress varies — some people move faster, others slower. Focus on meeting criteria rather than timelines.",
                },
            ],
        },
        {
            type: "heading",
            level: 3,
            text: "From: Key Exercises",
        },
        {
            type: "faq",
            items: [
                {
                    question: "How many times a day should I do these exercises?",
                    answer:
                        "Most exercises are done once a day, but your physiotherapist will give you a specific program. Consistency matters more than frequency — doing exercises daily is better than doing them multiple times but inconsistently.",
                },
            ],
        },
        {
            type: "heading",
            level: 3,
            text: "From: Building Cardio",
        },
        {
            type: "faq",
            items: [
                {
                    question: "When can I start swimming after Achilles rupture?",
                    answer:
                        "Typically week 12-14, after boot removal and when your clinician clears you. Pool walking may start earlier (week 10-12) with approval. For surgical patients, wounds must be fully closed.",
                },
                {
                    question: "When can I start running?",
                    answer:
                        "Running typically starts around 4-6 months after injury, but it's criteria-based, not time-based. You need to meet certain strength and function goals first (like 25+ single-leg heel raises).",
                },
            ],
        },
        {
            type: "heading",
            level: 2,
            text: "Advanced & Long-Term",
        },
        {
            type: "heading",
            level: 3,
            text: "From: Plyometrics",
        },
        {
            type: "faq",
            items: [
                {
                    question: "When can I start plyometrics?",
                    answer:
                        "When you meet the criteria: 25+ single-leg heel raises, good balance, no pain, and physio clearance. Simple plyometrics (pogo jumps, two-foot jumps) often **start alongside running** — not only after running is fully established.",
                },
            ],
        },
        {
            type: "heading",
            level: 3,
            text: "From: Return to Sport",
        },
        {
            type: "faq",
            items: [
                {
                    question: "When can I return to sport?",
                    answer:
                        "When you meet return-to-sport criteria: 85% symmetry in strength, hopping, and jumping; 25+ heel raises; pain-free activities; good balance; and physio clearance. This is typically around 7-9 months, but it's criteria-based, not time-based.",
                },
            ],
        },
        {
            type: "heading",
            level: 3,
            text: "From: Preventing Re-Rupture",
        },
        {
            type: "faq",
            items: [
                {
                    question: "What's my risk of re-rupture?",
                    answer:
                        "Overall re-rupture risk is 3-5%. Risk is highest during early rehab and boot removal, but ongoing risk requires ongoing prevention. Maintaining strength, proper warm-ups, and gradual progression reduce risk significantly.",
                },
            ],
        },
        {
            type: "alert",
            variant: "info",
            title: "Full context",
            content:
                "Each FAQ appears in its original lesson with full context. Use this appendix as a quick reference — for detailed guidance, visit the relevant lesson.",
        },
    ],
};
