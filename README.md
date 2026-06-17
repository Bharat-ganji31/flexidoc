# FlexiDoc — Universal Document Conversion Tool

A full-stack document conversion app: PDF ⇄ Word/Excel/PowerPoint/JPG, merge/split/compress PDFs,
image format conversion. Dark "Swiss & High-Contrast" UI with an orange (#FF521B) accent.

```
flexidoc/
├── backend/         FastAPI app (Python)
│   ├── server.py
│   ├── requirements.txt
│   └── .env
└── frontend/         React app (CRA + craco + Tailwind)
    ├── src/
    │   ├── pages/        Home.jsx, Tool.jsx
    │   ├── components/   Header, Footer, ToolCard, UploadZone, ui/progress
    │   └── lib/           api.js, tools.js, utils.js
    ├── package.json
    └── .env
```

## 1. Backend setup

The backend needs Python 3.10+, MongoDB running locally (or a connection string), and
**LibreOffice** installed on the system (used headlessly for Word/Excel/PowerPoint → PDF).

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Install LibreOffice (required for word-to-pdf, excel-to-pdf, powerpoint-to-pdf):

```bash
# Ubuntu/Debian
sudo apt-get install libreoffice

# macOS
brew install --cask libreoffice

# Make sure `soffice` is on your PATH afterwards:
soffice --version
```

Also install poppler (needed by `pdf2image` for pdf-to-jpg):

```bash
# Ubuntu/Debian
sudo apt-get install poppler-utils

# macOS
brew install poppler
```

Start MongoDB (or point `MONGO_URL` in `backend/.env` at an existing instance — Mongo is
only used for app bookkeeping, not for the conversions themselves).

Run the API:

```bash
cd backend
uvicorn server:app --host 0.0.0.0 --port 8000 --reload
```

Visit `http://localhost:8000/api/tools` to confirm it's serving the tool list.

## 2. Frontend setup

Requires Node 18+ and yarn (or npm).

```bash
cd frontend
yarn install     # or: npm install
```

Edit `frontend/.env` so `REACT_APP_BACKEND_URL` points at your running backend
(defaults to `http://localhost:8000`).

Run the dev server:

```bash
yarn start        # or: npm start
```

Visit `http://localhost:3000`.

## 3. Production build

```bash
cd frontend
yarn build
```

This outputs static files to `frontend/build/` which you can serve with any static
host (Vercel, Netlify, nginx, S3 + CloudFront, etc). Point `REACT_APP_BACKEND_URL`
at your deployed backend URL before building.

For the backend in production, run behind a process manager:

```bash
uvicorn server:app --host 0.0.0.0 --port 8000 --workers 2
```

and put it behind nginx/Caddy with HTTPS, or deploy as a container — see `Dockerfile`s
in each folder if you added them.

## Notes

- Converted files are stored temporarily in the OS temp directory and **auto-deleted
  after 30 minutes** (`RETENTION_SECONDS` in `server.py`).
- `CORS_ORIGINS` in `backend/.env` is `*` for local dev — lock this down to your real
  frontend domain in production.
- The 12 tools are defined in the `TOOLS` list in `backend/server.py` — add more by
  adding an entry there plus a matching `/convert/<id>` route.
