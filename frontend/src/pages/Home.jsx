import { useEffect, useState } from "react";
import { ArrowRight, Shield, Zap, FileCheck2, Check } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToolCard } from "@/components/ToolCard";
import { fetchTools } from "@/lib/api";
import { CATEGORY_LABELS, CATEGORY_ORDER } from "@/lib/tools";

export default function Home() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTools()
      .then(setTools)
      .finally(() => setLoading(false));
  }, []);

  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    label: CATEGORY_LABELS[cat],
    items: tools.filter((t) => t.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-zinc-900">
        <div
          aria-hidden
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,82,27,0.15), transparent 40%), radial-gradient(circle at 80% 60%, rgba(255,82,27,0.08), transparent 50%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/60 text-xs text-zinc-300 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF521B]" />
              12+ conversion tools · 100% free in beta
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-bold text-zinc-50 leading-[1.05]">
              Every document tool you need,
              <br />
              <span className="text-[#FF521B]">in one fast workspace.</span>
            </h1>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-zinc-400 max-w-2xl">
              Convert, merge, split and compress PDFs, Word, Excel, PowerPoint and images.
              No login, no watermarks. Files vanish from our servers after 30 minutes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#tools"
                data-testid="hero-cta-tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#FF521B] text-white font-medium hover:bg-[#FF3D00] transition-colors"
              >
                Browse all tools <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#how"
                data-testid="hero-cta-how"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-50 font-medium hover:bg-zinc-800 transition-colors"
              >
                See how it works
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-zinc-400">
              <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#FF521B]" /> Private by default</div>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#FF521B]" /> Server-side conversion</div>
              <div className="flex items-center gap-2"><FileCheck2 className="w-4 h-4 text-[#FF521B]" /> Auto-delete in 30m</div>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS GRID */}
      <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#FF521B] mb-2">Toolbox</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl tracking-tight font-semibold text-zinc-50">
              Choose a tool to get started
            </h2>
          </div>
          {loading && <div className="text-sm text-zinc-500" data-testid="tools-loading">Loading…</div>}
        </div>

        {!loading && grouped.length === 0 && (
          <div className="text-zinc-500 text-sm py-12 text-center">
            Could not load tools. Make sure the backend is running.
          </div>
        )}

        <div className="space-y-12">
          {grouped.map((group) => (
            <div key={group.category}>
              <div className="text-sm uppercase tracking-widest text-zinc-500 mb-4">{group.label}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {group.items.map((t) => (
                  <ToolCard key={t.id} tool={t} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="text-xs uppercase tracking-widest text-[#FF521B] mb-2">Workflow</div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl tracking-tight font-semibold mb-12">Three steps. Zero friction.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: "01", t: "Pick a tool", d: "Choose from 12+ conversion and PDF utilities tailored to your file." },
              { n: "02", t: "Drop your files", d: "Drag and drop, or browse. Conversion starts the moment the upload finishes." },
              { n: "03", t: "Download instantly", d: "Get a clean, secure file. Your originals are auto-deleted from our servers." },
            ].map((s) => (
              <div key={s.n} className="p-8 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-[#FF521B] transition-colors">
                <div className="text-[#FF521B] font-mono text-sm mb-4">{s.n}</div>
                <div className="text-xl font-semibold mb-2">{s.t}</div>
                <p className="text-zinc-400 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="text-xs uppercase tracking-widest text-[#FF521B] mb-2">Pricing</div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl tracking-tight font-semibold mb-2">Free today. Pro tomorrow.</h2>
          <p className="text-zinc-400 mb-12 max-w-2xl">
            Use every tool for free during beta. Upgrade to Pro for higher limits, batch processing and priority queues.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            <div className="p-8 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="text-sm text-zinc-400">Starter</div>
              <div className="mt-2 text-4xl font-bold tracking-tighter">$0</div>
              <div className="text-zinc-500 text-sm mb-6">Forever free</div>
              <ul className="space-y-3 text-sm text-zinc-300">
                {["All 12+ tools", "Files up to 100 MB", "Auto-delete in 30 minutes", "No login required"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FF521B] shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-xl bg-zinc-900 border border-[#FF521B] relative">
              <div className="absolute -top-3 right-6 text-xs px-2 py-1 rounded-full bg-[#FF521B] text-white font-medium">
                Coming soon
              </div>
              <div className="text-sm text-zinc-400">Pro</div>
              <div className="mt-2 text-4xl font-bold tracking-tighter">
                $6<span className="text-base font-normal text-zinc-400">/mo</span>
              </div>
              <div className="text-zinc-500 text-sm mb-6">For power users</div>
              <ul className="space-y-3 text-sm text-zinc-300">
                {["Unlimited file size", "Batch processing", "Priority conversion queue", "API access"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FF521B] shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button
                data-testid="notify-pro-btn"
                className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#FF521B] text-white font-medium hover:bg-[#FF3D00] transition-colors"
              >
                Notify me when Pro is live
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
