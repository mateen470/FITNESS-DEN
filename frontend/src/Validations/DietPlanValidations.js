const BreakFastValidation = (Breakfast) => {
  if (Breakfast === "") return "BREAKFAST CANNOT BE EMPTY";
  return false;
};

const LunchValidation = (Lunch) => {
  if (Lunch === "") return "LUNCH CANNOT BE EMPTY";
  return false;
};

const DinnerValidation = (Dinner) => {
  if (Dinner === "") return "DINNER CANNOT BE EMPTY";
  return false;
};

export { BreakFastValidation, LunchValidation, DinnerValidation };
