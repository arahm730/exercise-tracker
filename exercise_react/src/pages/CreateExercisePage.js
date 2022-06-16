import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const CreateExercisePage = () => {
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("");
  const [date, setDate] = useState("");

  const history = useHistory();

  const addExercise = async () => {
    const newExercise = { name, reps, weight, unit, date };

    const response = await fetch("/exercises", {
      method: "POST",
      body: JSON.stringify(newExercise),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      alert("Successfully added exercise!");
    } else {
      alert(`Failed to add exercise, status code = ${response.status}`);
    }
    history.push("/");
  };

  return (
    <div className="create-exercise-container">
      <h2>Add Exercise</h2>
      <table className="border-fix">
        <thead>
          <tr>
            <th>Name</th>
            <th>Reps</th>
            <th>Weight</th>
            <th>Unit</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr className="add-exercise-table">
            <td>
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                value={reps}
                placeholder="Enter reps"
                onChange={(e) => setReps(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Enter weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </td>
            <td>
              <select
                name="unit"
                id="unit-select"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                <option disabled="disabled" value="">
                  Choose unit
                </option>
                <option value="lbs">lbs</option>
                <option value="kgs">kgs</option>
              </select>
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter date as MM-DD-YY"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button className="bottom-button" onClick={addExercise}>
        Add
      </button>
    </div>
  );
};

export default CreateExercisePage;
