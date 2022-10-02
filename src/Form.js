import React from "react";
import "./App.css";

const Form = ({setData, callPrediction}) => {
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [line, setLine] = React.useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setData({
        date: date,
        time: time,
        line: line
    });
    callPrediction();
  }

  return (
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
  )
}

export default Form;