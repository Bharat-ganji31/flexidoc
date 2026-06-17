export const Footer = () => {
  return (
    <footer data-testid="site-footer" className="border-t border-zinc-800 bg-zinc-950 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div className="col-span-2">
          <div className="font-black tracking-tighter text-2xl text-zinc-50 flex items-center gap-2 mb-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-[#FF521B] text-white">
              <span className="font-black text-lg leading-none">F</span>
            </span>
            FlexiDoc
          </div>
          <p className="text-zinc-400 max-w-sm leading-relaxed">
            Universal document conversion in your browser. Fast, private, and free —
            your files are auto-deleted after 30 minutes.
          </p>
        </div>
        <div>
          <div className="text-zinc-50 font-medium mb-3">Product</div>
          <ul className="space-y-2 text-zinc-400">
            <li><a href="/#tools" className="hover:text-zinc-50 transition-colors">All tools</a></li>
            <li><a href="/#pricing" className="hover:text-zinc-50 transition-colors">Pricing</a></li>
            <li><a href="/#how" className="hover:text-zinc-50 transition-colors">How it works</a></li>
          </ul>
        </div>
        <div>
          <div className="text-zinc-50 font-medium mb-3">Company</div>
          <ul className="space-y-2 text-zinc-400">
            <li><a href="#" className="hover:text-zinc-50 transition-colors">About</a></li>
            <li><a href="#" className="hover:text-zinc-50 transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-zinc-50 transition-colors">Terms</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-xs text-zinc-500 flex flex-col md:flex-row justify-between gap-2">
          <div>© {new Date().getFullYear()} FlexiDoc. All rights reserved.</div>
          <div>Files are temporary — deleted automatically.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
