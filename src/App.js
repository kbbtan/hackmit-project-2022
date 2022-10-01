import React from 'react';
import "./App.css";

function App() {
  const [formMode, setFormMode] = React.useState(true);

  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [line, setLine] = React.useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      date: date,
      time: time,
      line: line
    };

    console.log(data);
  }

  if (formMode) {
    return (
      <div className="main-page">
        <div className="header-container">
          <img src="/predict_logo.png" alt="logo"/>
          <h1>Blazingly Fast machine learning driven application</h1>
          <p>Doing stuff like never before</p>
        </div>
  
        <div className="form-container">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Ride Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
            />
  
            <input 
              type="text" 
              placeholder="Ride Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              onFocus={(e) => (e.target.type = "time")}
              onBlur={(e) => (e.target.type = "text")}
            />
            
            <select 
              placeholder="MBTA Line"
              value={line}
              onChange={(e) => setLine(e.target.value)}
            >
              <option>Red Line</option>
              <option>Blue Line</option>
              <option>Green Line</option>
              <option>Orange Line</option>
              <option>Silver Line</option>
            </select>
  
            <input type="submit" value="Run Prediction!"/>
          </form>
        </div>
      </div>
    );
    
  }
}

export default App;
