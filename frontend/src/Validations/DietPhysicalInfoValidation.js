const AgeValidation = (Age) => {
  if (Age === undefined) return "AGE CANNOT BE EMPTY";
  if (Age <= 0) return "AGE MUST BE GREATER THAN 0";
  return false;
};

const WeightValidation = (Weight) => {
  if (Weight === undefined) return "WEIGHT CANNOT BE EMPTY";
  if (Weight <= 0) return "WEIGHT MUST BE GREATER THAN 0";
  return false;
};

const AllergiesValidation = (Allergies) => {
  if (Allergies === undefined)
    return "ONE VALUE FOR ALLERGIES OR MEDICAL HISTORY MUST BE SELECTED";
  return false;
};

const AllergiesDesValidation = (Allergies, AllergiesDes) => {
  if (Allergies && AllergiesDes === "")
    return "ALLERGIES OR MEDICAL HISTORY DESCRIPTION CANNOT BE EMPTY";
  return false;
};

export {
  AgeValidation,
  WeightValidation,
  AllergiesValidation,
  AllergiesDesValidation,
};
