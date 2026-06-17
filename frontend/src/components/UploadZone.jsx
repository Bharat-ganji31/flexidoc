import { useRef, useState } from "react";
import { UploadCloud, X, FileIcon } from "lucide-react";

export const UploadZone = ({ accept, multiple, files, onChange }) => {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = (list) => {
    const arr = Array.from(list || []);
    if (!arr.length) return;
    onChange(multiple ? [...files, ...arr] : arr.slice(0, 1));
  };

  const removeAt = (i) => {
    const next = files.slice();
    next.splice(i, 1);
    onChange(next);
  };

  return (
    <div className="w-full">
      <div
        data-testid="upload-zone"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files); }}
        className={`flex flex-col items-center justify-center p-12 md:p-20 border-2 border-dashed rounded-2xl bg-zinc-900/40 transition-all duration-300 cursor-pointer group ${
          drag ? "border-[#FF521B] bg-[#FF521B]/5 scale-[1.01]" : "border-zinc-700 hover:border-[#FF521B]"
        }`}
      >
        <div className="w-16 h-16 rounded-2xl bg-zinc-800 group-hover:bg-[#FF521B]/15 flex items-center justify-center mb-6 transition-colors">
          <UploadCloud className="w-7 h-7 text-zinc-300 group-hover:text-[#FF521B] transition-colors" strokeWidth={1.5} />
        </div>
        <div className="text-xl font-semibold text-zinc-50 tracking-tight mb-2">
          {multiple ? "Drop files here" : "Drop your file here"}
        </div>
        <div className="text-sm text-zinc-400">
          or <span className="text-[#FF521B] underline underline-offset-4">click to browse</span>
          {accept && ` · accepts ${accept}`}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          data-testid="file-input"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <ul data-testid="file-list" className="mt-6 space-y-2">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              data-testid={`file-item-${i}`}
              className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <FileIcon className="w-5 h-5 text-[#FF521B] shrink-0" strokeWidth={1.5} />
                <div className="min-w-0">
                  <div className="text-sm text-zinc-50 truncate">{f.name}</div>
                  <div className="text-xs text-zinc-500">{(f.size / 1024).toFixed(1)} KB</div>
                </div>
              </div>
              <button
                data-testid={`remove-file-${i}`}
                onClick={(e) => { e.stopPropagation(); removeAt(i); }}
                className="text-zinc-500 hover:text-zinc-50 transition-colors ml-2"
                aria-label="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UploadZone;
