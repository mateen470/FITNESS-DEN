const mongoose = require('mongoose')

const dietPlan= new mongoose.Schema(
    {
        DietPlan:Array
    }
)

const dietPlanModel= new mongoose.model('DietPlan',dietPlan)
module.exports=dietPlanModel;