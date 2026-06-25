import {
  Globe,
  ListChecks,
  Database,
  AlertTriangle,
  Gauge,
} from "lucide-react";

const modules = [
  {
    icon: Globe,
    title: "World Generator",
    description:
      "Generate photorealistic, robot-actionable 3D scenes from text. Objects, physics properties, and task graphs included.",
    gradient: "from-cyan-500/20 to-blue-500/5",
  },
  {
    icon: ListChecks,
    title: "Task Generator",
    description:
      "Create embodied task curricula with success and failure definitions. Pick-and-place, folding, cleaning, navigation, and more.",
    gradient: "from-teal-500/20 to-emerald-500/5",
  },
  {
    icon: Database,
    title: "Synthetic Data Engine",
    description:
      "Export RGB, depth, segmentation, poses, joint states, action tokens, ROS2 bags, and LeRobot-compatible datasets.",
    gradient: "from-violet-500/20 to-purple-500/5",
  },
  {
    icon: AlertTriangle,
    title: "Failure Simulator",
    description:
      "Generate edge cases that break policies: object slips, drawer jams, human interruptions, wet floors, camera occlusions.",
    gradient: "from-amber-500/20 to-orange-500/5",
  },
  {
    icon: Gauge,
    title: "Policy Evaluation Arena",
    description:
      "Test robot policies across thousands of variants. Get success rates, failure distributions, and sim-to-real confidence scores.",
    gradient: "from-rose-500/20 to-red-500/5",
  },
];

export default function Modules() {
  return (
    <section id="modules" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Five modules. One lab.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Not just video generation. A full-stack synthetic reality pipeline
            for physical AI — from scene creation to policy evaluation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.title}
                className={`card-hover group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 ${
                  i === 0 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${mod.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />
                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-2">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {mod.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {mod.description}
                  </p>
                </div>
              </div>
            );
          })}

          <div className="card-hover relative flex flex-col justify-center overflow-hidden rounded-2xl border border-border bg-surface p-6">
            <div className="absolute inset-0 dot-bg opacity-30" />
            <div className="relative z-10">
              <p className="font-display text-2xl font-semibold leading-tight tracking-tight">
                Runway sells generation.
              </p>
              <p className="mt-2 font-display text-2xl font-semibold leading-tight tracking-tight text-accent">
                We sell practice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
