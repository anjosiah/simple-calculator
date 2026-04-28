import json
from datetime import datetime
from pathlib import Path
from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

history_path = Path("history.json")
if not history_path.exists():
    history_path.write_text("[]", encoding="utf-8")


def read_history() -> List[dict]:
    """Read the stored history JSON file and return it as a list.

    If the file is corrupt or cannot be read, return an empty list.
    """
    try:
        return json.loads(history_path.read_text(encoding="utf-8"))
    except Exception:
        return []


def save_history(history: List[dict]) -> None:
    """Persist the history list back to the JSON file.

    The history is stored with pretty formatting for easier inspection.
    """
    history_path.write_text(json.dumps(history, indent=2), encoding="utf-8")


# Data model for a single calculator history entry.
class HistoryItem(BaseModel):
    expression: str
    result: str
    timestamp: str | None = None


app = FastAPI(title="Calculator History API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/history")
def get_history():
    """Return the current history array from storage."""
    return read_history()


@app.post("/api/history", status_code=201)
def add_history(item: HistoryItem):
    """Add a new history item and persist it.

    The new entry is prepended so the most recent history appears first.
    Only the latest 20 entries are kept.
    """
    history = read_history()
    entry = item.dict()
    entry["timestamp"] = entry.get("timestamp") or datetime.utcnow().isoformat() + "Z"
    history.insert(0, entry)
    save_history(history[:20])
    return entry


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
