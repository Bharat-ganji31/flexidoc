import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Download, Loader2, RotateCcw, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UploadZone } from "@/components/UploadZone";
import { Progress } from "@/components/ui/progress";
import { ICON_MAP } from "@/lib/tools";
import { convertFiles, downloadUrl, fetchTool } from "@/lib/api";

const FORMAT_OPTIONS = ["png", "jpg", "webp", "bmp"];

export default function Tool() {
  const { toolId } = useParams();
  const [tool, setTool] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | uploading | processing | done | error
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [target, setTarget] = useState("png");

  useEffect(() => {
    setStatus("idle");
    setFiles([]);
    setResult(null);
    setProgress(0);
    setNotFound(false);
    fetchTool(toolId)
      .then(setTool)
      .catch(() => setNotFound(true));
  }, [toolId]);

  if (notFound) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-50">
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-32 text-center">
          <div className="text-6xl font-bold tracking-tighter mb-4">404</div>
          <div className="text-zinc-400 mb-8">This tool doesn't exist.</div>
          <Link to="/" className="text-[#FF521B] hover:underline">Back to all tools</Link>
        </div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-zinc-500" />
      </div>
    );
  }

  const Icon = ICON_MAP[tool.icon] || ICON_MAP.FileText;

  const run = async () => {
    if (!files.length) {
      toast.error("Please choose at least one file");
      return;
    }
    setStatus("uploading");
    setProgress(0);
    setResult(null);
    try {
      const extra = tool.id === "image-converter" ? { target_format: target } : {};
      const data = await convertFiles(tool.id, files, extra, (p) => {
        setProgress(p);
        if (p >= 100) setStatus("processing");
      });
      setResult(data);
      setStatus("done");
      toast.success("Conversion complete!");
    } catch (e) {
      const msg = e?.response?.data?.detail || e.message || "Conversion failed";
      toast.error(msg);
      setStatus("error");
    }
  };

  const reset = () => {
    setFiles([]);
    setResult(null);
    setStatus("idle");
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/"
          data-testid="back-link"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-50 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> All tools
        </Link>

        <div className="flex items-start gap-4 mb-10">
          <div className="w-14 h-14 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6 text-[#FF521B]" strokeWidth={1.75} />
          </div>
          <div>
            <h1 data-testid="tool-title" className="text-3xl md:text-4xl font-bold tracking-tighter">
              {tool.title}
            </h1>
            <p className="text-zinc-400 mt-2 max-w-2xl">{tool.description}</p>
          </div>
        </div>

        {/* IDLE / ERROR */}
        {(status === "idle" || status === "error") && (
          <>
            <UploadZone
              accept={tool.accept}
              multiple={tool.multiple}
              files={files}
              onChange={setFiles}
            />

            {tool.id === "image-converter" && (
              <div className="mt-8 p-6 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="text-sm text-zinc-400 mb-3">Convert to format</div>
                <div className="flex flex-wrap gap-2">
                  {FORMAT_OPTIONS.map((f) => (
                    <button
                      key={f}
                      data-testid={`format-${f}`}
                      onClick={() => setTarget(f)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                        target === f
                          ? "bg-[#FF521B] text-white border-[#FF521B]"
                          : "bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700"
                      }`}
                    >
                      {f.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                data-testid="convert-btn"
                onClick={run}
                disabled={!files.length}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#FF521B] text-white font-medium hover:bg-[#FF3D00] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Convert now
              </button>
              {files.length > 0 && (
                <button
                  data-testid="reset-btn"
                  onClick={reset}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" /> Clear
                </button>
              )}
            </div>
          </>
        )}

        {/* UPLOADING / PROCESSING */}
        {(status === "uploading" || status === "processing") && (
          <div data-testid="processing-state" className="mt-2 p-10 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#FF521B] mx-auto mb-4" />
            <div className="text-lg font-semibold mb-2">
              {status === "uploading" ? "Uploading your files…" : "Converting…"}
            </div>
            <div className="text-sm text-zinc-400 mb-6">This usually takes a few seconds. Hang tight.</div>
            <div className="max-w-md mx-auto">
              <Progress value={status === "uploading" ? progress : 100} />
            </div>
          </div>
        )}

        {/* DONE */}
        {status === "done" && result && (
          <div data-testid="done-state" className="mt-2 p-10 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
            <div className="w-14 h-14 rounded-full bg-[#FF521B]/15 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-[#FF521B]" />
            </div>
            <div className="text-2xl font-bold tracking-tight mb-2">Your file is ready</div>
            <div className="text-sm text-zinc-400 mb-8">
              {result.filename} · {(result.size / 1024).toFixed(1)} KB
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                data-testid="download-btn"
                href={downloadUrl(result.file_id)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#FF521B] text-white font-medium hover:bg-[#FF3D00] transition-colors"
                download
              >
                <Download className="w-4 h-4" /> Download
              </a>
              <button
                data-testid="convert-again-btn"
                onClick={reset}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Convert another
              </button>
            </div>
            <div className="text-xs text-zinc-500 mt-6">File auto-deletes in 30 minutes.</div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
