import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header
      data-testid="site-header"
      className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          data-testid="logo-link"
          className="font-black tracking-tighter text-2xl text-zinc-50 flex items-center gap-2"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-[#FF521B] text-white">
            <span className="font-black text-lg leading-none">F</span>
          </span>
          <span>FlexiDoc</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a href="/#tools" data-testid="nav-tools" className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
            All tools
          </a>
          <a href="/#how" data-testid="nav-how" className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
            How it works
          </a>
          <a href="/#pricing" data-testid="nav-pricing" className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
            Pricing
          </a>
        </nav>

        <button
          data-testid="go-pro-btn"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF521B] text-white text-sm font-medium hover:bg-[#FF3D00] transition-colors"
          onClick={() => {
            const el = document.getElementById("pricing");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <Sparkles className="w-4 h-4" />
          Go Pro
        </button>
      </div>
    </header>
  );
};

export default Header;
