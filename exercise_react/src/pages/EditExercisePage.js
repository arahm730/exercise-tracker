import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const EditExercisePage = ({ exerciseToEdit }) => {
  const [name, setName] = useState(exerciseToEdit.name);
  const [reps, setReps] = useState(exerciseToEdit.reps);
  const [weight, setWeight] = useState(exerciseToEdit.weight);
  const [unit, setUnit] = useState(exerciseToEdit.unit);
  const [date, setDate] = useState(exerciseToEdit.date);

  const history = useHistory();

  const editExercise = async () => {
    const editedExercise = { name, reps, weight, unit, date };

    const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
      method: "PUT",
      body: JSON.stringify(editedExercise),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      alert("Successfully edited exercise!");
    } else {
      alert(`Failed to edit exercise, status code = ${response.status}`);
    }
    history.push("/");
  };

  return (
    <div className="edit-exercise-container">
      <h2>Edit Exercise</h2>
      <table>
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
          <tr>
            <td>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
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
                  Enter unit here
                </option>
                <option value="lbs">lbs</option>
                <option value="kgs">kgs</option>
              </select>
            </td>
            <td>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <button className="bottom-button" onClick={editExercise}>Save</button>
    </div>
  );
};

export default EditExercisePage;
