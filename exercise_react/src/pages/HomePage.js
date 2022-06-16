import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ExerciseList from "../components/ExerciseList";

function HomePage({ setExerciseToEdit }) {
  const [exercises, setExercises] = useState([]);
  const history = useHistory();

  const onDelete = async (id) => {
    const response = await fetch(`/exercises/${id}`, { method: "DELETE" });
    if (response.status === 204) {
      const newExercises = exercises.filter((exercise) => exercise._id !== id);
      setExercises(newExercises);
    } else {
      console.log(
        `Failed to delete exercise with _id = ${id}, status code = ${response.status}`
      );
    }
  };

  const onEdit = async (exerciseToEdit) => {
    setExerciseToEdit(exerciseToEdit);
    history.push("/edit-exercise");
  };

  const loadExercises = async () => {
    const response = await fetch("/exercises");
    const data = await response.json();
    setExercises(data);
  };

  useEffect(() => {
    loadExercises();
  }, []);

  return (
    <>
      <h2>List of Exercises</h2>
      <ExerciseList
        exercises={exercises}
        onDelete={onDelete}
        onEdit={onEdit}
      ></ExerciseList>
      <Link className="create-exercise-link" to="/create-exercise">Create an exercise</Link>
    </>
  );
}

export default HomePage;
