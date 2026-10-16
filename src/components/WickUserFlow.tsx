import UserFlow, { type FlowEdge, type FlowNode, type Journey } from "./UserFlow";

const nodes: FlowNode[] = [
  { id: "home", label: ["wick.courses"], kind: "start", x: 117, y: 508 },
  { id: "new", label: ["New", "visitor?"], kind: "decision", x: 272, y: 508 },
  { id: "welcome", label: ["Welcome"], kind: "page", x: 565, y: 469 },
  { id: "access", label: ["Access"], kind: "page", x: 789, y: 469 },
  { id: "awareness", label: ["Awareness"], kind: "page", x: 990, y: 469 },
  { id: "grove", label: ["Grove"], kind: "screen", x: 1234, y: 508 },
  { id: "guide", label: ["Field Guide"], kind: "screen", x: 1234, y: 616 },
  { id: "journey", label: ["Journey"], kind: "screen", x: 1234, y: 386 },
  { id: "coaching", label: ["Coaching"], kind: "screen", x: 1064, y: 338 },
  { id: "trails", label: ["Trails"], kind: "screen", x: 1620, y: 449 },
  { id: "studio", label: ["Scenario Studio"], kind: "page", x: 1883, y: 449 },
  { id: "settings", label: ["Settings"], kind: "page", x: 1883, y: 619 },
  { id: "note", label: ["Content note"], kind: "page", x: 1883, y: 184 },
  { id: "clearing", label: ["Clearing"], kind: "page", x: 1450, y: 127 },
  { id: "stepout", label: ["Step", "out?"], kind: "decision", x: 1626, y: 127 },
  { id: "begin", label: ["Start?"], kind: "decision", x: 1069, y: 212 },
  { id: "end", label: ["End", "session?"], kind: "decision", x: 730, y: 111 },
];

const edges: FlowEdge[] = [
  {
    from: "home",
    to: "new",
    points: [
      [171, 508],
      [220, 508],
    ],
  },
  {
    from: "new",
    to: "welcome",
    points: [
      [322, 508],
      [334, 508],
      [334, 469],
      [509, 469],
    ],
    label: "Via /welcome URL",
    at: [423, 469],
  },
  {
    from: "new",
    to: "grove",
    points: [
      [322, 508],
      [334, 508],
      [334, 546],
      [1141, 546],
      [1141, 508],
      [1178, 508],
    ],
    label: "Direct to /",
    at: [737, 546],
  },
  {
    from: "welcome",
    to: "access",
    points: [
      [619, 469],
      [733, 469],
    ],
    label: "Begin with Wick",
    at: [677, 469],
  },
  {
    from: "access",
    to: "awareness",
    points: [
      [843, 469],
      [934, 469],
    ],
    label: "Continue",
    at: [889, 469],
  },
  {
    from: "awareness",
    to: "grove",
    points: [
      [1044, 469],
      [1141, 469],
      [1141, 508],
      [1178, 508],
    ],
    label: "I understand",
    at: [1095, 469],
  },
  {
    from: "grove",
    to: "trails",
    points: [
      [1288, 508],
      [1374, 508],
      [1374, 542],
      [1543, 542],
      [1543, 449],
      [1564, 449],
    ],
    label: "Browse",
    at: [1457, 542],
  },
  {
    from: "grove",
    to: "note",
    points: [
      [1288, 508],
      [1326, 508],
      [1326, 302],
      [1806, 302],
      [1806, 206],
      [1827, 206],
    ],
    label: "Map pin",
    at: [1565, 302],
  },
  {
    from: "journey",
    to: "trails",
    points: [
      [1288, 386],
      [1357, 386],
      [1357, 410],
      [1527, 410],
      [1527, 449],
      [1564, 449],
    ],
    label: "Find a trail",
    at: [1442, 410],
  },
  {
    from: "trails",
    to: "guide",
    points: [
      [1566, 449],
      [1527, 449],
      [1527, 483],
      [1357, 483],
      [1357, 605],
      [1290, 605],
    ],
    label: "Deep links",
    at: [1442, 483],
  },
  {
    from: "trails",
    to: "note",
    points: [
      [1674, 430],
      [1698, 430],
      [1698, 285],
      [1790, 285],
      [1790, 195],
      [1827, 195],
    ],
    label: "Pick a trail",
    at: [1743, 285],
  },
  {
    from: "trails",
    to: "studio",
    points: [
      [1676, 449],
      [1698, 449],
      [1698, 438],
      [1827, 438],
    ],
    label: "Create scenario",
    at: [1761, 438],
  },
  {
    from: "studio",
    to: "trails",
    points: [
      [1829, 459],
      [1698, 459],
      [1698, 449],
      [1676, 449],
    ],
    label: "Cancel",
    at: [1761, 459],
  },
  {
    from: "coaching",
    to: "journey",
    points: [
      [1118, 338],
      [1141, 338],
      [1141, 386],
      [1178, 386],
    ],
  },
  {
    from: "coaching",
    to: "note",
    points: [
      [1118, 338],
      [1141, 338],
      [1141, 269],
      [1775, 269],
      [1775, 184],
      [1827, 184],
    ],
    label: "Try again",
    at: [1457, 269],
  },
  {
    from: "note",
    to: "begin",
    points: [
      [1829, 174],
      [1760, 174],
      [1760, 204],
      [1141, 204],
      [1141, 212],
      [1119, 212],
    ],
  },
  {
    from: "begin",
    to: "clearing",
    points: [
      [1109, 199],
      [1141, 199],
      [1141, 147],
      [1310, 147],
      [1310, 127],
      [1394, 127],
    ],
    label: "Start role-play",
    at: [1226, 147],
  },
  {
    from: "begin",
    to: "trails",
    points: [
      [1109, 225],
      [1157, 225],
      [1157, 302],
      [1310, 302],
      [1310, 341],
      [1543, 341],
      [1543, 449],
      [1564, 449],
    ],
    label: "Back",
    at: [1427, 341],
  },
  {
    from: "clearing",
    to: "stepout",
    points: [
      [1504, 127],
      [1576, 127],
    ],
  },
  {
    from: "stepout",
    to: "note",
    points: [
      [1676, 127],
      [1760, 127],
      [1760, 163],
      [1827, 163],
    ],
    label: "Yes - no eval",
    at: [1760, 146],
  },
  {
    from: "stepout",
    to: "end",
    points: [
      [1578, 118],
      [789, 118],
      [789, 98],
      [771, 98],
    ],
    label: "No",
    at: [1185, 118],
    red: true,
  },
  {
    from: "end",
    to: "clearing",
    points: [
      [780, 111],
      [800, 111],
      [800, 106],
      [1310, 106],
      [1310, 127],
      [1394, 127],
    ],
    label: "Keep practicing",
    at: [1056, 106],
  },
  {
    from: "end",
    to: "coaching",
    points: [
      [769, 124],
      [801, 124],
      [801, 338],
      [1008, 338],
    ],
    label: "End and get feedback",
    at: [801, 231],
  },
  {
    from: "grove",
    to: "settings",
    points: [
      [1288, 508],
      [1311, 508],
      [1311, 728],
      [1775, 728],
      [1775, 619],
      [1827, 619],
    ],
    label: "Sidebar",
    at: [1543, 728],
    dashed: true,
  },
  {
    from: "journey",
    to: "settings",
    points: [
      [1288, 386],
      [1342, 386],
      [1342, 594],
      [1759, 594],
      [1759, 619],
      [1827, 619],
    ],
    label: "Sidebar",
    at: [1550, 594],
    dashed: true,
  },
  {
    from: "guide",
    to: "settings",
    points: [
      [1288, 627],
      [1326, 627],
      [1326, 661],
      [1759, 661],
      [1759, 619],
      [1827, 619],
    ],
    label: "Sidebar",
    at: [1543, 661],
    dashed: true,
  },
  {
    from: "trails",
    to: "settings",
    points: [
      [1620, 479],
      [1620, 619],
      [1827, 619],
    ],
    label: "Sidebar",
    at: [1722, 619],
    dashed: true,
  },
];

const fills = {
  start: { fill: "#ffffff", stroke: "#757575" },
  page: { fill: "#ffffff", stroke: "#757575" },
  screen: { fill: "#cdf4d3", stroke: "#66d575" },
  decision: { fill: "#ffecbd", stroke: "#ffcd29" },
};

const journeys: Journey[] = [
  {
    name: "First visit",
    steps: ["home", "new", "welcome", "access", "awareness", "grove"],
  },
  {
    name: "Role-play",
    steps: ["grove", "note", "begin", "clearing", "stepout", "end", "coaching", "note"],
  },
  { name: "Find a trail", steps: ["grove", "trails", "studio", "trails", "note"] },
];

export default function WickUserFlow() {
  return (
    <UserFlow
      nodes={nodes}
      edges={edges}
      journeys={journeys}
      fills={fills}
      view={{ x: 40, y: 40, w: 1920, h: 720 }}
      size={{ w: 108, h: 62 }}
      label="Wick user flow diagram"
      legend="Select a step to trace its paths, or pick a journey to walk through the flow one step at a time. Green steps are main app screens, yellow steps are decisions, and dashed lines are sidebar links."
      className="aspect-[3/2] md:aspect-[8/3]"
    />
  );
}
