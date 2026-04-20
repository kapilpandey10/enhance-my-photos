import { useRef, useState } from "react";
import { ImageUp, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

/**
 * UI-only dropzone. Backend (Gemini API) will be wired later via an edge function.
 */
const UploadDropzone = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFileName(file.name);
  };

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFileName(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-3 shadow-soft">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
        className={`relative flex min-h-[280px] flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
          isDragging
            ? "border-accent bg-accent/5"
            : "border-border bg-secondary/40"
        }`}
      >
        {!preview ? (
          <>
            <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-cta-gradient text-accent-foreground shadow-glow">
              <ImageUp className="h-6 w-6" aria-hidden />
            </div>
            <h2 className="text-lg font-semibold">Drop your photo here</h2>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              JPG, PNG or WEBP — up to 20 MB. Your image is processed securely
              and never stored.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <Button
                onClick={() => inputRef.current?.click()}
                className="rounded-full bg-cta-gradient text-accent-foreground shadow-glow hover:opacity-90"
              >
                Choose image
              </Button>
              <Button
                variant="ghost"
                onClick={() =>
                  toast.info("Backend coming soon — wire Gemini next.")
                }
                className="rounded-full"
              >
                Try a sample
              </Button>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </>
        ) : (
          <div className="w-full">
            <div className="relative mx-auto max-w-md overflow-hidden rounded-xl ring-soft">
              <img
                src={preview}
                alt={fileName ?? "Uploaded preview"}
                className="h-auto w-full object-cover"
              />
              <button
                onClick={reset}
                aria-label="Remove image"
                className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-card/90 text-foreground shadow-soft hover:bg-card"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 truncate text-sm text-muted-foreground">
              {fileName}
            </p>
            <Button
              onClick={() =>
                toast.info(
                  "Frontend ready — connect Gemini via an edge function to enhance."
                )
              }
              className="mt-4 rounded-full bg-cta-gradient text-accent-foreground shadow-glow hover:opacity-90"
            >
              <Loader2 className="mr-2 h-4 w-4" />
              Enhance with AI
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadDropzone;
