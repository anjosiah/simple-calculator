import { useEffect, useState } from "react";

const buttonConfig = [
  { label: "C", action: "clear", variant: "function" },
  { label: "±", action: "negate", variant: "function" },
  { label: "%", action: "percent", variant: "function" },
  { label: "÷", action: "operator", value: "÷", variant: "operator" },
  { label: "7", action: "digit", value: "7" },
  { label: "8", action: "digit", value: "8" },
  { label: "9", action: "digit", value: "9" },
  { label: "×", action: "operator", value: "×", variant: "operator" },
  { label: "4", action: "digit", value: "4" },
  { label: "5", action: "digit", value: "5" },
  { label: "6", action: "digit", value: "6" },
  { label: "-", action: "operator", value: "-", variant: "operator" },
  { label: "1", action: "digit", value: "1" },
  { label: "2", action: "digit", value: "2" },
  { label: "3", action: "digit", value: "3" },
  { label: "+", action: "operator", value: "+", variant: "operator" },
  { label: "0", action: "digit", value: "0", width: 2 },
  { label: ".", action: "digit", value: "." },
  { label: "=", action: "equals", variant: "equals" },
  { label: "√", action: "sqrt", variant: "function" },
  { label: "x²", action: "square", variant: "function" },
  { label: "1/x", action: "reciprocal", variant: "function" },
];

const IconHistory = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M12 7V3L8 7l4 4V8c2.8 0 5 2.2 5 5 0 1.1-.36 2.14-.97 2.97l1.46 1.46C18.64 15.85 19 14.46 19 13c0-3.87-3.13-7-7-7zm-5.03 2.03L5.51 7.5C4.81 8.71 4.44 10.19 4.44 11.75 4.44 16.1 7.99 19.64 12.34 19.64c2.4 0 4.56-1.17 5.89-3.08l-1.46-1.46C15.51 16.43 13.99 17.24 12.34 17.24c-3.29 0-5.96-2.67-5.96-5.96 0-1.28.42-2.46 1.13-3.41z" />
  </svg>
);

const IconMoon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79z" />
  </svg>
);

const IconSun = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.45 10.45l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM12 4V1h-1v3h1zm0 19h-1v-3h1v3zm8-9h3v-1h-3v1zm-19 0h3v-1H1v1zm3.64 8.66l1.41 1.41 1.8-1.79-1.41-1.41-1.8 1.79zm10.45-16.83l1.79 1.8 1.41-1.4-1.8-1.8-1.4 1.4zM12 8.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5z" />
  </svg>
);

const IconClose = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconTrash = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M3 6h18M8 6V4h8v2m-7 2v10m4-10v10M5 6l1 14h12l1-14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconBackspace = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M6 6h11l5 6-5 6H6l-4-6 4-6zm7 2l-3 3 3 3 3-3-3-3z" />
  </svg>
);

// Format the calculator display value for readability.
const formatValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return "0";
  }

  if (value === "Error") {
    return "Error";
  }

  const [whole, fraction] = value.toString().split(".");
  const formattedWhole = Number(whole).toLocaleString("en-US");

  return fraction ? `${formattedWhole}.${fraction}` : formattedWhole;
};

// Convert the saved ISO timestamp into a user-friendly history label.
const formatHistoryTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const padded = (value) => String(value).padStart(2, "0");
  const month = monthNames[date.getMonth()];
  const day = padded(date.getDate());
  const year = date.getFullYear();
  const hours = padded(date.getHours());
  const minutes = padded(date.getMinutes());
  const seconds = padded(date.getSeconds());

  return `${month} ${day} ${year} ${hours}:${minutes}:${seconds}`;
};

// Evaluate two numeric operands using the selected operator.
const evaluate = (first, second, operator) => {
  const a = parseFloat(first);
  const b = parseFloat(second);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    return "0";
  }

  switch (operator) {
    case "+":
      return (a + b).toString();
    case "-":
      return (a - b).toString();
    case "×":
      return (a * b).toString();
    case "÷":
      return b === 0 ? "Error" : (a / b).toString();
    default:
      return second;
  }
};

function App() {
  const [current, setCurrent] = useState("0");
  const [previous, setPrevious] = useState(null);
  const [operator, setOperator] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = window.localStorage.getItem("calculator-dark-mode");
    if (stored !== null) return stored === "true";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches || false;
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL.replace(/\/+$|\s+/g, "")
    : "/api";

  const buildApiPath = (path) => `${API_BASE_URL}${path}`;

  useEffect(() => {
    fetch(buildApiPath("/history"))
      .then((response) => response.json())
      .then((data) => setHistory(data || []))
      .catch(() => setHistory([]));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("calculator-dark-mode", darkMode ? "true" : "false");
  }, [darkMode]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", darkMode);
    }
  }, [darkMode]);

  // Persist the new history entry locally and send it to the backend.
const saveHistory = async (entry) => {
    const nextHistory = [entry, ...history].slice(0, 20);
    setHistory(nextHistory);

    try {
      await fetch(buildApiPath("/history"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
    } catch {
      // If backend is unavailable, continue using local state only.
    }
  };

  // Toggle the mobile history overlay on and off.
  const handleToggleHistory = () => {
    setShowHistory((currentValue) => !currentValue);
  };

  const handleToggleDarkMode = () => {
    setDarkMode((value) => !value);
  };

  const closeHistory = () => {
    setShowHistory(false);
  };

  // Remove one matching history item from the current history list.
  const handleDeleteHistory = (timestamp, index) => {
    setHistory((currentHistory) => currentHistory.filter((item, idx) => idx !== index || item.timestamp !== timestamp));
  };

  // Clear all stored history entries in the UI state.
  const clearHistory = () => {
    setHistory([]);
  };

  // Close the mobile history overlay when the backdrop is clicked.
  const handleOutsideHistoryClick = (event) => {
    if (event.target === event.currentTarget) {
      closeHistory();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }

      const key = event.key;
      const digitKeys = /^[0-9]$/;

      if (digitKeys.test(key)) {
        event.preventDefault();
        appendDigit(key);
        return;
      }

      if (key === '.') {
        event.preventDefault();
        appendDigit('.');
        return;
      }

      if (key === '+' || key === '-' || key === '*' || key === '/') {
        event.preventDefault();
        const operatorMap = { '*': '×', '/': '÷' };
        handleOperation(operatorMap[key] || key);
        return;
      }

      if (key === '=' || key === 'Enter') {
        event.preventDefault();
        handleEqual();
        return;
      }

      if (key === 'Backspace') {
        event.preventDefault();
        handleDelete();
        return;
      }

      if (key.toLowerCase() === 'c') {
        event.preventDefault();
        handleClear();
        return;
      }

      if (key === 'Escape' && showHistory) {
        event.preventDefault();
        closeHistory();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showHistory, current, previous, operator]);

  // Append a digit or decimal point to the current calculator input.
  const appendDigit = (digit) => {
    if (current === "Error") {
      setCurrent(digit === "." ? "0." : digit);
      return;
    }

    if (digit === ".") {
      if (current.includes('.')) {
        return;
      }
      setCurrent(`${current}.`);
      return;
    }

    if (current === "0") {
      setCurrent(digit);
    } else {
      setCurrent(`${current}${digit}`);
    }
  };

  // Store the current value and the selected operator before accepting the next number.
  const handleOperation = (nextOperator) => {
    if (current === "Error") {
      return;
    }

    if (previous !== null && operator !== null && current !== "") {
      const result = evaluate(previous, current, operator);
      setPrevious(result);
      setCurrent("0");
      setOperator(nextOperator);
      return;
    }

    setPrevious(current);
    setCurrent("0");
    setOperator(nextOperator);
  };

  const handleEqual = () => {
    if (operator === null || previous === null) {
      return;
    }

    const result = evaluate(previous, current, operator);
    setCurrent(result);
    setPrevious(null);
    setOperator(null);
    setError(result === "Error" ? "Tidak dapat membagi dengan 0" : null);

    if (result !== "Error") {
      saveHistory({
        expression: `${previous} ${operator} ${current}`,
        result: result,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const handleClear = () => {
    setCurrent("0");
    setPrevious(null);
    setOperator(null);
    setError(null);
  };

  const handleDelete = () => {
    if (current.length === 1 || current === "Error") {
      setCurrent("0");
      return;
    }
    setCurrent(current.slice(0, -1));
  };

  // Perform an advanced math operation on the current value and save the result.
  const handleAdvanced = (action) => {
    if (current === "Error") {
      return;
    }

    const value = parseFloat(current);
    let result = current;

    switch (action) {
      case "negate":
        result = value === 0 ? "0" : (value * -1).toString();
        break;
      case "percent":
        result = (value / 100).toString();
        break;
      case "sqrt":
        result = value < 0 ? "Error" : Math.sqrt(value).toString();
        break;
      case "square":
        result = Math.pow(value, 2).toString();
        break;
      case "reciprocal":
        result = value === 0 ? "Error" : (1 / value).toString();
        break;
      default:
        return;
    }

    setCurrent(result);
    setError(result === "Error" ? "Operasi tidak valid" : null);

    if (result !== "Error") {
      saveHistory({
        expression: `${action}(${current})`,
        result,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const displayValue = formatValue(current);
  const secondaryValue = previous ? `${formatValue(previous)} ${operator || ""}` : "";
  const historyCount = history.length;

  return (
    <div className={`app-shell ${darkMode ? "dark" : ""}`}>
      <main className="calculator-shell">
        <div className="calculator-header">
          <div className="calculator-meta">
            <span className="label-pill">Calculator</span>
          </div>
          <div className="calculator-actions">
            <button
              className="toolbar-button history-button"
              type="button"
              onClick={handleToggleHistory}
              aria-label="Open History"
            >
              <IconHistory className="toolbar-icon" />
              <span>History ({historyCount})</span>
            </button>
            <button
              className="toolbar-button theme-button"
              type="button"
              onClick={handleToggleDarkMode}
              aria-pressed={darkMode}
              aria-label="Ganti tema"
            >
              {darkMode ? <IconSun className="toolbar-icon" /> : <IconMoon className="toolbar-icon" />}
              <span>{darkMode ? "Light" : "Dark"}</span>
            </button>
          </div>
        </div>

        <div className="calculator-display">
          <div className="calculator-expression">{secondaryValue}</div>
          <div className="calculator-value">{displayValue}</div>
        </div>

        {error ? (
          <div className="calculator-error" role="alert" aria-live="assertive">
            {error}
          </div>
        ) : null}

        <div className="calculator-grid">
          {buttonConfig.map((button) => {
            const classNames = ["button"];
            if (button.variant) classNames.push(button.variant);
            if (button.width === 2) classNames.push("wide");

            return (
              <button
                key={button.label}
                className={classNames.join(" ")}
                onClick={() => {
                  if (button.action === "digit") {
                    appendDigit(button.value);
                  } else if (button.action === "operator") {
                    handleOperation(button.value);
                  } else if (button.action === "equals") {
                    handleEqual();
                  } else if (button.action === "clear") {
                    handleClear();
                  } else if (button.action === "negate") {
                    handleAdvanced("negate");
                  } else if (button.action === "percent") {
                    handleAdvanced("percent");
                  } else if (button.action === "sqrt") {
                    handleAdvanced("sqrt");
                  } else if (button.action === "square") {
                    handleAdvanced("square");
                  } else if (button.action === "reciprocal") {
                    handleAdvanced("reciprocal");
                  }
                }}
              >
                {button.label}
              </button>
            );
          })}

          <button className="button function button-icon" onClick={handleDelete} aria-label="Delete last digit">
            <IconBackspace className="button-icon-svg" />
          </button>
        </div>
      </main>

      <aside
        className={`history-shell ${showHistory ? "open" : ""}`}
        role={showHistory ? "dialog" : undefined}
        aria-modal={showHistory ? "true" : undefined}
        aria-labelledby="history-title"
        onClick={handleOutsideHistoryClick}
      >
        <div className="history-panel" onClick={(event) => event.stopPropagation()}>
          <div className="history-shell-header">
            <div>
              <p id="history-title" className="history-label">History</p>
            </div>
            <div className="history-header-actions">
              {history.length > 0 ? (
                <button
                  className="clear-history button-icon"
                  type="button"
                  onClick={clearHistory}
                  aria-label="Clear all history"
                >
                  <IconTrash className="button-icon-svg" />
                </button>
              ) : null}
              <button
                className="close-history button-icon"
                type="button"
                onClick={closeHistory}
                aria-label="Close History"
              >
                <IconClose className="button-icon-svg" />
              </button>
            </div>
          </div>
          <div className="history-list">
            {history.length === 0 ? (
              <div className="history-empty">There are no History.</div>
            ) : (
              history.map((item, index) => (
                <article key={`${item.timestamp}-${index}`} className="history-item">
                  <div className="history-item-top">
                    <div className="history-expression">{item.expression}</div>
                    <button
                      className="delete-history button-icon"
                      type="button"
                      onClick={() => handleDeleteHistory(item.timestamp, index)}
                      aria-label="Delete this history item"
                    >
                      <IconClose className="button-icon-svg" />
                    </button>
                  </div>
                  <div className="history-result">= {item.result}</div>
                  <div className="history-time">{formatHistoryTimestamp(item.timestamp)}</div>
                </article>
              ))
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default App;
