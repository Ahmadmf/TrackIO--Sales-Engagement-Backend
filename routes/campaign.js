const router =require("express").Router();
const Campaign = require("../models/Campaign");


router.post('/addCampaign', (req, res) => {
    console.log("In add Campaign");
    campaignData=req.body.campaignDetail;
   // console.log(campaignData);
    const newCampaign= new Campaign({
        campaignName: campaignData.campaignName,
        dailyProspectNumber:campaignData.dailyProspectNumber
      })
    
    newCampaign.save();
      console.log("DATA HAS BEEN SAVED");
  
  
   });
   router.get(
       "/campaignDetails",
       (req,res) => {
        //   const data=Campaign.find({},{_id:0});
                Campaign.find()
                    .then((campaign)=>{
                        //console.log(campaign);
                        return res.status(200).json(campaign);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
        //    console.log(data);
        // console.log("In campainDetails")
        //    return res.status(200).json("Firoz");

       }
   )

   router.get("/:campaign_id", (req, res) => {
       //console.log(req.params.campaign_id)
       Campaign.findById(req.params.campaign_id)
            .then((campaignReq) => {
                return res.status(200).json(campaignReq);
            })
            .catch((err) =>{
                return res.status(500).json(err);
            })
   
  });

 module.exports = router;