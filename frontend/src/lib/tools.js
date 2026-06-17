import {
  FileText, FileType, Image as ImageIcon, ImagePlus,
  Layers, Scissors, Minimize2, Table, FileSpreadsheet,
  Presentation, Monitor, Images,
} from "lucide-react";

export const ICON_MAP = {
  FileText,
  FileType,
  Image: ImageIcon,
  ImagePlus,
  Combine: Layers,
  Split: Scissors,
  Minimize2,
  Sheet: Table,
  FileSpreadsheet,
  Presentation,
  MonitorPlay: Monitor,
  Images,
};

export const CATEGORY_LABELS = {
  "convert-from-pdf": "Convert from PDF",
  "convert-to-pdf": "Convert to PDF",
  organize: "Organize PDF",
  optimize: "Optimize PDF",
  image: "Image Tools",
};

export const CATEGORY_ORDER = [
  "convert-from-pdf",
  "convert-to-pdf",
  "organize",
  "optimize",
  "image",
];
