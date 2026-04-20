import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
        <a href="/" className="flex items-center gap-2 font-semibold">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-cta-gradient text-accent-foreground">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
          </span>
          <span className="text-sm tracking-tight">Photo Enhancer</span>
        </a>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} photoenhancer.pandeykapil.com.np —
          Crafted with care.
        </p>
        <nav aria-label="Footer" className="flex gap-6 text-xs text-muted-foreground">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#showcase" className="hover:text-foreground">Showcase</a>
          <a href="#enhance" className="hover:text-foreground">Try it</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
