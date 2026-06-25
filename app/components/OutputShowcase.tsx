import { Check } from "lucide-react";

const formats = [
  "LeRobot",
  "ROS2 Bag",
  "Isaac Sim",
  "Genesis",
  "MuJoCo",
  "COCO",
  "KITTI",
];

const outputs = [
  "RGB video",
  "Depth maps",
  "Segmentation masks",
  "Bounding boxes",
  "Object pose",
  "Robot pose",
  "Joint states",
  "Action tokens",
  "Language instructions",
  "Success/failure labels",
  "Reward traces",
  "Collision/contact events",
];

export default function OutputShowcase() {
  return (
    <section id="output" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Every run exports
              <br />
              <span className="text-accent">a full dataset.</span>
            </h2>
            <p className="mt-4 text-lg text-muted">
              Not just video. Every generated scenario comes with complete
              sensor data, annotations, sim scenes, and evaluation reports —
              ready to plug into your training pipeline.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {outputs.map((output) => (
                <div
                  key={output}
                  className="flex items-center gap-2 text-sm text-ink"
                >
                  <Check className="h-4 w-4 flex-shrink-0 text-accent" />
                  {output}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="mb-3 text-xs font-medium uppercase tracking-widest text-muted">
                Compatible Formats
              </div>
              <div className="flex flex-wrap gap-2">
                {formats.map((format) => (
                  <span
                    key={format}
                    className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-ink"
                  >
                    {format}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 lg:p-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-widest text-muted">
                Dataset Structure
              </span>
              <span className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-xs text-accent">
                /task_0001
              </span>
            </div>
            <pre className="overflow-x-auto rounded-xl border border-border bg-paper/50 p-4 font-mono text-xs leading-relaxed text-muted">
{`/task_0001
  /videos
    rgb.mp4
    depth.mp4
    segmentation.mp4
  /annotations
    objects.json
    poses.json
    contacts.json
    success_labels.json
    rewards.json
  /sim
    scene.usd
    robot.urdf
    task.yaml
  /dataset
    lerobot_format/
    rosbag/
  report.pdf`}
            </pre>
            <p className="mt-4 text-sm text-muted">
              Each package is a self-contained training unit — video, sensor
              data, annotations, sim scene, and evaluation report bundled
              together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
