import React from 'react';
import "./App.css";

import Form from "./Form";
import Results from "./Results";

function App() {
  const [formMode, setFormMode] = React.useState(true);
  const [predicting, setPredicting] = React.useState(false);
  const [data, setData] = React.useState({});
  const [results, setResults] = React.useState({});

  const callPrediction = () => {
    setFormMode(false);
    setPredicting(true);
    
  }

    return (
      <div className="main-page">
        <div className="header-container">
          <img src="/predict_logo.png" alt="logo"/>
          <h1>T-raining data like never before</h1>
          <p>Blazingly fast ML with InterSystems</p>
        </div>
  
        <div className="form-container">
          {formMode && <Form setData={setData} callPrediction={callPrediction}/>}
          {!formMode && <Results setFormMode={setFormMode} predicting={predicting} results={results}/>}
        </div>
      </div>
    );
}

export default App;
