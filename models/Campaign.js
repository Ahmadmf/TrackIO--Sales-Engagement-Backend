const mongoose = require("mongoose");

var campaignSchema = new mongoose.Schema({
    campaignName:{
        type:String,
        required: 'This field is required'
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    dailyProspectNumber:{
        type:Number,
    },
    prospect:{
        type: Number,
        default:0,
    },
    replies:{
        type: Number,
        default:0
    },
    steps:{
        type: Number,
        default: 0
    },
    due:{
        type:Number,
        default:0
    }

})
module.exports = Campaigns = require("mongoose").model("Campaign",campaignSchema);