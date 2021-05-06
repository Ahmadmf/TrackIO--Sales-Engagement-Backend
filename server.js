const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");
const campaignRoute = require("./routes/campaign")
const emailRoute = require("./routes/email")
const prospectRoute = require("./routes/prospect");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/TrackioDB",{
    useNewUrlParser: true,
    useUnifiedTopology: true
},
err => {
    if(!err){
        console.log("Connection Succeeded")
    }
    else{
        console.log("Error in Connection" + err)
    }
})


app.use("/api/auth",authRoute);
app.use("/api/campaigns",campaignRoute);
app.use("/api/email",emailRoute);
app.use("/api/prospects",prospectRoute);



app.listen(port, () => console.log(`Listening on port ${port}`));