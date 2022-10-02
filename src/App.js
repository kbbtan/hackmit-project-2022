import React from 'react';
import "./App.css";

import Form from "./Form";
import Results from "./Results";

function App() {
  const [formMode, setFormMode] = React.useState(true);
  const [predicting, setPredicting] = React.useState(false);
  const [results, setResults] = React.useState({});

  const callPrediction = async (formData) => {
    setFormMode(false);
    setPredicting(true);

    try {
      const response = await fetch("http://localhost:5000", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
      });

      const results = await response.json();
      setResults(results.gated_entries);
    
    } catch {
      setResults("An error has occured, please try again")


    } finally {
      setPredicting(false);

    }
  }

    return (
      <div className="main-page">
        <div className="header-container">
          <img src="/predict_logo.png" alt="logo"/>
          <h1>Train-ing data like never before</h1>
          <p>
            <i>Blazingly fast </i>
            ML with InterSystems
          </p>
        </div>
  
        <div className="form-container">
          {formMode && <Form callPrediction={callPrediction}/>}
          {!formMode && <Results setFormMode={setFormMode} predicting={predicting} results={results}/>}
        </div>
      </div>
    );
}

export default App;
