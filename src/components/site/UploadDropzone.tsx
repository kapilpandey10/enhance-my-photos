import { useRef, useState } from "react";
import { ImageUp, Loader2, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// 👇 Replace this with your deployed Cloudflare Worker URL
const WORKER_URL = "https://enhance-worker.YOUR_SUBDOMAIN.workers.dev";

const UploadDropzone = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFileName(file.name);
    setOriginalFile(file);
    setEnhancedImage(null);
  };

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFileName(null);
    setOriginalFile(null);
    setEnhancedImage(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleEnhance = async () => {
    if (!originalFile) return;

    setIsEnhancing(true);
    setEnhancedImage(null);

    try {
      const formData = new FormData();
      formData.append("image", originalFile);

      const res = await fetch(`${WORKER_URL}/enhance`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(err.error || `Server error ${res.status}`);
      }

      const data = await res.json();

      if (!data.imageBase64) {
        throw new Error("No image returned from server.");
      }

      setEnhancedImage(`data:image/png;base64,${data.imageBase64}`);
      toast.success("Enhancement complete!");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleDownload = () => {
    if (!enhancedImage) return;
    const a = document.createElement("a");
    a.href = enhancedImage;
    a.download = `enhanced-${fileName ?? "photo"}.png`;
    a.click();
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-3 shadow-soft">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
        className={`relative flex min-h-[280px] flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
          isDragging ? "border-accent bg-accent/5" : "border-border bg-secondary/40"
        }`}
      >
        {!preview ? (
          <>
            <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-cta-gradient text-accent-foreground shadow-glow">
              <ImageUp className="h-6 w-6" aria-hidden />
            </div>
            <h2 className="text-lg font-semibold">Drop your photo here</h2>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              JPG, PNG or WEBP — up to 20 MB. Your image is processed securely and never stored.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <Button
                onClick={() => inputRef.current?.click()}
                className="rounded-full bg-cta-gradient text-accent-foreground shadow-glow hover:opacity-90"
              >
                Choose image
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
            {/* Before / After layout */}
            <div className={`mx-auto grid gap-4 ${enhancedImage ? "max-w-3xl grid-cols-2" : "max-w-md grid-cols-1"}`}>
              {/* Original */}
              <div className="relative">
                {enhancedImage && (
                  <p className="mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">Original</p>
                )}
                <div className="relative overflow-hidden rounded-xl ring-soft">
                  <img
                    src={preview}
                    alt={fileName ?? "Uploaded preview"}
                    className="h-auto w-full object-cover"
                  />
                  {!enhancedImage && (
                    <button
                      onClick={reset}
                      aria-label="Remove image"
                      className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-card/90 text-foreground shadow-soft hover:bg-card"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Enhanced */}
              {enhancedImage && (
                <div className="relative">
                  <p className="mb-1 text-xs font-medium text-accent uppercase tracking-wider">Enhanced ✨</p>
                  <div className="relative overflow-hidden rounded-xl ring-soft">
                    <img
                      src={enhancedImage}
                      alt="Enhanced result"
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            <p className="mt-3 truncate text-sm text-muted-foreground">{fileName}</p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {!enhancedImage ? (
                <>
                  <Button
                    onClick={handleEnhance}
                    disabled={isEnhancing}
                    className="rounded-full bg-cta-gradient text-accent-foreground shadow-glow hover:opacity-90"
                  >
                    {isEnhancing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enhancing…
                      </>
                    ) : (
                      "Enhance with AI"
                    )}
                  </Button>
                  <Button variant="ghost" onClick={reset} className="rounded-full" disabled={isEnhancing}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleDownload}
                    className="rounded-full bg-cta-gradient text-accent-foreground shadow-glow hover:opacity-90"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Enhanced
                  </Button>
                  <Button variant="ghost" onClick={reset} className="rounded-full">
                    Try another photo
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadDropzone;
