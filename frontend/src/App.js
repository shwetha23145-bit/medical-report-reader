import React, { useState } from "react";

function App() {
  const [report, setReport] = useState("");
  const [result, setResult] = useState("");

  const analyzeReport = async () => {
    if (!report) {
      setResult("Please enter a medical report.");
      return;
    }

    try {
      const response = await fetch("https://medical-report-reader.onrender.com/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ report }),
      });

      const data = await response.json();
      setResult(data.summary);
    } catch (error) {
      setResult("Error connecting to backend server.");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h2>Medical Report Reader</h2>

      <textarea
        rows="8"
        cols="60"
        placeholder="Paste medical report here..."
        value={report}
        onChange={(e) => setReport(e.target.value)}
      />

      <br /><br />

      <button onClick={analyzeReport}>
        Analyze Report
      </button>

      <h3>Result:</h3>
      <p>{result}</p>
    </div>
  );
}

export default App;