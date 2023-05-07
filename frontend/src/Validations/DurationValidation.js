const DurationValidation = (Duration) => {
  if (Duration === undefined) return "THERE MUST BE DURATION FOR PLAN";
  if (Duration <= 0) return "PLAN DURATION MUST BE ATLEAST 1 WEEK";
  return false;
};

export { DurationValidation };
