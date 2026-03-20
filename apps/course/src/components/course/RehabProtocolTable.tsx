import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@thetis/ui/table";

export interface RehabStage {
  stage: string;
  weeks: string;
  whatYouDo: string[];
  readyForNext: string[];
}

const rehabStages: RehabStage[] = [
  {
    stage: "Stage 1: Protection",
    weeks: "Weeks 0–10",
    whatYouDo: [
      "Seated calf raises (push down with foot pointed)",
      "Standing calf work from Week 10",
      "Boot on night and day",
    ],
    readyForNext: ["Can push down with ~1× body weight while seated"],
  },
  {
    stage: "Stage 2: Transition",
    weeks: "Weeks 10–12",
    whatYouDo: [
      "Seated calf raises with weight",
      "Balance training 3×/week",
      "Learning to walk properly",
    ],
    readyForNext: ["Can push 1.4× body weight (seated)", "Walking without limping"],
  },
  {
    stage: "Stage 3: Capacity",
    weeks: "Weeks 12–26",
    whatYouDo: [
      "Double then Single-leg calf raises (seated & standing)",
      "Gradually increase ankle flexibility",
      "Walking and gait exercises",
      "Prep for jumping and running",
      "Start running when cleared",
    ],
    readyForNext: [
      "25+ single-leg heel raises",
      "Heel raise height: 80% of good leg",
      "Ankle flexibility: 80% of good leg",
    ],
  },
  {
    stage: "Stage 4: Power",
    weeks: "Weeks 26+",
    whatYouDo: [
      "Jumping progressions",
      "Hopping and plyometrics",
      "Sport-specific training (sprinting, cutting, deceleration)",
    ],
    readyForNext: ["Good jump and hop performance", "Calf power similar to good leg"],
  },
  {
    stage: "Return to Sport",
    weeks: "When ready (Usually 8 months at best)",
    whatYouDo: ["Full sport-specific training and competition"],
    readyForNext: [],
  },
];

export function RehabProtocolTable() {
  return (
    <div className="my-6 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px] font-semibold">Stage</TableHead>
            <TableHead className="w-[100px] font-semibold">When</TableHead>
            <TableHead className="font-semibold">What You'll Do</TableHead>
            <TableHead className="font-semibold">Ready for Next Stage When...</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rehabStages.map((stage, index) => (
            <TableRow key={index}>
              <TableCell className="py-4 font-medium align-top">{stage.stage}</TableCell>
              <TableCell className="py-4 align-top text-muted-foreground">{stage.weeks}</TableCell>
              <TableCell className="py-4 align-top">
                <ul className="space-y-1 list-disc list-inside">
                  {stage.whatYouDo.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </TableCell>
              <TableCell className="py-4 align-top">
                {stage.readyForNext.length > 0 ? (
                  <ul className="space-y-1 list-disc list-inside">
                    {stage.readyForNext.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-muted-foreground text-sm">You made it! 🎉</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
