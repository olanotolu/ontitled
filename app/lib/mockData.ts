export interface Robot {
  id: string;
  name: string;
  description: string;
}

export interface Scene {
  id: string;
  name: string;
  description: string;
}

export interface Task {
  id: string;
  name: string;
  description: string;
}

export interface FailureMode {
  id: string;
  name: string;
}

export interface ScenarioPreview {
  id: string;
  label: string;
  success: boolean;
  gradient: string;
}

export interface FailureBreakdown {
  label: string;
  count: number;
  percentage: number;
}

export interface DatasetFile {
  name: string;
  type: "folder" | "file";
  children?: DatasetFile[];
}

export interface GenerationResult {
  totalScenarios: number;
  successRate: number;
  failureRate: number;
  previews: ScenarioPreview[];
  failureBreakdown: FailureBreakdown[];
  datasetTree: DatasetFile[];
  policySummary: string;
  weakSpots: string[];
}

export const robots: Robot[] = [
  { id: "unitree-h1", name: "Unitree H1", description: "Bipedal humanoid" },
  { id: "figure-style", name: "Figure-style", description: "General-purpose humanoid" },
  { id: "generic-bimanual", name: "Generic Bimanual", description: "Dual-arm manipulator" },
  { id: "warehouse-arm", name: "Warehouse Arm", description: "Single-arm pick-and-place" },
  { id: "mobile-manipulator", name: "Mobile Manipulator", description: "Wheeled base + arm" },
  { id: "1x-style", name: "1X-style", description: "Lightweight humanoid" },
];

export const scenes: Scene[] = [
  { id: "hotel-room", name: "Hotel Room", description: "Bed, bathroom, desk, narrow walkway" },
  { id: "kitchen", name: "Kitchen", description: "Counters, cabinets, sink, appliances" },
  { id: "warehouse", name: "Warehouse", description: "Shelves, totes, pallets, open floor" },
  { id: "eldercare", name: "Eldercare Room", description: "Bed, chair, medical equipment, rails" },
  { id: "laboratory", name: "Laboratory", description: "Benches, instruments, glassware, fume hood" },
  { id: "living-room", name: "Living Room", description: "Sofa, table, TV, cluttered floor" },
];

export const tasks: Task[] = [
  { id: "pick-place", name: "Pick & Place", description: "Grasp and move objects to target" },
  { id: "folding", name: "Folding", description: "Fold towels, sheets, garments" },
  { id: "cleaning", name: "Cleaning", description: "Wipe surfaces, pick up debris" },
  { id: "drawer", name: "Drawer Opening", description: "Open and close drawers/cabinets" },
  { id: "navigation", name: "Navigation", description: "Navigate through cluttered space" },
  { id: "spill-response", name: "Spill Response", description: "Detect and clean liquid spills" },
  { id: "tool-use", name: "Tool Use", description: "Use tools to accomplish tasks" },
  { id: "failure-recovery", name: "Failure Recovery", description: "Recover from dropped or slipped objects" },
];

export const failureModes: FailureMode[] = [
  { id: "object-slip", name: "Object Slip" },
  { id: "drawer-jam", name: "Drawer Jam" },
  { id: "human-interruption", name: "Human Interruption" },
  { id: "low-light", name: "Low Light" },
  { id: "wet-floor", name: "Wet Floor" },
  { id: "camera-occlusion", name: "Camera Occlusion" },
  { id: "grip-fail", name: "Grip Failure" },
  { id: "unexpected-weight", name: "Unexpected Weight" },
];

const gradients = [
  "from-cyan-500/30 to-blue-500/10",
  "from-teal-500/30 to-emerald-500/10",
  "from-violet-500/30 to-purple-500/10",
  "from-amber-500/30 to-orange-500/10",
  "from-rose-500/30 to-red-500/10",
  "from-sky-500/30 to-indigo-500/10",
  "from-lime-500/30 to-green-500/10",
  "from-fuchsia-500/30 to-pink-500/10",
];

const scenarioLabels = [
  "Mug pickup — cabinet open",
  "Towel fold — bed surface",
  "Spill cleanup — wet floor",
  "Drawer open — jammed track",
  "Cup placement — tray target",
  "Navigation — cluttered path",
  "Object recovery — slipped grip",
  "Trash removal — bin deposit",
];

export function generateMockResult(
  variations: number,
  selectedFailures: FailureMode[]
): GenerationResult {
  const successRate = 60 + Math.floor(Math.random() * 25);
  const failureRate = 100 - successRate;
  const previewCount = Math.min(8, Math.max(6, Math.floor(variations / 500) + 6));

  const previews: ScenarioPreview[] = Array.from({ length: previewCount }, (_, i) => ({
    id: `preview-${i}`,
    label: scenarioLabels[i % scenarioLabels.length],
    success: Math.random() > failureRate / 100,
    gradient: gradients[i % gradients.length],
  }));

  const activeFailures = selectedFailures.length > 0 ? selectedFailures : failureModes.slice(0, 4);

  const failureBreakdown: FailureBreakdown[] = activeFailures.map((f, i) => {
    const pct = Math.floor(100 / activeFailures.length) + (i === 0 ? 100 % activeFailures.length : 0);
    return {
      label: f.name,
      count: Math.floor((variations * failureRate * pct) / 10000),
      percentage: pct,
    };
  });

  const weakSpots = [
    "transparent objects",
    "left-handed cabinet openings",
    "reflective floors",
    "low-light recovery",
  ].slice(0, Math.min(4, 2 + Math.floor(Math.random() * 3)));

  return {
    totalScenarios: variations,
    successRate,
    failureRate,
    previews,
    failureBreakdown,
    weakSpots,
    policySummary: `Your robot policy succeeded in ${successRate}% of synthetic variants, failed mostly on ${weakSpots.join(", ")}, and showed degraded performance under ${activeFailures[0]?.name ?? "edge cases"}.`,
    datasetTree: [
      {
        name: "task_0001",
        type: "folder",
        children: [
          {
            name: "videos",
            type: "folder",
            children: [
              { name: "rgb.mp4", type: "file" },
              { name: "depth.mp4", type: "file" },
              { name: "segmentation.mp4", type: "file" },
            ],
          },
          {
            name: "annotations",
            type: "folder",
            children: [
              { name: "objects.json", type: "file" },
              { name: "poses.json", type: "file" },
              { name: "contacts.json", type: "file" },
              { name: "success_labels.json", type: "file" },
              { name: "rewards.json", type: "file" },
            ],
          },
          {
            name: "sim",
            type: "folder",
            children: [
              { name: "scene.usd", type: "file" },
              { name: "robot.urdf", type: "file" },
              { name: "task.yaml", type: "file" },
            ],
          },
          {
            name: "dataset",
            type: "folder",
            children: [
              { name: "lerobot_format/", type: "folder" },
              { name: "rosbag/", type: "folder" },
            ],
          },
          { name: "report.pdf", type: "file" },
        ],
      },
    ],
  };
}
