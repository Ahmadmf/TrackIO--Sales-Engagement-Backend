const router =require("express").Router();
const Prospect = require("../models/Prospect");


router.post('/addProspect', (req, res) => {
    console.log("In Add Prospect");
    //console.log(req.body.prospectDetail);
    const prospectData=req.body.prospectDetail;
    const newProspect = new Prospect({
        status:prospectData.status,
        email:prospectData.email,
        firstName:prospectData.firstName,
        lastName:prospectData.lastName,
        company:prospectData.company,
        title:prospectData.title,
        phone:prospectData.phone,
        address:prospectData.address 
    })
    newProspect.save();
    console.log("Data has been saved");  
   });

   router.get(
    "/prospectDetails",
    (req,res) => {
             Prospect.find()
                 .then((prospect)=>{
                     return res.status(200).json(prospect);
                 })
                 .catch((err) => {
                     console.log(err);
                 })

    }
)


 

 module.exports = router;