const UpdateRequestValidation = (UpdateRequest) => {
  if (UpdateRequest === "") return "UPDATE REQUEST DESCRIPTION CANNOT BE EMPTY";
  return false;
};

export { UpdateRequestValidation };
