import "dotenv/config";
import express from "express";
import * as exercises from "./exercises_model.mjs";

const app = express();

app.use(express.json());
const PORT = process.env.PORT;

/**
 * @param {string} date
 * Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
 */
function isDateValid(date) {
  // Test using a regular expression.
  const format = /^\d\d-\d\d-\d\d$/;
  return format.test(date);
}

/**
 * Return true if request body is valid
 */
function isBodyValid(name, reps, weight, unit, date) {
  if (
    name &&
    reps &&
    weight &&
    unit &&
    date &&
    typeof name === "string" &&
    name.length >= 1 &&
    reps > 0 &&
    weight > 0 &&
    (unit === "kgs" || unit === "lbs") &&
    isDateValid(date)
  ) {
    return true;
  }
  return false;
}

app.post("/exercises", (req, res) => {
  if (
    isBodyValid(
      req.body.name,
      req.body.reps,
      req.body.weight,
      req.body.unit,
      req.body.date
    )
  ) {
    exercises
      .createExercise(
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date
      )
      .then((exercise) => {
        res.status(201).json(exercise);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ Error: "Invalid request" });
      });
  } else {
    res.status(400).json({ Error: "Invalid request" });
  }
});

app.get("/exercises/", (req, res) => {
  let filter = {};
  exercises
    .findExercise(filter)
    .then((exercise) => {
      res.json(exercise);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ Error: "Resource failed" });
    });
});

app.get("/exercises/:_id", (req, res) => {
  const exerciseId = req.params._id;
  exercises
    .findExerciseById(exerciseId)
    .then((exercise) => {
      if (exercise !== null) {
        res.json(exercise);
      } else {
        res.status(404).json({ Error: "Not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ Error: "Resource failed" });
    });
});

app.put("/exercises/:_id", (req, res) => {
  if (
    isBodyValid(
      req.body.name,
      req.body.reps,
      req.body.weight,
      req.body.unit,
      req.body.date
    )
  ) {
    exercises
      .updateExercise(
        req.params._id,
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date
      )
      .then((numUpdated) => {
        if (numUpdated === 1) {
          res.json({
            _id: req.params._id,
            name: req.body.name,
            reps: req.body.reps,
            weight: req.body.weight,
            unit: req.body.unit,
            date: req.body.date,
          });
        } else {
          res.status(404).json({ Error: "Not found" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ Error: "Invalid request" });
      });
  } else {
    res.status(400).json({ Error: "Invalid request" });
  }
});

app.delete("/exercises/:_id", (req, res) => {
  exercises
    .deleteExerciseById(
      req.params._id,
      req.params.name,
      req.params.reps,
      req.params.weight,
      req.params.unit,
      req.params.date
    )
    .then((deletedCount) => {
      if (deletedCount === 1) {
        res.status(204).send();
      } else {
        res.status(404).json({ Error: "Not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ Error: "Request failed" });
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
