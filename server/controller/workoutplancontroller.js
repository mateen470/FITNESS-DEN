const CompletedWorkoutPlanFromTrainer = require("../model/workoutPlan");
const WorkoutPlanRequestFromUser = require("../model/workoutPlanRequest");
const UpdateWorkoutPlan = require("../model/updateWorkoutPlan");

const WorkoutPlanControllerFunctions = {
  WorkoutPlanFilledForm: async (req, res) => {
    const formData = new WorkoutPlanRequestFromUser();
    formData.title = req.body.Title;
    formData.age = req.body.Age;
    formData.height = req.body.Height;
    formData.weight = req.body.Weight;
    formData.injury = req.body.Injury;
    formData.injuryDes = req.body.InjuryDes;
    formData.surgery = req.body.Surgery;
    formData.surgeryDes = req.body.SurgeryDes;
    formData.equipments = req.body.Equipments;
    formData.equipmentsDes = req.body.EquipmentDes;
    await formData.save();
    res.send(data);
  },
  DeletePlanRequestAfterCompletion: async (req, res) => {
    await WorkoutPlanRequestFromUser.findOneAndDelete({ _id: req.params.id });
    res.send("Deleted");
  },
  SendCompletedPlanToUser: async (req, res) => {
    const data = new CompletedWorkoutPlanFromTrainer();
    req.body.map((item) =>
      item.map((i) => data.CompletedWorkoutPlanFromTrainer.push(i))
    );
    await data.save();
    res.send(data);
  },
  UpdatePlan: async (req, res) => {
    const updatedPlanData = await CompletedWorkoutPlanFromTrainer.findOne({
      _id: req.params.id,
    });
    updatedPlanData.Plan = req.body.singleDayPlan;
    await updatedPlanData.save();
    res.send(updatedPlanData);
  },
  GetAllCompletedPlans: async (req, res) => {
    const allCompletedPlans = await CompletedWorkoutPlanFromTrainer.find();
    res.send(allCompletedPlans);
  },
  GetAllNewPlansRequests: async (req, res) => {
    const allNewRequests = await WorkoutPlanRequestFromUser.find();
    res.send(allNewRequests);
  },
  SendUpdateRequest: async (req, res) => {
    const plan = await UpdateWorkoutPlan.find();
    let flag = 0;
    plan.map((item) => {
      if (
        item.CompletedWorkoutPlanFromTrainer._id ===
        req.body.CompletedWorkoutPlanFromTrainer._id
      ) {
        flag = 1;
      }
    });
    if (flag === 1) res.send("Request Already Sent");
    else {
      const updatedData = new UpdateWorkoutPlan();
      updatedData.Plan = req.body.Plan;
      updatedData.Description = req.body.Description;
      await updatedData.save();
      res.send(updatedData);
    }
  },
  GetAllUpdatePlansRequests: async (req, res) => {
    const allUpdatePlanRequests = await UpdateWorkoutPlan.find();
    res.send(allUpdatePlanRequests);
  },
  OpenSpecificUpdatePlanRequest: async (req, res) => {
    const updatePlanRequest = await UpdateWorkoutPlan.findOne({
      _id: req.params.id,
    });
    res.send(updatePlanRequest);
  },
  DeleteUpdateRequestAfterCompletion: async (req, res) => {
    await UpdateWorkoutPlan.findOneAndDelete({ _id: req.params.id });
    res.send("Successfully Deleted");
  },
};
module.exports = WorkoutPlanControllerFunctions;
