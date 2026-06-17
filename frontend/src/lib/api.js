import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

export const fetchTools = async () => {
  const { data } = await api.get("/tools");
  return data;
};

export const fetchTool = async (id) => {
  const { data } = await api.get(`/tools/${id}`);
  return data;
};

export const convertFiles = async (toolId, files, extra = {}, onProgress) => {
  const fd = new FormData();
  const multiple = files.length > 1 || ["jpg-to-pdf", "merge-pdf"].includes(toolId);
  if (multiple) {
    files.forEach((f) => fd.append("files", f));
  } else {
    fd.append("file", files[0]);
  }
  Object.entries(extra).forEach(([k, v]) => fd.append(k, v));

  const { data } = await api.post(`/convert/${toolId}`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (onProgress && e.total) {
        onProgress(Math.round((e.loaded * 100) / e.total));
      }
    },
  });
  return data;
};

export const downloadUrl = (fileId) => `${API}/download/${fileId}`;
