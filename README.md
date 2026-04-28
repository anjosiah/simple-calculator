# React Calculator with JSON History

A responsive calculator application built with React, Vite, and a small Python FastAPI backend. The app delivers a modern Windows-style calculator experience with calculation history stored in a JSON file.

## Features

- Basic arithmetic: `+`, `-`, `×`, `÷`
- Advanced functions: `√`, `x²`, `1/x`, `%`, `±`
- Keyboard support for fast input
- Desktop history panel and mobile history overlay
- Per-entry history delete and clear-all support
- Persistent history saved to `history.json`
- Click-outside mobile history overlay to close it

## Repository structure

- `backend.py` - FastAPI backend for history persistence
- `history.json` - stored history data
- `package.json` - frontend dependencies and scripts
- `src/main.jsx` - React app bootstrap
- `src/App.jsx` - calculator logic and UI
- `src/styles.css` - responsive design and mobile layout

## Getting started

### Requirements

- Python 3.8+
- Node.js 16+

### Run locally

1. Install backend dependencies:

   ```powershell
   py -m pip install -r requirements.txt
   ```

2. Start the backend server:

   ```powershell
   py backend.py
   ```

3. Install frontend dependencies:

   ```powershell
   npm install
   ```

4. Launch the frontend:

   ```powershell
   npm run dev
   ```

5. Open the app in your browser at `http://localhost:3000`

> The backend runs at `http://127.0.0.1:8000`. The frontend is configured to proxy `/api` calls to that backend.

## Backend API

The backend handles history persistence using a simple JSON file.

### Endpoints

- `GET /api/history`
  - Returns the history array
- `POST /api/history`
  - Accepts a single history entry and persists it to `history.json`

### History item shape

Each history entry includes:

- `expression` — the calculation expression
- `result` — the computed result
- `timestamp` — ISO formatted timestamp

## Frontend architecture

The calculator UI is implemented in `src/App.jsx` with React hooks.

### Main state values

- `current` — currently typed value
- `previous` — stored operand for binary operations
- `operator` — pending operator
- `history` — saved history entries
- `showHistory` — whether mobile history overlay is visible
- `darkMode` — theme state persisted in local storage

### Key behaviors

- `appendDigit(digit)` handles digit input and decimal entry
- `handleOperation(nextOperator)` queues binary operations
- `handleEqual()` evaluates the current expression and saves successful results
- `handleAdvanced(action)` performs extra math operations
- `saveHistory(entry)` posts history entries to the backend and updates local state
- `formatHistoryTimestamp(timestamp)` formats timestamps as `Jan 01 2026 21:23:43`

### Keyboard controls

The app supports:

- Numeric keys `0-9`
- `.` for decimal input
- `+`, `-`, `*`, `/` for operators
- `Enter` or `=` for equals
- `Backspace` to remove the last digit
- `C` to clear
- `Escape` to close mobile history overlay

## Responsive behavior

### Desktop

- Calculator and history are displayed side-by-side
- History panel scrolls independently without affecting the page layout

### Mobile

- History opens in a bottom-aligned overlay
- The overlay background covers the full screen
- Clicking outside the history panel closes it
- A top-close button is available inside the history overlay

## Styling notes

- The app uses lightweight rounded panels and soft shadows for a polished look
- Desktop history remains fixed in its panel height
- Mobile overlay uses `position: fixed` and full viewport coverage for consistent behavior

## Customization guide

### Add a new calculator button

1. Add a new entry to `buttonConfig` in `src/App.jsx`
2. Handle the new action in the button click mapper
3. Add calculation logic in `evaluate()` or `handleAdvanced()`
4. Update `src/styles.css` if the button needs custom styling

### Add a backend feature

1. Add a new route in `backend.py`
2. Update `history.json` data shape if needed
3. Update frontend fetch logic in `src/App.jsx`

## Troubleshooting

- If history does not save, confirm the backend is running at `http://127.0.0.1:8000`
- If the app fails to start, check that Node dependencies are installed with `npm install`
- Use browser dev tools to inspect console errors and network requests

## Notes

- `history.json` is the single persistence source for history entries
- All UI and formatting logic lives in `src/App.jsx`
- The mobile history overlay closes when tapping outside the panel
