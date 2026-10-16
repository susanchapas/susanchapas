import UserFlow, {
  type FlowEdge,
  type FlowGroup,
  type FlowNode,
  type FlowNote,
  type Journey,
} from "./UserFlow";

const nodes: FlowNode[] = [
  { id: "login", label: ["Login Mobile"], kind: "entry", x: 240, y: 164 },
  { id: "loading", label: ["Loading Icon"], kind: "step", x: 435, y: 164 },
  { id: "tappw", label: ["Tap PW"], kind: "step", x: 630, y: 164 },
  { id: "enterpw", label: ["Enter PW"], kind: "step", x: 630, y: 300 },
  { id: "ok", label: ["Tap “Ok”"], kind: "step", x: 630, y: 436 },
  { id: "main", label: ["Main Page"], kind: "hub", x: 868, y: 436 },
  { id: "live", label: ["Live Feeds"], kind: "screen", x: 1126, y: 164 },
  { id: "opens", label: ["Opens feeds"], kind: "step", x: 1339, y: 164 },
  {
    id: "select",
    label: ["Select", "whatever", "feed u want", "to focus on"],
    kind: "step",
    x: 1552,
    y: 164,
  },
  { id: "scrubber", label: ["Scrubber"], kind: "screen", x: 1126, y: 332 },
  {
    id: "choose",
    label: ["Choose", "camera, time", "stamps, # of", "frames"],
    kind: "step",
    x: 1339,
    y: 332,
  },
  { id: "view", label: ["View stuff"], kind: "step", x: 1552, y: 332 },
  {
    id: "commit",
    label: ["Commit", "choices to", "memory"],
    kind: "step",
    x: 1765,
    y: 332,
  },
  { id: "processes", label: ["Processes"], kind: "screen", x: 1126, y: 488 },
  {
    id: "typets",
    label: ["Hopefully", "type in the", "correct time", "stamps"],
    kind: "step",
    x: 1339,
    y: 488,
  },
  {
    id: "check",
    label: ["Tap the", "checkmark", "and not exit!"],
    kind: "step",
    x: 1552,
    y: 488,
  },
  {
    id: "wait",
    label: ["Wait around", "for the thing", "to export?"],
    kind: "step",
    x: 1765,
    y: 488,
  },
  { id: "stats", label: ["Stats"], kind: "screen", x: 1126, y: 672 },
  { id: "storage", label: ["View", "Storage data"], kind: "step", x: 1339, y: 672 },
  { id: "delete", label: ["Delete it"], kind: "step", x: 1552, y: 672 },
  {
    id: "pin",
    label: ["What is PIN", "for?"],
    kind: "issue",
    x: 765,
    y: 174,
    of: "tappw",
  },
  {
    id: "nouser",
    label: ["No", "usernames?"],
    kind: "issue",
    x: 452,
    y: 300,
    of: "enterpw",
  },
  {
    id: "popup",
    label: ["PW input as a", "pop-up is", "jarring"],
    kind: "issue",
    x: 765,
    y: 300,
    of: "enterpw",
  },
  {
    id: "know",
    label: ["You have to", "already know", "what you’re", "looking for"],
    kind: "issue",
    x: 1440,
    y: 262,
    of: "choose",
  },
  {
    id: "pie",
    label: ["Pie charts ≠", "an effective", "way to show", "data usage"],
    kind: "issue",
    x: 868,
    y: 672,
    of: "stats",
  },
  {
    id: "noexport",
    label: [
      "No indicator of",
      "export times or",
      "confirmation, must",
      "stay on screen to",
      "finish process",
    ],
    kind: "issue",
    x: 1765,
    y: 604,
    of: "wait",
  },
];

const straight = (
  from: string,
  to: string,
  a: number,
  b: number,
  y: number
): FlowEdge => ({
  from,
  to,
  points: [
    [a, y],
    [b, y],
  ],
});

const fromMain = (to: string, y: number): FlowEdge => ({
  from: "main",
  to,
  points: [
    [916, 436],
    [998, 436],
    [998, y],
    [1078, y],
  ],
});

const edges: FlowEdge[] = [
  straight("login", "loading", 288, 387, 164),
  straight("loading", "tappw", 483, 582, 164),
  {
    from: "tappw",
    to: "enterpw",
    points: [
      [630, 212],
      [630, 252],
    ],
  },
  {
    from: "enterpw",
    to: "ok",
    points: [
      [630, 348],
      [630, 388],
    ],
  },
  straight("ok", "main", 678, 820, 436),
  fromMain("live", 164),
  fromMain("scrubber", 332),
  fromMain("processes", 488),
  fromMain("stats", 672),
  straight("live", "opens", 1174, 1291, 164),
  straight("opens", "select", 1387, 1504, 164),
  straight("scrubber", "choose", 1174, 1291, 332),
  straight("choose", "view", 1387, 1504, 332),
  straight("view", "commit", 1600, 1717, 332),
  {
    from: "commit",
    to: "typets",
    points: [
      [1765, 380],
      [1765, 410],
      [1339, 410],
      [1339, 440],
    ],
    red: true,
  },
  straight("processes", "typets", 1174, 1291, 488),
  straight("typets", "check", 1387, 1504, 488),
  straight("check", "wait", 1600, 1717, 488),
  straight("stats", "storage", 1174, 1291, 672),
  straight("storage", "delete", 1387, 1504, 672),
];

const groups: FlowGroup[] = [
  { label: "Auth flow", x: 155, y: 100, w: 793, h: 400, color: "#9747ff" },
  {
    label: "Condense these into ONE flow!",
    x: 1035,
    y: 268,
    w: 810,
    h: 284,
    color: "#f849c1",
  },
  { label: "Data Analysis", x: 770, y: 608, w: 878, h: 128, color: "#14b8a6" },
];

const notes: FlowNote[] = [
  { text: ["lacks auth flow"], x: 192, y: 250, color: "#f24822", size: 22 },
  { text: ["confusing UI"], x: 997, y: 100, color: "#9747ff", size: 22 },
  {
    text: ["these should be combined, export", "clips directly from the scrubber page"],
    x: 1079,
    y: 402,
    color: "#f24822",
  },
];

const fills = {
  entry: { fill: "#d4f5da", stroke: "#66d575" },
  step: { fill: "#fdebc0", stroke: "#ffcd29" },
  screen: { fill: "#cde6ff", stroke: "#4fa3f7" },
  hub: { fill: "#e4d6fc", stroke: "#9747ff" },
  issue: { fill: "#f7c4bc", stroke: "#f24822" },
};

const journeys: Journey[] = [
  { name: "Sign in", steps: ["login", "loading", "tappw", "enterpw", "ok", "main"] },
  { name: "Live feeds", steps: ["main", "live", "opens", "select"] },
  {
    name: "Export a clip",
    steps: ["main", "scrubber", "choose", "view", "commit", "typets", "check", "wait"],
  },
  { name: "Manage storage", steps: ["main", "stats", "storage", "delete"] },
];

export default function ChimeraUserFlow() {
  return (
    <UserFlow
      nodes={nodes}
      edges={edges}
      journeys={journeys}
      fills={fills}
      groups={groups}
      notes={notes}
      view={{ x: 120, y: 42, w: 1780, h: 712 }}
      size={{ w: 96, h: 96 }}
      zoom={520}
      label="Heuristic evaluation flow map of Jay's camera app"
      legend="Select a step to trace its paths, or pick a flow to walk through it one step at a time. Blue steps are the main sections of the app, and red notes mark the friction I found."
      className="aspect-[3/2] md:aspect-[5/2]"
    />
  );
}
