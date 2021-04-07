const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: 'This field is required'
    },
    lastName:{
        type: String,
        required: 'This field is required'
    },
    companyDomain:{
        type: String,
        required:'This field is required'
    },
    password:{
        type: String
    }
})
module.exports = Users = require("mongoose").model("User",userSchema);