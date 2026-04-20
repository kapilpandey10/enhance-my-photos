import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-b border-border/60">
        <nav
          aria-label="Primary"
          className="container flex h-16 items-center justify-between"
        >
          <a href="/" className="flex items-center gap-2 font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-cta-gradient text-accent-foreground shadow-glow">
              <Sparkles className="h-4 w-4" aria-hidden />
            </span>
            <span className="text-base tracking-tight">Photo Enhancer</span>
          </a>

          <ul className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <li>
              <a href="#features" className="transition-colors hover:text-foreground">
                Features
              </a>
            </li>
            <li>
              <a href="#showcase" className="transition-colors hover:text-foreground">
                Showcase
              </a>
            </li>
            <li>
              <a href="#enhance" className="transition-colors hover:text-foreground">
                Try it
              </a>
            </li>
          </ul>

          <Button
            asChild
            size="sm"
            className="bg-cta-gradient text-accent-foreground shadow-glow hover:opacity-90"
          >
            <a href="#enhance">Enhance now</a>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
