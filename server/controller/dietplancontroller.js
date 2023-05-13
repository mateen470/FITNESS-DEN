const CompletedDietPlanFromTrainer = require("../model/dietPlan");
const DietPlanRequestFromUser = require("../model/dietPlanRequest");
const UpdateDietPlan = require("../model/updateDietPlan");

const DietPlanControllerFunctions = {
  DietPlanFilledForm: async (req, res) => {
    try {
      const formData = new DietPlanRequestFromUser();
      formData.IDofCurrentUser = req.body.IDofCurrentUser;
      console.log(req.body.IDofCurrentUser);
      formData.Title = req.body.Title;
      formData.Age = req.body.Age;
      formData.Weight = req.body.Weight;
      formData.MedicalHistory = req.body.MedicalHistory;
      formData.MedicalHistoryDes = req.body.MedicalHistoryDes;
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
      await DietPlanRequestFromUser.findOneAndDelete({ _id: req.params.id });
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
      const data = new CompletedDietPlanFromTrainer();
      data.IDofCurrentUser = req.body.IDofCurrentUser;
      req.body.DietPlan.map((item) => data.DietPlan.push(item));
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
      const updatedPlanData = await CompletedDietPlanFromTrainer.findOne({
        _id: req.params.id,
      });
      updatedPlanData.DietPlan = req.body.DietPlan;
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
      const allCompletedPlans = await CompletedDietPlanFromTrainer.findOne({
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
      const allNewRequests = await DietPlanRequestFromUser.find();
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
      const plan = await UpdateDietPlan.find();
      let flag = 0;
      plan.map((item) => {
        if (item.PlanID === req.body.PlanId) {
          flag = 1;
        }
      });
      if (flag === 1) {
        return await res
          .status(400)
          .json({ success: false, message: "UPDATE REQUEST ALREADY SENT!!" });
      } else {
        const data = new UpdateDietPlan();
        data.PlanID = req.body.PlanId;
        data.Description = req.body.UpdateDescription;
        await data.save();

        return await res.status(200).json({
          success: true,
          message: "UPDATE REQUEST SENT SUCCESSFULLY!!",
          data: data,
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
      const allUpdatePlanRequests = await UpdateDietPlan.find();
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
  DeleteUpdateRequestAfterCompletion: async (req, res) => {
    try {
      await UpdateDietPlan.findOneAndDelete({ _id: req.params.id });
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
  OpenSpecificUpdatePlanRequest: async (req, res) => {
    try {
      const updatePlanRequest = await CompletedDietPlanFromTrainer.findOne({
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
};
module.exports = DietPlanControllerFunctions;
