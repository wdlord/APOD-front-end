import { useState } from "react";
import "./App.css";
import Pod from "./components/Pod";

// Returns the number as a string padded to 2 digits.
function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

// Formats a date object into the proper format for the API.
function formatDate(date: Date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
}

// Returns today's date in the format the API expects.
function getToday() {
  const now = new Date();
  return formatDate(now);
}

// React App component.
function App() {
  const today = getToday();
  const [queryDate, setQueryDate] = useState<string>(today);

  return (
    <>
      <div className="content">
        <div className="nav">
          <h1>Astronomy Picture of the Day</h1>
          <div className="button-container">
            <button
              className="arrow-button"
              onClick={() => {
                setQueryDate((prevDate) => {
                  const date = new Date(prevDate + "\n");
                  date.setDate(date.getDate() - 1);
                  return formatDate(date);
                });
              }}
            >
              <img src="/src/assets/left-arrow.svg" className="arrow-icon" />
            </button>
            <input
              type="date"
              value={queryDate}
              min="1995-06-16"
              max={today}
              onChange={(event) => {
                setQueryDate(event.target.value);
              }}
            />
            <button
              className={
                "arrow-button" + (queryDate == today ? " disabled" : "")
              }
              disabled={queryDate == today}
              onClick={() => {
                setQueryDate((prevDate) => {
                  const date = new Date(prevDate + "\n");
                  date.setDate(date.getDate() + 1);
                  return formatDate(date);
                });
              }}
            >
              <img src="/src/assets/right-arrow.svg" className="arrow-icon" />
            </button>
          </div>
        </div>
        <Pod queryDate={queryDate} />
      </div>
    </>
  );
}

export default App;
