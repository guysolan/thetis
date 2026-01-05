import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Play, Star, User, Video } from "lucide-react";
import { WEBSITE_URL } from "@/lib/env";

export const Route = createFileRoute("/premium/")({
  component: PremiumIndexPage,
});

// Premium video lessons - expert-led deep dives
const videoLessons = [
  {
    id: 1,
    title: "Surgery vs Conservative Treatment: Making the Right Decision",
    instructor: "Orthopaedic Surgeon",
    instructorType: "surgeon",
    duration: "18-20 min",
    phase: "Weeks 1-3",
    description:
      "When is surgery truly necessary? When does conservative treatment work best? A specialist surgeon explains the UKSTAR trial findings, gap size interpretation, and how to make an informed decision.",
    topics: [
      "Understanding gap size on ultrasound",
      "When surgery is recommended vs optional",
      "Conservative treatment success factors",
      "Risk-benefit analysis",
      "Questions to ask your specialist",
    ],
  },
  {
    id: 2,
    title: "Understanding Your Healing Tendon: The Biology Behind Recovery",
    instructor: "Orthopaedic Surgeon",
    instructorType: "surgeon",
    duration: "15-18 min",
    phase: "Weeks 4-6",
    description:
      "What's actually happening inside your tendon? Learn about the proliferative phase, collagen formation, and why proper positioning is critical to prevent permanent tendon elongation.",
    topics: [
      "Tendon healing phases explained",
      "Why elongation happens and how to prevent it",
      "The danger of cutting corners",
      "Understanding tendon strength progression",
      "What 'normal' healing looks like",
    ],
  },
  {
    id: 3,
    title: "Preparing for Rehabilitation: Setting Yourself Up for Success",
    instructor: "Orthopaedic Surgeon",
    instructorType: "surgeon",
    duration: "12-15 min",
    phase: "Weeks 7-9",
    description:
      "The final boot phase is critical. Learn what to expect as you approach boot removal, how to monitor your progress, and what NOT to do before starting physiotherapy.",
    topics: [
      "Remodelling phase explained",
      "Tendon strength at week 9",
      "Preparing for boot removal",
      "Common mistakes to avoid",
      "When to start physiotherapy",
    ],
  },
  {
    id: 4,
    title: "Starting Physiotherapy Right: Key Exercises and Common Mistakes",
    instructor: "Specialist Physiotherapist",
    instructorType: "physio",
    duration: "18-20 min",
    phase: "Weeks 10-12",
    description:
      "Your first weeks out of the boot are crucial. A specialist physio guides you through essential early exercises, proper technique, and the mistakes that can set you back.",
    topics: [
      "First exercises after boot removal",
      "Proper heel raise technique",
      "Common early mistakes",
      "Managing stiffness and swelling",
      "Progression principles",
    ],
  },
  {
    id: 5,
    title:
      "Progressive Strengthening Protocols: Evidence-Based Exercise Progressions",
    instructor: "Specialist Physiotherapist",
    instructorType: "physio",
    duration: "20-22 min",
    phase: "Weeks 13-25",
    description:
      "The longest phase of recovery requires smart progression. Learn evidence-based exercise protocols, loading principles, and how to build strength safely without overdoing it.",
    topics: [
      "Single-leg heel raise progression",
      "Loading principles (Goldilocks zone)",
      "Building endurance safely",
      "When to progress vs when to hold",
      "Functional milestone targets",
    ],
  },
  {
    id: 6,
    title: "Return to Sport Assessment: When Are You Truly Ready?",
    instructor: "Specialist Physiotherapist",
    instructorType: "physio",
    duration: "16-18 min",
    phase: "Week 26+",
    description:
      "Returning to sport is about criteria, not calendar dates. Learn the strength tests, hop tests, and functional assessments that determine if you're ready to return safely.",
    topics: [
      "Strength benchmarks for return",
      "Hop and jump test criteria",
      "Running progression protocols",
      "Sport-specific considerations",
      "Red flags to watch for",
    ],
  },
  {
    id: 7,
    title: "Preventing Re-rupture: Long-Term Risk Management",
    instructor: "Orthopaedic Surgeon",
    instructorType: "surgeon",
    duration: "12-15 min",
    phase: "Ongoing",
    description:
      "Once you've recovered, how do you stay recovered? Learn about long-term risk factors, warning signs, and strategies to protect your healed tendon for life.",
    topics: [
      "Re-rupture risk factors",
      "Warning signs to watch for",
      "Long-term tendon care",
      "When to seek help",
      "Maintaining strength long-term",
    ],
  },
  {
    id: 8,
    title: "Recovery Hacks from Elite Athletes: Practical Tips That Work",
    instructor: "Elite Sports Physiotherapist",
    instructorType: "physio",
    duration: "10-12 min",
    phase: "Throughout Recovery",
    description:
      "Learn from those who've been through it and recovered successfully. Practical tips, mental strategies, and recovery hacks from elite athletes and their physios.",
    topics: [
      "Sleep optimization strategies",
      "Pain management techniques",
      "Mental resilience tips",
      "Equipment recommendations",
      "Time-saving recovery hacks",
    ],
  },
];

function PremiumIndexPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto px-4 sm:px-6 py-16 max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-12 text-muted-foreground hover:text-foreground text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Programs
        </Link>

        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 mb-4 px-3 py-1 rounded-full font-medium text-primary text-sm">
            <Star className="fill-current w-4 h-4 text-primary" />
            Premium Course
          </div>
          <h1 className="mb-4 font-bold text-foreground text-3xl md:text-5xl tracking-tight">
            Achilles Recovery <span className="text-primary">Premium</span>
          </h1>
          <p className="mb-6 max-w-2xl text-muted-foreground text-lg md:text-xl">
            Everything in Standard, plus 8 expert-led video lessons from
            specialist surgeons and physios. Deep dives into the most critical
            decision points and recovery strategies.
          </p>
        </div>

        {/* Video Lessons List */}
        <div className="space-y-6">
          {videoLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="group relative bg-card hover:bg-muted/50 p-6 border border-border hover:border-primary/30 rounded-2xl transition-all"
            >
              <div className="flex sm:flex-row flex-col gap-6">
                {/* Video Thumbnail/Icon */}
                <div className="flex justify-center items-center bg-primary/10 group-hover:bg-primary/20 rounded-xl w-full sm:w-32 h-32 transition-colors shrink-0">
                  <div className="flex flex-col items-center gap-2">
                    <Video className="w-8 h-8 text-primary" />
                    <span className="font-medium text-primary text-xs">
                      {lesson.duration}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex justify-center items-center bg-primary rounded-lg w-8 h-8 font-bold text-primary-foreground text-sm">
                        {lesson.id}
                      </div>
                      <span className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                        {lesson.phase}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      {lesson.instructorType === "surgeon"
                        ? <User className="w-3.5 h-3.5" />
                        : <Video className="w-3.5 h-3.5" />}
                      <span className="text-xs">{lesson.instructor}</span>
                    </div>
                  </div>

                  <h3 className="mb-2 font-bold text-foreground group-hover:text-primary text-lg transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="mb-4 text-muted-foreground text-sm leading-relaxed">
                    {lesson.description}
                  </p>

                  {/* Topics Covered */}
                  <div className="flex flex-wrap gap-2">
                    {lesson.topics.slice(0, 3).map((topic, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-muted-foreground text-xs"
                      >
                        <Clock className="w-3 h-3" />
                        {topic}
                      </span>
                    ))}
                    {lesson.topics.length > 3 && (
                      <span className="inline-flex items-center bg-muted px-2 py-1 rounded-md text-muted-foreground text-xs">
                        +{lesson.topics.length - 3} more topics
                      </span>
                    )}
                  </div>
                </div>

                {/* Play Button */}
                <div className="flex items-center">
                  <div className="flex justify-center items-center bg-primary group-hover:bg-primary/90 rounded-full w-12 h-12 transition-colors cursor-pointer">
                    <Play className="ml-0.5 w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-muted/50 mt-12 p-6 border border-border rounded-xl">
          <div className="flex items-start gap-4">
            <div className="flex justify-center items-center bg-primary/10 rounded-lg w-10 h-10 shrink-0">
              <Star className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-foreground">
                Premium Course Coming Soon
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We're currently filming these expert video lessons with
                specialist surgeons and physiotherapists. The Premium course
                will launch in early 2025. In the meantime, the Standard course
                provides comprehensive written guidance for your entire
                recovery.
              </p>
              <div className="mt-4">
                <a
                  href={`${WEBSITE_URL}/course/standard`}
                  className="inline-flex items-center gap-2 font-medium text-primary text-sm hover:underline"
                >
                  Start with Standard Course
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
