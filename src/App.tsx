import { useState } from "react";
import "./App.css";
import Pod from "./components/Pod";

// Returns the number as a string padded to 2 digits.
function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

// Returns today's date in the format the API expects.
function getToday() {
  const now = new Date();
  return [
    now.getFullYear(),
    padTo2Digits(now.getMonth() + 1),
    padTo2Digits(now.getDate()),
  ].join("-");
}

// React App component.
function App() {
  const today = getToday();
  const [queryDate, setQueryDate] = useState(today);

  return (
    <>
      <div className="content">
        <div className="nav">
          <h1>Astronomy Picture of the Day</h1>
          <input
            type="date"
            value={queryDate}
            min="1995-06-16"
            max={today}
            onChange={(event) => {
              setQueryDate(event.target.value);
            }}
          />
        </div>
        <Pod queryDate={queryDate} />
      </div>
    </>
  );
}

export default App;
