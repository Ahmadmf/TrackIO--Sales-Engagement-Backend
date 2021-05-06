const mongoose = require("mongoose");

var prospectSchema = new mongoose.Schema({
    status:{
        type:String,
        required: 'This field is required'
    },
    email:{
        type:String,
        required: 'This field is required'
    },
    firstName:{
        type:String,
        required: 'This field is required'
    },
    lastName:{
        type: String,
        required: 'This field is required'
    },
    company:{
        type: String,
        required: 'This field is required'
    },
    title:{
        type: String,
        default: 0
    },
    phone:{
        type:Number
    },
    address: {
        type: String,
        required: 'This field is required'
    }

})
module.exports = Prospects = require("mongoose").model("Prospect",prospectSchema);