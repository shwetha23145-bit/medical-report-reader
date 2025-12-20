import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [showReport, setShowReport] = useState(false);

  const uploadReport = async () => {
    if (!file) {
      alert("Please upload a medical report");
      return;
    }

    const formData = new FormData();
    formData.append("report", file);

    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(data.text);
    setShowReport(true);
  };

  return (
    <>
      {!showReport ? (
        <div style={styles.uploadScreen}>
          <div style={styles.card}>
            <h2>🩺 Medical Report Reader</h2>

            <input
              type="file"
              accept=".pdf,image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button style={styles.button} onClick={uploadReport}>
              Read Report
            </button>
          </div>
        </div>
      ) : (
        <div style={styles.reportScreen}>
          <h1 style={styles.reportTitle}>MEDICAL REPORT</h1>

          <pre style={styles.reportText}>{result}</pre>
        </div>
      )}
    </>
  );
}

const styles = {
  /* Upload screen */
  uploadScreen: {
    backgroundColor: "#eef2f7",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: "30px",
    width: "350px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    textAlign: "center",
  },

  button: {
    marginTop: "15px",
    padding: "10px",
    width: "100%",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },

  /* Full screen report */
  reportScreen: {
    backgroundColor: "#000000",
    color: "#ffffff",
    minHeight: "100vh",
    padding: "40px",
  },

  reportTitle: {
    textAlign: "center",
    marginBottom: "30px",
    fontWeight: "bold",
    letterSpacing: "2px",
  },

  reportText: {
    whiteSpace: "pre-wrap",
    fontSize: "16px",
    fontWeight: "bold",
    lineHeight: "1.8",
    maxWidth: "900px",
    margin: "0 auto",
    backgroundColor: "#111111",
    padding: "25px",
    borderRadius: "10px",
  },
};

export default App;