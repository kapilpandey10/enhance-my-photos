import { Maximize2, Sparkles, Palette, UserRound, ShieldCheck, Zap } from "lucide-react";

const features = [
  {
    icon: Maximize2,
    title: "4× Upscale",
    desc: "Boost resolution up to 4× without losing detail or introducing artifacts.",
  },
  {
    icon: Sparkles,
    title: "Denoise & Sharpen",
    desc: "Remove grain, compression noise and blur — recover crisp natural detail.",
  },
  {
    icon: Palette,
    title: "Color Restore",
    desc: "Revive faded photos with balanced exposure and true-to-life color.",
  },
  {
    icon: UserRound,
    title: "Face Restoration",
    desc: "Reconstruct soft or pixelated faces with realistic, natural features.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    desc: "Powered by Gemini — most enhancements complete in just a few seconds.",
  },
  {
    icon: ShieldCheck,
    title: "Private by Design",
    desc: "Your images are processed securely and never used to train models.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="relative border-t border-border bg-secondary/30 py-24 md:py-32"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Features
          </p>
          <h2
            id="features-title"
            className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl"
          >
            Everything you need to make every photo
            <span className="text-gradient"> shine</span>.
          </h2>
        </div>

        <ul className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <li
              key={title}
              className="group relative rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-secondary text-foreground transition-colors group-hover:bg-cta-gradient group-hover:text-accent-foreground">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {desc}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Features;
