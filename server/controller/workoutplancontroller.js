const CompletedWorkoutPlanFromTrainer = require("../model/workoutPlan");
const WorkoutPlanRequestFromUser = require("../model/workoutPlanRequest");
const UpdateWorkoutPlan = require("../model/updateWorkoutPlan");

const WorkoutPlanControllerFunctions = {
  WorkoutPlanFilledForm: async (req, res) => {
    try {
      const formData = new WorkoutPlanRequestFromUser();
      formData.IDofCurrentUser = req.body.IDofCurrentUser;
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
      return await res.status(200).json({
        success: true,
        message: "FORM SUBMITTED SUCCESSFULLY!!",
        data: formData,
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `CAN'T SUBMIT THE FORM!! ${error.message}`,
      });
    }
  },
  DeletePlanRequestAfterCompletion: async (req, res) => {
    try {
      await WorkoutPlanRequestFromUser.findOneAndDelete({ _id: req.params.id });
      return await res.status(200).json({
        success: true,
        message: "REQUEST DELETED SUCCESSFULLY!!",
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `CAN'T DELETE THE REQUEST!! ${error.message}`,
      });
    }
  },
  SendCompletedPlanToUser: async (req, res) => {
    try {
      const data = new CompletedWorkoutPlanFromTrainer();
      data.IDofCurrentUser = req.body.IDofCurrentUser;
      data.PlanName = req.body.PlanName;
      req.body.WorkoutPlan.map((item) => data.WorkoutPlan.push(item));

      await data.save();
      return await res.status(200).json({
        success: true,
        message: "PLAN SENT SUCCESSFULLY!!",
        data: data,
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `FAILED TO SEND PLAN TO USER!! ${error.message}`,
      });
    }
  },
  UpdatePlan: async (req, res) => {
    try {
      const updatedPlanData = await CompletedWorkoutPlanFromTrainer.findOne({
        _id: req.params.id,
      });
      updatedPlanData.WorkoutPlan = req.body.singleDayPlan;
      await updatedPlanData.save();
      return await res.status(200).json({
        success: true,
        message: "PLAN UPDATED SUCCESSFULLY!!",
        data: updatedPlanData,
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `FAILED TO UPDATE THE PLAN!! ${error.message}`,
      });
    }
  },
  GetAllCompletedPlans: async (req, res) => {
    try {
      const allCompletedPlans = await CompletedWorkoutPlanFromTrainer.find({
        IDofCurrentUser: req.params.id,
      });
      return await res.status(200).json({
        success: true,
        message: "ALL PLANS ARE FETCHED!!",
        data: allCompletedPlans,
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `FAILED TO GET ALL PLANS!! ${error.message}`,
      });
    }
  },
  GetAllNewPlansRequests: async (req, res) => {
    try {
      const allNewRequests = await WorkoutPlanRequestFromUser.find();
      return await res.status(200).json({
        success: true,
        message: "SUCCESSFULL IN GETTING ALL NEW REQUESTS!!",
        data: allNewRequests,
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `FAILED TO GET ALL NEW PLANS REQUESTS!! ${error.message}`,
      });
    }
  },
  SendUpdateRequest: async (req, res) => {
    try {
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
      if (flag === 1) {
        return await res
          .status(400)
          .json({ success: false, message: "UPDATE REQUEST ALREADY SENT!!" });
      } else {
        const updatedData = new UpdateWorkoutPlan();
        updatedData.Plan = req.body.Plan;
        updatedData.Description = req.body.Description;
        await updatedData.save();

        return await res.status(200).json({
          success: true,
          message: "UPDATE REQUEST SENT SUCCESSFULLY!!",
          data: updatedData,
        });
      }
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `FAILED TO SEND UPDATE REQUEST!! ${error.message}`,
      });
    }
  },
  GetAllUpdatePlansRequests: async (req, res) => {
    try {
      const allUpdatePlanRequests = await UpdateWorkoutPlan.find();
      return await res.status(200).json({
        success: true,
        message: "SUCCESSFULLY FETCHED ALL UPDATE REQUESTS!!",
        data: allUpdatePlanRequests,
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `FAILED TO GET ALL UPDATE REQUESTS!! ${error.message}`,
      });
    }
  },
  OpenSpecificUpdatePlanRequest: async (req, res) => {
    try {
      const updatePlanRequest = await UpdateWorkoutPlan.findOne({
        _id: req.params.id,
      });
      return await res.status(200).json({
        success: true,
        message: "SUCCESSFUL IN FETCHING SPECIFIC UPDATE PLAN!!",
        data: updatePlanRequest,
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `FAILED TO OPEN SPECIFIC UPDATE REQUEST!! ${error.message}`,
      });
    }
  },
  DeleteUpdateRequestAfterCompletion: async (req, res) => {
    try {
      await UpdateWorkoutPlan.findOneAndDelete({ _id: req.params.id });
      return await res.status(200).json({
        success: true,
        message: "SUCCESSFULLY DELETED UPDATE REQUEST AFTER COMPLETION!!",
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `FAILED TO DELETE UPDATE REQUEST!! ${error.message}`,
      });
    }
  },
};
module.exports = WorkoutPlanControllerFunctions;
