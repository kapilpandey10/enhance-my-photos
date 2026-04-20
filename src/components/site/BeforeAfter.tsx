import { useCallback, useRef, useState } from "react";
import beforeImg from "@/assets/before-sample.jpg";
import afterImg from "@/assets/after-sample.jpg";

const BeforeAfter = () => {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, next)));
  }, []);

  return (
    <section
      id="showcase"
      aria-labelledby="showcase-title"
      className="relative py-24 md:py-32"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Showcase
          </p>
          <h2
            id="showcase-title"
            className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl"
          >
            See the <span className="text-gradient">difference</span>.
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground md:text-lg">
            Drag the slider to compare the original and AI-enhanced result.
          </p>
        </div>

        <div
          ref={containerRef}
          onMouseMove={(e) => e.buttons === 1 && updateFromClientX(e.clientX)}
          onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
          onClick={(e) => updateFromClientX(e.clientX)}
          className="relative mx-auto mt-14 aspect-square w-full max-w-2xl select-none overflow-hidden rounded-3xl shadow-soft ring-soft md:aspect-[4/3]"
        >
          {/* After (base) */}
          <img
            src={afterImg}
            alt="Enhanced photo of a kitten — sharp, vibrant"
            width={1024}
            height={1024}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Before (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${pos}%` }}
          >
            <img
              src={beforeImg}
              alt="Original blurry photo of a kitten — before enhancement"
              width={1024}
              height={1024}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ width: `${(100 / pos) * 100}%`, maxWidth: "none" }}
            />
          </div>

          {/* Labels */}
          <span className="absolute left-4 top-4 rounded-full bg-foreground/80 px-3 py-1 text-xs font-medium text-background">
            Before
          </span>
          <span className="absolute right-4 top-4 rounded-full bg-cta-gradient px-3 py-1 text-xs font-medium text-accent-foreground shadow-glow">
            After
          </span>

          {/* Handle */}
          <div
            className="pointer-events-none absolute inset-y-0"
            style={{ left: `${pos}%` }}
          >
            <div className="absolute inset-y-0 -ml-px w-0.5 bg-white/90 shadow-soft" />
            <div className="absolute top-1/2 -ml-5 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-card shadow-soft ring-soft">
              <span className="text-xs font-semibold text-foreground">⇆</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
