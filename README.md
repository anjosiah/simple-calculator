# Simple Calculator Monorepo

**🚀 Live Preview:** [https://simple-calculator-andre.vercel.app/]

This repository is a lightweight monorepo with separate frontend and backend packages.

- `packages/frontend` — React + Vite calculator UI
- `packages/backend` — FastAPI history persistence service

## Features

- Basic arithmetic: `+`, `-`, `×`, `÷`
- Advanced functions: `√`, `x²`, `1/x`, `%`, `±`
- Keyboard support
- Desktop history panel and mobile history overlay
- Persistent history stored in JSON
- Clean separation between frontend and backend code

## 📂 Folder Structure
```
📦 simple-calculator-monorepo
├── 📄 README.md
├── ⚙️ package.json             # Root monorepo workspace config
└── 📂 packages/
    ├── 🎨 frontend/            # React + Vite UI
    │   ├── ⚙️ package.json     # Frontend dependencies
    │   ├── 🌐 index.html       # App entry point
    │   ├── 🔒 .env* # Environment variables
    │   └── 📁 src/             # React components & styles
    └── 🐍 backend/             # FastAPI service
        ├── 📜 backend.py       # API endpoints & logic
        ├── 📋 requirements.txt # Python dependencies
        └── 💾 history.json     # Persisted calculation history
```

## Requirements

- Node.js 16+
- Python 3.8+

## Run locally

### 1. Install dependencies

From the repository root:

```powershell
npm install
py -m pip install -r packages/backend/requirements.txt
```

### 2. Start the full local stack

From the repository root, run:

```powershell
npm run dev
```

This starts:

- the frontend at `http://localhost:3000`
- the backend at `http://127.0.0.1:8000`

### 3. Start only one service

Frontend only:

```powershell
npm run dev:frontend
```

Backend only:

```powershell
npm run dev:backend
```

### 4. Open the app

Visit `http://localhost:3000`

> The frontend is configured to proxy `/api` requests to the backend at `http://127.0.0.1:8000`.

## Backend API

- `GET /api/history` — returns the history array
- `POST /api/history` — accepts a calculator history entry and persists it

## Notes for contributors

- Use `npm run dev` at the repo root to launch the frontend workspace.
- Keep backend logic in `packages/backend` and frontend UI logic in `packages/frontend`.
- The backend uses `packages/backend/history.json` as the single source of persisted history.

## Package-specific commands

From the repository root:

- `npm run dev` — start frontend and backend locally together
- `npm run dev:frontend` — start only the frontend
- `npm run dev:backend` — start only the backend
- `npm run build` — build frontend app
- `npm run preview` — preview built frontend
