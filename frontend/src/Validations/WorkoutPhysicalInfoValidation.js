const AgeValidation = (Age) => {
  if (Age === undefined) return "AGE CANNOT BE EMPTY";
  if (Age <= 0) return "AGE MUST BE GREATER THAN 0";
  return false;
};

const HeightValidation = (Height) => {
  if (Height === undefined) return "HEIGHT CANNOT BE EMPTY";
  if (Height <= 0) return "HEIGHT MUST BE GREATER THAN 0";
  return false;
};

const WeightValidation = (Weight) => {
  if (Weight === undefined) return "WEIGHT CANNOT BE EMPTY";
  if (Weight <= 0) return "WEIGHT MUST BE GREATER THAN 0";
  return false;
};

const InjuriesValidation = (Injury) => {
  if (Injury === undefined) return "ONE VALUE FOR INJURY MUST BE SELECTED";
  return false;
};

const SurgeriesValidation = (Surgery) => {
  if (Surgery === undefined) return "ONE VALUE FOR SURGERY MUST BE SELECTED";
  return false;
};

const AvailableEquipmentsValidation = (AvailableEquipments) => {
  if (AvailableEquipments === undefined)
    return "ONE VALUE FOR AVAILABLE GYM EQUIPMENTS MUST BE SELECTED";
  return false;
};

const InjuriesDesValidation = (Injury, InjuryDes) => {
  if (Injury && InjuryDes === "") return "INJURY DESCRIPTION CANNOT BE EMPTY";
  return false;
};

const SurgeriesDesValidation = (Surgery, SurgeryDes) => {
  if (Surgery && SurgeryDes === "")
    return "SURGERY DESCRIPTION CANNOT BE EMPTY";
  return false;
};

const AvailableEquipmentsDesValidation = (
  AvailableEquipments,
  AvailableEquipmentsDes
) => {
  if (AvailableEquipments && AvailableEquipmentsDes === "")
    return "AVAILABLE GYM EQUIPMENTS DESCRIPTION CANNOT BE EMPTY";
  return false;
};

export {
  AgeValidation,
  HeightValidation,
  WeightValidation,
  InjuriesValidation,
  SurgeriesValidation,
  AvailableEquipmentsValidation,
  InjuriesDesValidation,
  SurgeriesDesValidation,
  AvailableEquipmentsDesValidation,
};
