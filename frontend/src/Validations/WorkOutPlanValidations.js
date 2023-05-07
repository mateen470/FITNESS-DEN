const WorkoutNameValidation = (WorkoutName) => {
  if (WorkoutName === "") return "WORKOUT NAME CANNOT BE EMPTY";
  return false;
};

const ExcerciseNameValidation = (ExcerciseName) => {
  if (ExcerciseName === "") return "EXCERCISE NAME CANNOT BE EMPTY";
  return false;
};

const SetsValidation = (Sets) => {
  if (Sets === undefined) return "NUMBER OF SETS CANNOT BE EMPTY";
  if (Sets <= 0) return "NUMBER OF SETS MUST BE GREATER THAN 0";
  return false;
};

const RepsValidation = (Reps) => {
  if (Reps === undefined) return "NUMBER OF REPETITIONS CANNOT BE EMPTY";
  if (Reps <= 0) return "NUMBER OF REPETITIONS MUST BE GREATER THAN 0";
  return false;
};

const DemoLinkValidation = (DemoLink) => {
  if (DemoLink === "") return "DEMO LINK CANNOT BE EMPTY";
  return false;
};

const ExcerciseValidation = (Excercise) => {
  if (Excercise.length === 0) return "THERE MUST BE ONE EXCERCISE ADDED";
  return false;
};

const UpdateExcerciseNameValidation = (Excercise) => {
  for (var i = 0; i < Excercise.length; i++) {
    if (Excercise[i].Name === "")
      return `EXCERCISE NAME IN EXCERCISE ${i + 1} CANNOT BE EMPTY`;
  }
  return false;
};

const UpdateExcerciseRepsValidation = (Excercise) => {
  for (var i = 0; i < Excercise.length; i++) {
    if (Excercise[i].Reps === "")
      return `NUMBER OF REPETITIONS IN EXCERCISE ${i + 1} CANNOT BE EMPTY`;
    if (Excercise[i].Reps <= 0)
      return `NUMBER OF REPETITIONS IN EXCERCISE ${
        i + 1
      } MUST BE GREATER THAN 0`;
  }

  return false;
};

const UpdateExcerciseSetsValidation = (Excercise) => {
  for (var i = 0; i < Excercise.length; i++) {
    if (Excercise[i].Sets === "")
      return `NUMBER OF SETS IN EXCERCISE ${i + 1} CANNOT BE EMPTY`;
    if (Excercise[i].Sets <= 0)
      return `NUMBER OF SETS IN EXCERCISE ${i + 1} MUST BE GREATER THAN 0`;
  }

  return false;
};

const UpdateExcerciseDemoLinkValidation = (Excercise) => {
  for (var i = 0; i < Excercise.length; i++) {
    if (Excercise[i].DemoLink === "")
      return `DEMO LINK IN EXCERCISE ${i + 1} CANNOT BE EMPTY`;
  }

  return false;
};

export {
  WorkoutNameValidation,
  ExcerciseNameValidation,
  SetsValidation,
  RepsValidation,
  DemoLinkValidation,
  ExcerciseValidation,
  UpdateExcerciseNameValidation,
  UpdateExcerciseSetsValidation,
  UpdateExcerciseRepsValidation,
  UpdateExcerciseDemoLinkValidation,
};
