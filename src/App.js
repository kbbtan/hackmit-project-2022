import "./App.css";

function App() {
  const onSubmit = () => {
    console.log("ay");
  }

  return (
    <div className="main-page">
      <div className="header-container">
        <img src="/blue_bikes_tracker_logo.png" alt="logo"/>
        <h1>Blazingly Fast machine learning driven application</h1>
        <p>Doing stuff like never before</p>
      </div>

      <div className="form-container">
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="input 1"/>
          <input type="text" placeholder="input 2"/>
          <input type="text" placeholder="input 3"/>

          <input type="submit" value="Run Prediction!"/>
        </form>
      </div>
    </div>
  );
}

export default App;
