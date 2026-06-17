import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ICON_MAP } from "@/lib/tools";

export const ToolCard = ({ tool }) => {
  const Icon = ICON_MAP[tool.icon] || ICON_MAP.FileText;
  return (
    <Link
      to={`/tool/${tool.id}`}
      data-testid={`tool-card-${tool.id}`}
      className="flex flex-col items-start p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-[#FF521B] hover:bg-zinc-800/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#FF521B]/10 transition-all duration-200 cursor-pointer group h-full"
    >
      <div className="flex items-center justify-between w-full mb-6">
        <div className="w-11 h-11 rounded-lg bg-zinc-800 group-hover:bg-[#FF521B]/15 flex items-center justify-center transition-colors">
          <Icon className="w-5 h-5 text-zinc-100 group-hover:text-[#FF521B] transition-colors" strokeWidth={1.75} />
        </div>
        <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-[#FF521B] transition-colors" />
      </div>
      <h3 className="text-lg font-semibold text-zinc-50 tracking-tight mb-1">{tool.title}</h3>
      <p className="text-sm text-zinc-400 leading-relaxed">{tool.description}</p>
    </Link>
  );
};

export default ToolCard;
