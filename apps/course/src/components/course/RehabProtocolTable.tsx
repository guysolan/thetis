import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@thetis/ui/table";

export interface RehabStage {
    stage: string;
    consideration: string[];
    outcome: string[];
}

const rehabStages: RehabStage[] = [
    {
        stage: "Immobilised period (12 weeks)",
        consideration: [
            "Seated isometric exercises",
            "Standing isometric exercises from about 8-10 weeks",
            "Strict immobilisation night and day",
        ],
        outcome: [
            "0.8 to 1 body weight seated plantarflexion isometric",
            "(internal forces are higher)",
        ],
    },
    {
        stage: "Initial post immobilisation (6+ weeks)",
        consideration: [
            "Double to single leg isotonic calf raise in standing",
            "Single leg seated isotonic/isometric calf raise",
            "Train balance and unaffected leg 3x/week",
            "Protected gait",
        ],
        outcome: [
            "15 body weight standing single leg calf raises",
            "1.4 body weight seated plantarflexion isometric protected gait",
            "1.2 body weight seated 6 repetition maximum",
        ],
    },
    {
        stage: "Single leg capacity (6+ weeks)",
        consideration: [
            "Single leg standing/seated isotonic",
            "Progressive dorsiflexion, e.g. calf raise, sled",
            "Gait prep e.g. hip and ankle focused",
            "Plyometric prep e.g. landing, jumping",
            "Commence running",
        ],
        outcome: [
            "2+ body weight seated plantarflexion isometric in protected gait",
            "Heel height limb symmetry index unloaded 80%",
            "Knee to wall limb symmetry index 80%",
        ],
    },
    {
        stage: "Single leg power (12+ weeks)",
        consideration: [
            "Force generation - progress jumping",
            "Hopping and pogo progressions",
            "Sports focus e.g. high speed running, deceleration, cutting",
        ],
        outcome: [
            "5-10, drop jump = reactive strength index, contact time, jump height",
            "Max hop = distance, height",
            "Calf muscle power profile",
        ],
    },
    {
        stage: "Return to sport",
        consideration: ["Commence sports specific training"],
        outcome: [],
    },
];

export function RehabProtocolTable() {
    return (
        <div className="my-6 overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px] font-semibold">
                            STAGE
                        </TableHead>
                        <TableHead className="font-semibold">
                            CONSIDERATION
                        </TableHead>
                        <TableHead className="font-semibold">OUTCOME</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rehabStages.map((stage, index) => (
                        <TableRow key={index}>
                            <TableCell className="py-4 font-medium align-top">
                                {stage.stage}
                            </TableCell>
                            <TableCell className="py-4 align-top">
                                <div className="space-y-2">
                                    {stage.consideration.map((
                                        item,
                                        itemIndex,
                                    ) => (
                                        <div key={itemIndex}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </TableCell>
                            <TableCell className="py-4 align-top">
                                {stage.outcome.length > 0
                                    ? (
                                        <div className="space-y-2">
                                            {stage.outcome.map((
                                                item,
                                                itemIndex,
                                            ) => (
                                                <div key={itemIndex}>
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    )
                                    : (
                                        <span className="text-muted-foreground">
                                            —
                                        </span>
                                    )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
