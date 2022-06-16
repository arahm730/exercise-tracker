import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateExercisePage from "./pages/CreateExercisePage";
import EditExercisePage from "./pages/EditExercisePage";
import { useState } from "react";
import Navigation from "./components/Navigation";

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState([]);

  return (
    <div className="App">
      <header>
        <h1>Exercise Tracker</h1>
        <p>Keep track of your daily exercises!</p>
      </header>
      <Router>
        <Navigation />
        <Route path="/" exact>
          <HomePage setExerciseToEdit={setExerciseToEdit} />
        </Route>
        <Route path="/create-exercise">
          <CreateExercisePage />
        </Route>
        <Route path="/edit-exercise">
          <EditExercisePage exerciseToEdit={exerciseToEdit} />
        </Route>
      </Router>
      <footer>© 2022 A. Rahman</footer>
    </div>
  );
}

export default App;
