import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import UploadDropzone from "./UploadDropzone";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-hero-glow">
      <div className="container relative pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center animate-fade-up">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-soft">
            <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
            Powered by Google Gemini
          </span>

          <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Bring every photo
            <br />
            <span className="text-gradient">back to life.</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground md:text-xl">
            Upscale, sharpen and restore any image in seconds. AI-powered
            enhancement that feels effortlessly magical.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-cta-gradient px-7 text-accent-foreground shadow-glow hover:opacity-90"
            >
              <a href="#enhance">
                Enhance a photo
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-12 rounded-full px-6 text-foreground hover:bg-secondary"
            >
              <a href="#showcase">See examples</a>
            </Button>
          </div>
        </div>

        <div
          id="enhance"
          className="mx-auto mt-16 max-w-3xl animate-fade-up"
          style={{ animationDelay: "120ms" }}
        >
          <UploadDropzone />
        </div>
      </div>
    </section>
  );
};

export default Hero;
